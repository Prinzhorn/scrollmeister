// @flow

import Behavior from 'behaviors/Behavior.js';

export default class MousetrapBehavior extends Behavior {
	static get behaviorSchema(): any {
		return {
			native: {
				type: 'string',
				enum: ['always', 'fullscreen', 'never'],
				default: 'fullscreen'
			},
			touch: {
				type: 'string',
				enum: ['always', 'fullscreen', 'never'],
				default: 'fullscreen'
			}
		};
	}

	static get behaviorName(): string {
		return 'mousetrap';
	}

	static get behaviorDependencies(): Array<string> {
		return ['^guides-layout'];
	}

	behaviorDidAttach() {
		this._render();
	}

	update() {
		this._render();
	}

	_render() {
		//TODO: access scrollmode here?
		//TODO: instead of pointer events, add an overlay div to the <shadow-meister>.
		this.style.pointerEvents = 'none';
	}
}
