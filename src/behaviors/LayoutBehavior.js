// @flow

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
		return 'layout';
	}

	attach() {
		this.engine = new GuideLayoutEngine();

		this.listenAndInvoke(window, 'resize', () => {
			let viewport = this._getViewport();
			this.engine.updateViewport(viewport);
			this.engine.doLayout(this.guides, this.width);
			this.emit('layout');
		});

		// The change events of the dimensions behavior bubble up here.
		this.listen(document, 'dimensions:change', function() {
			console.log('a dimensions behavior changed');
		});

		this.listen(document, 'dimensions:intrinsicheightchange', function() {
			console.log('a thing changed its intrinsic height');
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
}
