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
		return ['^guidelayout'];
	}

	attach() {
		/*
		TODO: we haven't quite figured out state/rendering yet. Quoting react docs
		"If you don’t use it in render(), it shouldn’t be in the state. For example, you can put timer IDs directly on the instance."
		This behavior itself does not need the state.height at all. It just provides it to the GuideLayoutBehavior.
		Maybe an `intrinsicHeight` property on the instance itself?
		*/
		this.state = {
			height: 0
		};

		this.layout = {};

		this._scrollUpdate = {};

		this._wrapContents();

		this.listen(this.parentEl, 'guidelayout:layout', () => {
			this._render();
		});

		this.listen(this.parentEl, 'guidelayout:scroll', e => {
			this._scroll(e.detail.scrollState);
		});

		this.listen(this.parentEl, 'guidelayout:pause', () => {
			this._scrollPause();
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

		//Force a scroll update.
		this._scroll(this.parentEl.guidelayout.scrollState, true);
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

	_scroll(scrollState, forceUpdate = false) {
		let scrollUpdate = this._scrollUpdate;
		let didMove = this.parentEl.guidelayout.engine.doScroll(this.layout, scrollState.position, scrollUpdate);
		let style = this.el.style;
		let innerStyle = this.innerEl.style;

		if (didMove || forceUpdate) {
			let left = Math.round(this.layout.left);
			let top = scrollUpdate.wrapperTop;

			//We force the tile to be visible (loaded into GPU) when it is inside the viewport.
			//But we do not do the opposite here. This is just the last resort.
			//Under normal circumstances an async process (_scrollPause) toggles display block/none intelligently.
			if (scrollUpdate.inViewport) {
				style.display = 'block';
				style.willChange = 'transform';
			}

			style.msTransform = `translate(${left}px, ${top}px)`;
			style.transform = style.WebkitTransform = `translate3d(${left}px, ${top}px, 0)`;

			//The reason we don't blindly apply the CSS transform is that most elements don't need a transform on the content layer at all.
			//This would waste a ton of GPU memory for no reason. The only elements that need it are things like parallax scrolling
			//or elements with appear effects using scaling/rotation.
			let innerStyle = this.innerEl.style;
			innerStyle.msTransform = `translate(0, ${scrollUpdate.contentTopOffset}px)`;
			innerStyle.transform = innerStyle.WebkitTransform = `translate3d(0px, ${scrollUpdate.contentTopOffset}px, 0)`;

			//TODO: only needed when the inner element is actually translated, e.g. parallax / pinning.
			//style.willChange = scrollUpdate.inExtendedViewport ? 'transform' : 'auto';

			//TODO: I was here trying to implement clipping, e.g. scrollupdate.wrapperTop and wrapperHeight
		}
	}

	_scrollPause() {
		let scrollUpdate = this._scrollUpdate;
		let style = this.el.style;

		if (scrollUpdate.inExtendedViewport) {
			style.display = 'block';
			style.willChange = 'transform';
		} else {
			if (this._canSafelyBeUnloadedFromGPU()) {
				style.display = 'none';
			} else {
				//This reduces gpu memory a ton and also hides text at the edge of the viewport.
				//Otherwise those elements would be visible behind the adress bar in iOS.
				//There's no inverse operation to that because once it is inside the viewport again
				//the translation will overwrite the scale transform.
				style.transform = style.WebkitTransform = style.msTransform = 'scale(0)';
			}

			style.willChange = 'auto';
		}
	}
}
