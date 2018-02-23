// @flow

import ResizeObserver from 'resize-observer-polyfill';

import Behavior from 'behaviors/Behavior.js';

export default class LayoutBehavior extends Behavior {
	static get schema(): any {
		return {
			guides: {
				type: [{ left: 'string' }, { right: 'string' }],
				default: 'viewport viewport'
			},
			height: {
				type: 'height',
				default: 'auto'
			},
			spacing: {
				type: [{ top: 'csslength' }, { bottom: 'csslength' }],
				//TODO: in cases like this we might want to accept "100vh" and automatically expand it to "100vh 100vh" (for arity 2 and 4).
				//When arity is 2, expand 100vh to 100vh 100vh. If it is 4, do the CSS dance.
				//E.g. 100vh 40vh expands to 100vh 40vh 100vh 40vh
				//and 100vh 30vh 40vh to 100vh 30vh 40vh 30vh
				//expand: true,
				//For now KISS
				default: '0 0'
			},
			mode: {
				type: 'string',
				enum: ['flow', 'follow'],
				default: 'flow'
			},
			followerMode: {
				type: 'string',
				enum: ['parallax', 'pin'],
				default: 'parallax'
			},
			pinAnchor: {
				type: 'string',
				enum: ['top', 'center', 'bottom'],
				default: 'center'
			},
			pinOffset: {
				type: 'csslength',
				default: '0'
			},
			clip: {
				type: 'boolean',
				default: 'false'
			},
			dependencies: {
				type: 'layoutdependency',
				default: 'inherit'
			}
		};
	}

	static get behaviorName(): string {
		return 'layout';
	}

	static get dependencies(): Array<string> {
		return [];
	}

	attach() {
		this.state = {
			height: 0
		};

		this.layout = {};

		this._scrollUpdate = {};

		this._wrapContents();

		//Listen to the layout event of the layout behavior.
		//TODO: is gut? We can always refactor, but does this make sense though?
		//This means possibly hundreds of DimensionsBehaviors will react to this event.
		//We could instead reverse the responsibility and have the layout behavior
		//Call a method on each of the children.
		//Maybe we should just merge Dimensions+PositionBehavior because they belong together anyway.
		//this.parentEl instead of document
		this.listen(document, 'guidelayout:layout', () => {
			this._render();
		});

		if (this.props.height === 'auto') {
			this._observeHeight();
		}
	}

	update(prevProps: {
		guides: Array<{ left: string, right: string }>,
		height: 'auto' | { length: number, unit: string },
		mode: 'flow' | 'follow',
		dependencies: string,
		followerMode: 'parallax' | 'pin',
		pinAnchor: 'top' | 'center' | 'bottom',
		pinOffset: { length: number, unit: string },
		spacing: { top: { length: number, unit: string }, bottom: { length: number, unit: string } }
	}) {
		if (this.props.height !== prevProps.height) {
			if (this.props.height === 'auto') {
				this._observeHeight();
			} else if (prevProps.height === 'auto') {
				this._unobserveHeight();
			}
		}
	}

	detach() {
		this._unobserveHeight();
		this._unwrapContents();
		//TODO: remove styles
	}

	scroll(status, engine) {
		let scrollUpdate = this._scrollUpdate;
		let didMove = engine.doScroll(this.layout, status.position, scrollUpdate);

		if (didMove) {
			let left = Math.round(this.layout.left);
			let top = scrollUpdate.wrapperTop;
			let style = this.el.style;

			style.msTransform = `translate(${left}px, ${top}px)`;
			style.transform = style.WebkitTransform = `translate3d(${left}px, ${top}px, 0)`;

			//We force the tile to be visible (loaded into GPU) when it is inside the viewport.
			//But we do not do the opposite here. This is just the last resort.
			//Under normal circumstances an async process (handleScrollPause) toggles display block/none intelligently.
			if (scrollUpdate.inViewport) {
				style.display = 'block';
			}

			//The reason we don't blindly apply the CSS transform is that most elements don't need a transform on the content layer at all.
			//This would waste a ton of GPU memory for no reason. The only elements that need it are things like parallax scrolling
			//or elements with appear effects using scaling/rotation.
			let innerStyle = this.innerEl.style;
			innerStyle.msTransform = `translate(0, ${scrollUpdate.contentTopOffset}px)`;
			innerStyle.transform = innerStyle.WebkitTransform = `translate3d(0px, ${scrollUpdate.contentTopOffset}px, 0)`;

			//TODO: I was here trying to implement clipping, e.g. scrollupdate.wrapperTop and wrapperHeight
		}

		//TODO: we need to combine _render and scroll and make sure they're consistently called (need access to the engine tho).
	}

	//Some of the layout rendering (e.g. clipping with parallax) requires a single child element.
	_wrapContents() {
		//Includes elements and also text nodes.
		let childNodes = this.el.childNodes;
		let childElements = this.el.children;

		//There is just a single element, maybe we don't need to wrap anything (*fingers crossed*).
		if (childElements.length === 1) {
			//There are no text nodes, just this one element. #winning
			if (childNodes.length === 1) {
				this.innerEl = childElements[0];
				return;
			}

			//There is a single element as child, but there might also be whitespace (text nodes) around it.
			//Check if there is nothing but "empty" text nodes, which we can ignore.
			//This catches cases such as the following, where the whitespace (nl, tab) around the <img> is irrelevant.
			//<el-meister>
			//	<img>
			//</el-meister>
			let onlyEmptyTextNodes = true;

			for (let i = 0; i < childNodes.length; i++) {
				let child = childNodes[i];

				if (child.textContent.trim() !== '') {
					onlyEmptyTextNodes = false;
					break;
				}
			}

			if (onlyEmptyTextNodes) {
				this.innerEl = childElements[0];
				return;
			}
		}

		console.log(`Wrapped ${childNodes.length} children in a <div>`);

		this._wrappedContents = true;

		let fragment = document.createDocumentFragment();
		this.innerEl = document.createElement('div');

		//childNodes is a live list.
		while (childNodes.length > 0) {
			fragment.appendChild(childNodes[0]);
		}

		this.innerEl.appendChild(fragment);
		this.el.appendChild(this.innerEl);
	}

	_unwrapContents() {
		if (this._wrappedContents) {
			let childNodes = this.innerEl.childNodes;
			let fragment = document.createDocumentFragment();

			//childNodes is a live list.
			while (childNodes.length > 0) {
				fragment.appendChild(childNodes[0]);
			}

			this.el.removeChild(this.innerEl);
			this.el.appendChild(fragment);
		}
	}

	_observeHeight() {
		this._resizeObserver = new ResizeObserver(entries => {
			this.setState({
				height: entries[0].contentRect.height
			});
		});

		this._resizeObserver.observe(this.innerEl);
	}

	_unobserveHeight() {
		if (this._resizeObserver) {
			this._resizeObserver.disconnect();
			this._resizeObserver = null;
		}
	}

	_render() {
		this._renderWrapper();
		this._renderInner();
	}

	_canSafelyBeUnloadedFromGPU() {
		//It's not safe to hide tiles with auto-height because we query the DOM for their height.
		return this.props.height !== 'auto';
	}

	_renderWrapper() {
		let style = this.el.style;
		let display = this._canSafelyBeUnloadedFromGPU() ? 'none' : 'block';
		let overflow = 'visible';
		let width = this.layout.width;
		let height = this.layout.height;

		//TODO: the layout engine shouldn't directly add values to the behavior, but scope them like props and state.
		if (this.props.clip) {
			height = this.layout.clipRect.height;
			overflow = 'hidden';
		}

		style.display = display;
		style.overflow = overflow;
		style.width = Math.round(width) + 'px';
		style.height = Math.round(height) + 'px';
		style.msTransform = `translate(0, 0)`;
		style.transform = style.WebkitTransform = `translate3d(0, 0, 0.00001)`;
	}

	_renderInner() {
		let style = this.innerEl.style;
		let width = this.layout.width;
		let height = this.props.height === 'auto' ? 'auto' : this.layout.height;

		style.width = Math.round(width) + 'px';
		style.height = Math.round(height) + 'px';

		if (this.props.clip) {
			style.backfaceVisibility = style.WebkitBackfaceVisibility = 'hidden';
		}
	}
}
