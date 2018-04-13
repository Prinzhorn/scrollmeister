// @flow

import Behavior from 'behaviors/Behavior.js';

export default class FadeInBehavior extends Behavior {
	static get behaviorSchema(): any {
		return {};
	}

	static get behaviorName(): string {
		return 'fadein';
	}

	static get behaviorDependencies(): Array<string> {
		return ['guides-layout'];
	}

	behaviorDidAttach() {
		//Make sure the very first render took place and everything is updated.
		this.listenOnce('guides-layout:change', () => {
			this.el.style.opacity = 1;
		});
	}

	behaviorWillDetach() {
		this.el.style.opacity = '';
	}
}
