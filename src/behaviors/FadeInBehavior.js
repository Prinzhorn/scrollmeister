// @flow

import Behavior from 'behaviors/Behavior.js';

export default class FadeInBehavior extends Behavior {
	static get schema(): any {
		return {};
	}

	static get behaviorName(): string {
		return 'fadein';
	}

	static get dependencies(): Array<string> {
		return [];
	}

	attach() {
		this.el.style.opacity = 1;
	}

	detach() {
		this.el.style.opacity = '';
	}
}
