// @flow

import Behavior from 'behaviors/Behavior.js';

import type InterpolateBehavior from 'behaviors/InterpolateBehavior.js';

export default class ScrubBehavior extends Behavior {
	static get schema(): any {
		return {
			parameter: {
				type: 'string',
				enum: ['alpha', 'beta', 'gamma'],
				default: 'alpha'
			}
		};
	}

	static get behaviorName(): string {
		return 'scrub';
	}

	static get dependencies(): Array<string> {
		return ['interpolate'];
	}

	attach() {
		this.videoEl = this.el.querySelector('video');
		this._waitingForSeeked = false;

		this.connectTo('interpolate', this._seek.bind(this));

		//TODO: same problem here and the flag won't help.
		//Even remembering if the event had fired before won't help (it might not be in viewport anymore).
		this.listen('layout:extendedviewport:enter', () => {
			this.videoEl.load();
		});
	}

	_getProgress(interpolateBehavior: InterpolateBehavior) {
		let value = interpolateBehavior.values[this.props.parameter];

		//Make sure the value is between 0 and 1.
		//If it is 3.2, this will make it 0.2.
		//This allow looping through the video, e.g. five times.
		//Comparing with > 1 makes sure that +-1.0 does not get converted to 0.0.
		if (Math.abs(value) > 1) {
			value = value % 1;
		}

		//When the value is negative, we count from the end of the video.
		//So -0.2 is the same as a progress of 0.8.
		if (value < 0) {
			value = 1 + value;
		}

		return value;
	}

	_seek(interpolateBehavior: InterpolateBehavior) {
		const video = this.videoEl;

		//Video not ready yet.
		if (!isFinite(video.duration)) {
			return;
		}

		//When the browser is still busy with seeking, don't jump to a new time yet.
		//Wait for it to be done and then update it.
		if (video.seeking) {
			if (!this._waitingForSeeked) {
				this._waitingForSeeked = true;

				this.listenOnce(video, 'seeked', () => {
					this._waitingForSeeked = false;

					video.currentTime = video.duration * this._getProgress(interpolateBehavior);
					video.pause();
					this.notify();
				});
			}
		} else {
			video.currentTime = video.duration * this._getProgress(interpolateBehavior);
			video.pause();
			this.notify();
		}
	}
}
