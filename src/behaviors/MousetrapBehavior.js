// @flow

import Behavior from 'behaviors/Behavior.js';

export default class MousetrapBehavior extends Behavior {
	static get schema(): any {
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

	static get dependencies(): Array<string> {
		return ['^guidelayout'];
	}

	attach() {
		this._render();
	}

	update() {
		this._render();
	}

	detach() {
		this.el.style.pointerEvents = '';
	}

	_render() {
		//TODO: access scrollmode here?
		//TODO: instead of pointer events, add an overlay div to the <shadow-meister>.
		this.el.style.pointerEvents = 'none';
	}
}
