// @flow

import StringType from 'types/StringType.js';
import Behavior from 'behaviors/Behavior.js';

export default class DebugGuidesBehavior extends Behavior {
	static get schema(): any {
		return {
			/*
			color: {
				type: StringType
			}
			*/
		};
	}

	static get dependencies(): Array<string> {
		return ['layout'];
	}

	static get behaviorName(): string {
		return 'debug-guides';
	}

	attach() {
		this._createElement();

		this.listenAndInvoke(this.element, 'layout:layout', () => {
			this._renderGuides();
		});
	}

	detach() {
		this._removeElement();
	}

	scroll() {}

	_createElement() {
		this._guidesWrapper = document.createElement('div');
		this._guidesWrapper.style.cssText = `
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			pointer-events: none;
		`;

		if (document.body) {
			document.body.appendChild(this._guidesWrapper);
		}
	}

	_removeElement() {
		if (document.body) {
			document.body.removeChild(this._guidesWrapper);
		}
	}

	_renderGuides() {
		let guides = this.element.layout.engine.guides;
		let html = guides.map(guide => {
			if (guide.width === 0) {
				return `
					<div title="${guide.name}" style="position: absolute; top: 0; bottom: 0; background: rgba(0, 0, 255, 1); left: ${guide.rightPosition}px; width: 1px;"></div>
				`;
			} else {
				return `
					<div title="${guide.name}" style="position: absolute; top: 0; bottom: 0; background: rgba(0, 255, 255, 0.5); left: ${guide.rightPosition}px; width: ${guide.width}px;"></div>
				`;
			}
		});

		this._guidesWrapper.innerHTML = html.join('');
	}
}
