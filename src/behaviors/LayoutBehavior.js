// @flow

import ResizeObserver from 'resize-observer-polyfill';

import Behavior from 'behaviors/Behavior.js';

import type ScrollBehavior from 'behaviors/ScrollBehavior.js';

export default class LayoutBehavior extends Behavior {
	static get behaviorSchema(): any {
		return {
			guides: {
				type: [{ left: 'string' }, { right: 'string' }],
				default: 'viewport',
				expand: function(rawProperties) {
					//We only expand a single "viewport".
					if (rawProperties.length === 1 && rawProperties[0] === 'viewport') {
						rawProperties.push('viewport');
						return true;
					}

					return false;
				}
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
				type: 'layoutdependencies',
				default: 'inherit'
			}
		};
	}

	static get behaviorName(): string {
		return 'layout';
	}

	static get behaviorDependencies(): Array<string> {
		return ['^guides-layout', '^scroll'];
	}

	behaviorDidAttach() {
		this.intrinsicHeight = 0;

		this.scrollUpdate = {};
		this.layout = {};

		this.connectTo('^guides-layout', this._render.bind(this));
		this.connectTo('^scroll', this._scroll.bind(this));

		this.listen('^scroll:pause', this._scrollPause.bind(this));

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

	behaviorWillDetach() {
		if (this.props.height === 'auto') {
			this._unobserveHeight();
		}

		//TODO: remove styles (or use this.style and this.contentStyle for ALL the things)
	}

	_observeHeight() {
		this._resizeObserver = new ResizeObserver(entries => {
			this.intrinsicHeight = entries[0].contentRect.height;
			this.emit('heightchange');
		});

		this._resizeObserver.observe(this.contentEl);
	}

	_unobserveHeight() {
		this._resizeObserver.disconnect();
		this._resizeObserver = null;
	}

	_render() {
		this._renderWrapper();
		this._renderContent();

		//Force a scroll update.
		this._scroll(this.parentEl.scroll, true);

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

	_renderContent() {
		let style = this.contentEl.style;
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

	_scroll(scrollBehavior: ScrollBehavior, forceUpdate: boolean = false) {
		let scrollUpdate = this.scrollUpdate;

		let style = this.el.style;
		let contentStyle = this.contentEl.style;

		this.parentEl.guidesLayout.engine.doScroll(this.layout, scrollBehavior.scrollState.position, scrollUpdate);

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
			contentStyle.msTransform = `translate(0, ${scrollUpdate.contentTopOffset}px)`;
			contentStyle.transform = contentStyle.WebkitTransform = `translate3d(0px, ${scrollUpdate.contentTopOffset}px, 0)`;

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
