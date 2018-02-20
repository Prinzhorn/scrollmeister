// @flow

import raf from 'raf';

import GuideDefinitionType from 'types/GuideDefinitionType.js';
import CSSLengthType from 'types/CSSLengthType.js';

import Behavior from 'behaviors/Behavior.js';

import GuideLayoutEngine from 'lib/GuideLayoutEngine.js';

export default class LayoutBehavior extends Behavior {
	static get schema(): any {
		return {
			guides: {
				type: [GuideDefinitionType]
				//TODO: can we default to an empty array here by using an empty string?
			},
			width: {
				type: CSSLengthType,
				default: '1400px'
			}
		};
	}

	static get dependencies(): Array<string> {
		return [];
	}

	static get behaviorName(): string {
		return 'guidelayout';
	}

	attach() {
		this._layoutScheduled = false;

		this.engine = new GuideLayoutEngine();

		this.listenAndInvoke(window, 'resize', () => {
			let viewport = this._getViewport();
			this.engine.updateViewport(viewport);
			this._scheduleLayout();
		});

		//Whenever a new dimensions/position behavior is attached or changed, we need to do layout.
		this.listen(document, 'layout:attach layout:update', () => {
			this._scheduleLayout();
			console.log('a layout behavior changed or attached');
		});

		this.element.title = 'behavior did this 1';
	}

	detach() {
		this.element.title = 'clean af';
	}

	scroll() {}

	_getViewport(): { width: number, height: number, outerWidth: number, outerHeight: number } {
		let documentElement = document.documentElement;

		if (!documentElement) {
			throw new Error('There is no documentElement to get the size of.');
		}

		let originalOverflow = documentElement.style.overflowY;

		//Force a scrollbar to get the inner dimensions.
		documentElement.style.overflowY = 'scroll';

		let width = documentElement.clientWidth;
		let height = documentElement.clientHeight;

		//Force NO scrollbar to get the outer dimensions.
		documentElement.style.overflowY = 'hidden';

		let outerWidth = documentElement.clientWidth;
		let outerHeight = documentElement.clientHeight;

		//Restore overflow.
		documentElement.style.overflowY = originalOverflow;

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

	//TODO: do we also need to clean up here if the dimensions/position behavior is removed?
	//Or do the behaviors handle this (they should)? Do they listen to the layout event on this node?
	_doLayout() {
		let elements = this.element.querySelectorAll('[layout]');

		this.engine.doLayout(elements, this.props.guides, this.props.width);

		this._layoutScheduled = false;

		this.emit('layout');
	}
}
