// @flow

import ResizeObserver from 'resize-observer-polyfill';

import StringType from 'types/StringType.js';
import LayoutDependencyType from 'types/LayoutDependencyType.js';
import HeightType from 'types/HeightType.js';
import FollowerModeType from 'types/FollowerModeType.js';
import CSSLengthType from 'types/CSSLengthType.js';

import Behavior from 'behaviors/Behavior.js';

export default class DimensionsBehavior extends Behavior {
	//TODO: instead of StringType or LayoutDependencyType we need to give them names such as "string" and "layout-dependency".
	//Otherwise you cannot just create a custom behavior in a <script> tag without importing the types.
	static get schema(): any {
		return {
			guides: {
				type: [{ left: StringType }, { right: StringType }]
			},
			height: {
				type: HeightType,
				default: 'auto'
			},
			mode: {
				type: StringType.createEnum('mode', ['flow', 'follow']),
				default: 'flow'
			},
			followerMode: {
				type: StringType.createEnum('followerMode', ['parallax', 'pin']),
				default: 'parallax'
			},
			pinAnchor: {
				type: StringType.createEnum('pinAnchor', ['top', 'center', 'bottom']),
				default: 'center'
			},
			pinOffset: {
				type: CSSLengthType,
				default: '0'
			},
			dependencies: {
				type: LayoutDependencyType,
				default: 'inherit'
			},
			spacing: {
				type: [{ top: CSSLengthType }, { bottom: CSSLengthType }],
				//TODO: in cases like this we might want to accept "100vh" and automatically expand it to "100vh 100vh" (for arity 2 and 4).
				//When arity is 2, expand 100vh to 100vh 100vh. If it is 4, do the CSS dance.
				//E.g. 100vh 40vh expands to 100vh 40vh 100vh 40vh
				//and 100vh 30vh 40vh to 100vh 30vh 40vh 30vh
				//expand: true,
				//For now KISS
				default: '0 0'
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

		this._wrapContents();

		//Listen to the layout event of the layout behavior.
		//TODO: is gut? We can always refactor, but does this make sense though?
		//This means possibly hundreds of DimensionsBehaviors will react to this event.
		//We could instead reverse the responsibility and have the layout behavior
		//Call a method on each of the children.
		//Maybe we should just merge Dimensions+PositionBehavior because they belong together anyway.
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
	}

	scroll(status, engine) {
		let transformedTop = engine.doScroll(this, status.position);
		this.element.style.transform = `translate3d(${Math.round(this.left)}px, ${transformedTop}px, 0)`;

		//TODO: we need to combine _render and scroll and make sure they're consistently called (need access to the engine tho).
	}

	//Some of the layout rendering (e.g. clipping with parallax) requires a single child element.
	_wrapContents() {
		//Includes elements and also text nodes.
		let childNodes = this.element.childNodes;
		let childElements = this.element.children;

		//There is just a single element, maybe we don't need to wrap anything (*fingers crossed*).
		if (childElements.length === 1) {
			//There are no text nodes, just this one element. #winning
			if (childNodes.length === 1) {
				this.innerElement = childElements[0];
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
				this.innerElement = childElements[0];
				return;
			}
		}

		console.log(`Wrapped ${childNodes.length} children in a <div>`);

		this._wrappedContents = true;

		let fragment = document.createDocumentFragment();
		this.innerElement = document.createElement('div');

		//childNodes is a live list.
		while (childNodes.length > 0) {
			fragment.appendChild(childNodes[0]);
		}

		this.innerElement.appendChild(fragment);
		this.element.appendChild(this.innerElement);
	}

	_unwrapContents() {
		if (this._wrappedContents) {
			let childNodes = this.innerElement.childNodes;
			let fragment = document.createDocumentFragment();

			//childNodes is a live list.
			while (childNodes.length > 0) {
				fragment.appendChild(childNodes[0]);
			}

			this.element.removeChild(this.innerElement);
			this.element.appendChild(fragment);
		}
	}

	_observeHeight() {
		this._resizeObserver = new ResizeObserver(entries => {
			this.setState({
				height: entries[0].contentRect.height
			});
		});

		this._resizeObserver.observe(this.element);
	}

	_unobserveHeight() {
		if (this._resizeObserver) {
			this._resizeObserver.disconnect();
			this._resizeObserver = null;
		}
	}

	_render() {
		let style = this.element.style;
		let left = Math.round(this.left);
		let top = Math.round(this.top);

		style.msTransform = `translate(${left}px, ${top}px)`;
		style.transform = style.WebkitTransform = `translate3d(${left}px, ${top}px, 0)`;

		style.width = Math.round(this.width) + 'px';
		style.height = this.props.height === 'auto' ? 'auto' : Math.round(this.height) + 'px';

		style.overflow = 'hidden';
	}
}
