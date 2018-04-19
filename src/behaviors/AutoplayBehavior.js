// @flow

import Behavior from 'behaviors/Behavior.js';

export default class AutoplayBehavior extends Behavior {
	static get behaviorSchema(): any {
		return {};
	}

	static get behaviorName(): string {
		return 'autoplay';
	}

	static get behaviorDependencies(): Array<string> {
		return ['layout'];
	}

	behaviorDidAttach() {
		let video = this.el.querySelector('video');

		this.listen('layout:viewport:enter', () => {
			video.play();
		});

		this.listen('layout:viewport:leave', () => {
			video.pause();
		});
	}
}
