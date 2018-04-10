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
		return ['guides-layout'];
	}

	attach() {
		//Make sure the very first render took place and everything is updated.
		this.listenOnce('guides-layout:change', () => {
			this.el.style.opacity = 1;
		});
	}

	detach() {
		this.el.style.opacity = '';
	}
}
