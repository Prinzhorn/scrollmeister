// @flow

import Behavior from 'behaviors/Behavior.js';

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

		//TODO: if scrub is added lazy we won't get the first thing.
		this.listen('interpolate:change', () => {
			this._seek();
		});

		this.listen('layout:extendedviewport:enter', () => {
			this.videoEl.load();
		});
	}

	_getProgress() {
		let value = this.el.interpolate.values[this.props.parameter];

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

	_seek(progress) {
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

					video.currentTime = video.duration * this._getProgress();
					video.pause();
				});
			}
		} else {
			video.currentTime = video.duration * this._getProgress();
			video.pause();
		}
	}
}
