// @flow

import Behavior from 'behaviors/Behavior.js';

import type GuidesLayoutBehavior from 'behaviors/GuidesLayoutBehavior.js';

export default class DebugGuidesBehavior extends Behavior {
	static get behaviorSchema(): any {
		return {
			color: {
				type: 'string',
				default: '#0cf'
			}
		};
	}

	static get behaviorName(): string {
		return 'debug-guides';
	}

	static get behaviorDependencies(): Array<string> {
		return ['guides-layout'];
	}

	behaviorDidAttach() {
		this._createElement();

		this.connectTo('guides-layout', this._render.bind(this));
	}

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

		this.appendChild(this._guidesWrapper);
	}

	_render(guidesLayoutBehavior: GuidesLayoutBehavior) {
		let guides = guidesLayoutBehavior.engine.guides;

		let html = guides.map(guide => {
			let width = guide.width;
			let opacity = 0.2;

			if (guide.width === 0) {
				width = 1;
				opacity = 1;
			}

			return `
				<div title="${guide.name}" style="position: absolute; top: 0; bottom: 0; background:${this.props.color}; left: ${
				guide.rightPosition
			}px; opacity: ${opacity}; px; width: ${width}px;"></div>
			`;
		});

		this._guidesWrapper.innerHTML = html.join('');

		this.notify();
	}
}
