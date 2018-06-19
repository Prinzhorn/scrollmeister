// @flow

import raf from 'raf';

import GuidesLayoutEngine from 'lib/GuidesLayoutEngine.js';

import Behavior from 'behaviors/Behavior.js';

export default class GuidesLayoutBehavior extends Behavior {
	static get behaviorSchema(): any {
		return {
			guides: {
				type: [[{ name: 'string' }, { position: 'csslength' }, { width: 'csslength' }]],
				expand: function(rawProperties) {
					//The width is optional and defaults to 0.
					if (rawProperties.length === 2) {
						rawProperties.push('0');
						return true;
					}

					return false;
				},
				default: ''
			},
			width: {
				type: 'csslength',
				default: '1280px'
			}
		};
	}

	static get behaviorName(): string {
		return 'guides-layout';
	}

	static get behaviorDependencies(): Array<string> {
		return [];
	}

	behaviorDidAttach() {
		this._layoutScheduled = false;

		this._initLayoutEngine();
	}

	update() {
		this._scheduleLayout();
	}

	_initLayoutEngine() {
		this.engine = new GuidesLayoutEngine();

		this.listenAndInvoke(window, 'resize', () => {
			let viewport = this._getViewport();
			let changed = this.engine.updateViewport(viewport);

			if (changed) {
				this._scheduleLayout();
			}
		});

		//Whenever a new layout behavior is attached or changed, we need to do layout.
		this.listen('layout:attach layout:detach layout:update layout:heightchange', this._scheduleLayout.bind(this));
	}

	_getScrollbarWidth() {
		//Sue me.
		//Forcing the whole document to reflow three times (by forcing overflow scroll/hidden) is insanely costly.
		//It took about 2.5ms. Compared to the 0.7ms that doLayout takes in total, this was the bottleneck by far.
		//Note: I don't like the yellow stuff in my Performance tab.
		if (this._getScrollbarWidth.hasOwnProperty('_cache')) {
			return this._getScrollbarWidth._cache;
		}

		let documentElement = document.documentElement;

		if (!documentElement) {
			throw new Error('There is no documentElement to get the scrollbar width of.');
		}

		let originalOverflow = documentElement.style.overflowY;

		//Force a scrollbar to get the inner dimensions.
		documentElement.style.overflowY = 'scroll';

		let innerWidth = documentElement.clientWidth;

		//Force NO scrollbar to get the outer dimensions.
		documentElement.style.overflowY = 'hidden';

		let outerWidth = documentElement.clientWidth;

		//Restore overflow.
		documentElement.style.overflowY = originalOverflow;

		let scrollbarWidth = (this._getScrollbarWidth._cache = outerWidth - innerWidth);

		return scrollbarWidth;
	}

	_getViewport(): { width: number, height: number, outerWidth: number, outerHeight: number } {
		if (!this._viewportSizeElement) {
			this._viewportSizeElement = document.createElement('div');
			this._viewportSizeElement.style.cssText = `
				width: 100vw;
				height: 100vh;
				position: fixed;
				left: -100vw;
				top: -100vh;
				pointer-events: none;
				visibility: hidden;
				opacity: 0;
				z-index: -1;`;
			this.appendChild(this._viewportSizeElement);
		}

		let box = this._viewportSizeElement.getBoundingClientRect();
		let outerWidth = box.width;
		let width = outerWidth - this._getScrollbarWidth();
		let height = box.height;
		let outerHeight = height;

		return {
			width,
			height,
			outerWidth,
			outerHeight
		};
	}

	_scheduleLayout() {
		if (!this._layoutScheduled) {
			raf(this._doLayout.bind(this));
			this._layoutScheduled = true;
		}
	}

	_doLayout() {
		this._layoutScheduled = false;

		let nodes = Array.prototype.slice.call(this.el.querySelectorAll('[layout]')).map(el => el.layout);

		this.engine.doLayout(nodes, this.props.guides, this.props.width);

		this.notify();
	}
}
