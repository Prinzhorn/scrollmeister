// @flow

import ResizeObserver from 'resize-observer-polyfill';

import Behavior from 'behaviors/Behavior.js';

import type ScrollState from 'lib/ScrollState.js';
import type GuideLayoutBehavior from 'behaviors/GuideLayoutBehavior.js';

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
				expand: function(rawProperties) {
					//Allow a single spacing and use it for both top and bottom.
					if (rawProperties.length === 1) {
						rawProperties.push(rawProperties[0]);
						return true;
					}

					return false;
				},
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

	static get dependencies(): Array<string> {
		return ['^guidelayout'];
	}

	static get behaviorName(): string {
		return 'layout';
	}

	attach() {
		this.intrinsicHeight = 0;

		this.scrollUpdate = {};
		this.layout = {};

		//TODO: only wrap if needed? In most cases we don't need innerEl at all. Only for specific cases, e.g. followers with clipping.
		//But still always define innerEl, even if it is === el
		this._wrapContents();

		this.connectTo('^guidelayout', this._render.bind(this));

		//TODO: Once we unify stuff and separate guidelayout and scrolling, this will be scroll:change.
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

	update(prevProps: { height: 'auto' | { length: number, unit: string } }) {
		if (this.props.height !== prevProps.height) {
			if (this.props.height === 'auto') {
				this._observeHeight();
			} else if (prevProps.height === 'auto') {
				this._unobserveHeight();
			}
		}
	}

	detach() {
		if (this.props.height === 'auto') {
			this._unobserveHeight();
		}

		this._unwrapContents();
		//TODO: remove styles
	}

	//Some of the layout rendering (e.g. clipping with parallax) requires a single child element.
	_wrapContents() {
		//TODO: use a custom element instead of a div, so we can use .css. and not worry about clean up.
		//But need be innerCSS? Ugh.

		//Includes elements and also text nodes.
		let childNodes = this.el.childNodes;
		let childElements = this.el.children;

		//There is just a single element, maybe we don't need to wrap anything (*fingers crossed*).
		if (childElements.length === 1) {
			//There are no text nodes, just this one element. #winning
			if (childNodes.length === 1) {
				this.innerEl = childElements[0];
				this.contentEl = this.el;
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

				if (child.nodeType === Node.TEXT_NODE && child.textContent.trim() !== '') {
					onlyEmptyTextNodes = false;
					break;
				}
			}

			if (onlyEmptyTextNodes) {
				this.innerEl = childElements[0];
				this.contentEl = this.el;
				return;
			}
		}

		//TODO: event if childElements.length is > 1, we might still not need to wrap if length - 1 are just <script> tags.

		console.log(`Wrapped ${childNodes.length} children in a <div>`); // eslint-disable-line

		let fragment = document.createDocumentFragment();
		this.innerEl = document.createElement('div');

		//childNodes is a live list, so length gets smaller.
		while (childNodes.length > 0) {
			fragment.appendChild(childNodes[0]);
		}

		this.innerEl.appendChild(fragment);
		this.el.appendChild(this.innerEl);
		this.contentEl = this.innerEl;
	}

	_unwrapContents() {
		if (this.innerEl === this.contentEl) {
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
			this.intrinsicHeight = entries[0].contentRect.height;
			this.emit('heightchange');
		});

		this._resizeObserver.observe(this.innerEl);
	}

	_unobserveHeight() {
		this._resizeObserver.disconnect();
		this._resizeObserver = null;
	}

	_render(guidelayoutBehavior: GuideLayoutBehavior) {
		this._renderWrapper();
		this._renderInner();

		//Force a scroll update.
		this._scroll(guidelayoutBehavior.scrollState, true);

		this.notify();
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
		let contain = 'strict';

		if (this.props.clip) {
			height = this.layout.clipRect.height;
			overflow = 'hidden';
		}

		style.display = display;
		style.overflow = overflow;
		style.width = Math.round(width) + 'px';
		style.height = Math.round(height) + 'px';
		style.contain = contain;
	}

	_renderInner() {
		let style = this.innerEl.style;
		let width = this.layout.width;

		style.position = 'relative';
		style.width = Math.round(width) + 'px';

		if (this.props.height === 'auto') {
			style.height = 'auto';
		} else {
			style.height = Math.round(this.layout.height) + 'px';
		}

		if (this.props.clip) {
			style.backfaceVisibility = style.WebkitBackfaceVisibility = 'hidden';
		}
	}

	_scroll(scrollState: ScrollState, forceUpdate: boolean = false) {
		let scrollUpdate = this.scrollUpdate;

		let style = this.el.style;
		let innerStyle = this.innerEl.style;

		this.parentEl.guidelayout.engine.doScroll(this.layout, scrollState.position, scrollUpdate);

		if (scrollUpdate.wrapperTopChanged || forceUpdate) {
			let left = Math.round(this.layout.left);
			let top = scrollUpdate.wrapperTop;

			//We force the tile to be visible (loaded into GPU) when it is inside the viewport.
			//But we do not do the opposite here. This is just the last resort.
			//Under normal circumstances an async process (_scrollPause) toggles display block/none intelligently.
			if (scrollUpdate.inViewport) {
				style.display = 'block';
				style.willChange = 'transform';
			}

			this.style.transform = `translate(${left}px, ${top}px)`;

			//The reason we don't blindly apply the CSS transform is that most elements don't need a transform on the content layer at all.
			//This would waste a ton of GPU memory for no reason. The only elements that need it are things like parallax scrolling
			//or elements with appear effects using scaling/rotation.
			innerStyle.msTransform = `translate(0, ${scrollUpdate.contentTopOffset}px)`;
			innerStyle.transform = innerStyle.WebkitTransform = `translate3d(0px, ${scrollUpdate.contentTopOffset}px, 0)`;

			//TODO: only needed when the inner element is actually translated, e.g. parallax / pinning.
			//style.willChange = scrollUpdate.inExtendedViewport ? 'transform' : 'auto';

			//TODO: I was here trying to implement clipping, e.g. scrollupdate.wrapperTop and wrapperHeight
		}

		if (scrollUpdate.inExtendedViewportChanged) {
			if (scrollUpdate.inExtendedViewportChanged) {
				this.emit('extendedviewport:enter');
			} else {
				this.emit('extendedviewport:leave');
			}
		}

		if (scrollUpdate.inViewportChanged) {
			if (scrollUpdate.inViewport) {
				this.emit('viewport:enter');
			} else {
				this.emit('viewport:leave');
			}
		}

		if (scrollUpdate.inCenterChanged) {
			if (scrollUpdate.inCenter) {
				this.emit('center:enter');
			} else {
				this.emit('center:leave');
			}
		}
	}

	_scrollPause() {
		let scrollUpdate = this.scrollUpdate;
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
