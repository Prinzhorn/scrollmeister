// @flow

import Behavior from 'behaviors/Behavior.js';

export default class DebugGuidesBehavior extends Behavior {
	static get schema(): any {
		return {};
	}

	static get dependencies(): Array<string> {
		return [];
	}

	static get behaviorName(): string {
		return 'fadein';
	}

	attach() {
		this.el.style.opacity = 1;
	}

	detach() {
		this.el.style.opacity = '';
	}
}
