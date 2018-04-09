// @flow

import Behavior from 'behaviors/Behavior.js';

//TODO: so basically do we need a fullscreen behavior at all?
//The layout behavior HAS to know about fullscreen anyway, because the fullscreenLayout comes from the layoutengine.
//It also needs to be _kind of_ transparent for the layout behavior though. It just gets new dimensions and that's it.
//So maybe the fullscreen behavior tells the GuideLayoutEngine to make the thing fullscreen?
//We also need to guarantee that only a single element is ever fullscreened. So this needs to be controlled by guide-layout at the top.

export default class FullscreenBehavior extends Behavior {
	static get schema(): any {
		return {};
	}

	static get behaviorName(): string {
		return 'fullscreen';
	}

	static get dependencies(): Array<string> {
		return ['^guide-layout', 'layout'];
	}

	attach() {
		this.fullscreen = false;

		this.listen('click', () => {
			this.toggleFullscreen();
		});

		this.el.style.cursor = 'pointer';

		//TODO: ESC key to close
		//TODO: Mobile indicator
	}

	detach() {
		this.el.style.cursor = '';

		if (this.fullscreen) {
			this.exit();
		}
	}

	toggleFullscreen() {
		if (this.fullscreen) {
			this.exitFullscreen();
		} else {
			this.enterFullscreen();
		}
	}

	enterFullscreen() {
		this.fullscreen = true;

		this.emit('enter');
	}

	exitFullscreen() {
		this.fullscreen = false;

		this.emit('exit');
	}
}
