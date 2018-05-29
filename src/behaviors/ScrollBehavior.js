// @flow

import raf from 'raf';

import ScrollState from 'lib/ScrollState.js';
import easings from 'lib/easings.js';

import Behavior from 'behaviors/Behavior.js';
import type GuidesLayoutBehavior from 'behaviors/GuidesLayoutBehavior.js';

export default class ScrollBehavior extends Behavior {
	static get behaviorSchema(): any {
		return {};
	}

	static get behaviorName(): string {
		return 'scroll';
	}

	static get behaviorDependencies(): Array<string> {
		return ['guides-layout'];
	}

	behaviorDidAttach() {
		this._scrollAnimation = null;

		this._lastScrollTime = -1;

		this.scrollState = new ScrollState(this.notify.bind(this), this.emit.bind(this, 'pause', false));

		this.connectTo('guides-layout', this._updateScrollHeight.bind(this));

		//It is important that the _scrollLoop is scheduled after initLayoutEngine (which schedules layout).
		//This guarantees that the very first `scroll` event will be emited AFTER the very first `layout` event.
		raf(this._scrollLoop.bind(this));
	}

	behaviorWillDetach() {
		this.scrollState.destroy();
	}

	_updateScrollAnimation(now: number) {
		let animation = this._scrollAnimation;

		if (!animation.hasOwnProperty('startTime')) {
			animation.startTime = now;
			animation.endTime = now + Math.abs(animation.targetPosition - animation.startPosition) / 3;
		}

		let currentScrollPosition;

		if (now > animation.endTime) {
			currentScrollPosition = animation.targetPosition;
			this._scrollAnimation = null;
		} else {
			let progress;

			progress = 1 - (animation.endTime - now) / (animation.endTime - animation.startTime);
			progress = easings.outCubic(progress);

			currentScrollPosition = animation.startPosition + (animation.targetPosition - animation.startPosition) * progress;
		}

		this.scrollTo(currentScrollPosition);
	}

	scrollTo(position: number, animate: boolean = false) {
		position = Math.round(position);

		if (animate) {
			let currentPosition = this.getPosition();

			this._scrollAnimation = {
				startPosition: currentPosition,
				targetPosition: position
			};
		} else {
			window.scrollTo(0, position);
		}
	}

	_scrollLoop(now: number) {
		//The very first frame doesn't have a previous one.
		if (this._lastScrollTime === -1) {
			this._lastScrollTime = now;
		}

		this._pollScrollPosition(now);

		this._lastScrollTime = now;
		raf(this._scrollLoop.bind(this));
	}

	getPosition() {
		if (!document.documentElement || !document.body) {
			throw new Error('There is no documentElement or body to get the scroll position from.');
		}

		return document.documentElement.scrollTop || document.body.scrollTop;
	}

	_pollScrollPosition(now: number) {
		if (this._scrollAnimation) {
			this._updateScrollAnimation(now);
		}

		this.scrollState.tick(now, this.getPosition());
	}

	_updateScrollHeight(guidesLayoutBehavior: GuidesLayoutBehavior) {
		let layoutEngine = guidesLayoutBehavior.engine;
		let requiredHeight = layoutEngine.requiredHeight;

		this.style.height = Math.round(requiredHeight) + 'px';

		this.scrollState.maxPosition = requiredHeight - layoutEngine.viewport.height;

		//Make sure we don't lose our relative scroll position.
		this.scrollTo(this.scrollState.maxPosition * this.scrollState.progress);
	}
}
