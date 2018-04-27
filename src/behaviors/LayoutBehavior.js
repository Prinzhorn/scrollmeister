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
			},
			hidden: {
				type: 'boolean',
				default: 'false'
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

		this.scrollUpdate = {
			//All others are undefined by default, which causes all of them to return *changed for the first scroll.
			//E.g. wrapperTopChanged will _always_ be true for the very first scroll.
			//But we don't always need CSS transforms on the content element.
			//If the contentTopOffset is always 0 (basically if it's a flow element) then
			//contentTopOffsetChanged will never become true.
			contentTopOffset: 0
		};
		this.layout = {};

		this.connectTo('^guides-layout', this._render.bind(this));
		this.connectTo('^scroll', this._scroll.bind(this));

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
		let overflow = 'visible';
		let width = this.layout.width;
		let height = this.layout.height;

		if (this.props.clip) {
			overflow = 'hidden';
			height = this.layout.clipRect.height;
		}

		if (this.props.hidden) {
			this.style.left = '500vw';
			this.style.top = '500vh';
			this.style.visibility = 'hidden';
			overflow = 'hidden';
		} else {
			this.style.left = '';
			this.style.top = '';
			this.style.visibility = '';
		}

		this.style.overflow = overflow;
		this.style.width = Math.round(width) + 'px';
		this.style.height = Math.round(height) + 'px';
	}

	_renderContent() {
		this.contentStyle.position = 'relative';
		this.contentStyle.width = Math.round(this.layout.width) + 'px';

		if (this.props.height === 'auto') {
			this.contentStyle.height = '';
		} else {
			this.contentStyle.height = Math.round(this.layout.height) + 'px';
		}
	}

	_scroll(scrollBehavior: ScrollBehavior, forceUpdate: boolean = false) {
		let scrollUpdate = this.scrollUpdate;

		this.parentEl.guidesLayout.engine.doScroll(this.layout, scrollBehavior.scrollState.position, scrollUpdate);

		if (this.props.hidden) {
			this.style.willChange = '';
			this.style.backfaceVisibility = '';
			this.style.perspective = '';
			this.style.transform = '';
		} else {
			if (scrollUpdate.wrapperTopChanged || forceUpdate) {
				let left = Math.round(this.layout.left);
				let top = scrollUpdate.wrapperTop;

				this.style.willChange = 'transform';
				this.style.backfaceVisibility = 'hidden';
				this.style.perspective = '1000';
				this.style.transform = `translate(${left}px, ${top}px)`;
			}

			//The reason we don't blindly apply the CSS transform is that most elements don't need a transform on the content layer at all.
			//This would waste a ton of GPU memory for no reason. The only elements that need it are things like parallax scrolling.
			//Since we default contentTopOffset to 0, this check should be false for all flow elements.
			if (scrollUpdate.contentTopOffsetChanged) {
				this.contentStyle.willChange = 'transform';
				this.contentStyle.backfaceVisibility = 'hidden';
				this.contentStyle.perspective = '1000';
				this.contentStyle.transform = `translate(0, ${scrollUpdate.contentTopOffset}px)`;
			}
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
}
