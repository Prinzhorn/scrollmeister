// @flow

import YouTubeIframeLoader from 'youtube-iframe';

import Behavior from 'behaviors/Behavior.js';

export default class FadeInBehavior extends Behavior {
	_playASAP: boolean;

	static get behaviorSchema(): any {
		return {};
	}

	static get behaviorName(): string {
		return 'youtube';
	}

	static get behaviorDependencies(): Array<string> {
		return [];
	}

	behaviorDidAttach() {
		this._playASAP = false;

		let iframe = this.el.querySelector('iframe');

		if (!iframe) {
			this.error(new Error('The youtube behavior expects a YouTube <iframe> as child of the element.'));
		}

		if (iframe.src.indexOf('enablejsapi=1') === -1) {
			this.error(
				new Error(
					`To use the youtube behavior the YouTube <iframe> src needs the "enablejsapi=1" parameter. The source is "${
						iframe.src
					}".`
				)
			);
		}

		YouTubeIframeLoader.load(YT => {
			this._player = new YT.Player(iframe);

			if (this._playASAP) {
				this._player.playVideo();
			}
		});
	}

	playVideo() {
		if (this._player) {
			this._player.playVideo();
		} else {
			this._playASAP = true;
		}
	}

	pauseVideo() {
		if (this._player) {
			this._player.pauseVideo();
		} else {
			this._playASAP = false;
		}
	}
}
