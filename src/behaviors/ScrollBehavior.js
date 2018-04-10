// @flow

import raf from 'raf';
import ScrollLogic from 'scroll-logic';

import ScrollState from 'lib/ScrollState.js';
import fakeClick from 'lib/fakeClick.js';
import isTextInput from 'lib/isTextInput.js';
import easings from 'lib/easings.js';

import Behavior from 'behaviors/Behavior.js';
import type GuidesLayoutBehavior from 'behaviors/GuidesLayoutBehavior.js';

type Props = {
	overscroll: boolean
};

const isAndroidFirefox = /Android; (?:Mobile|Tablet); .+ Firefox/i.test(navigator.userAgent);
const isBadAndroid = /Android /.test(navigator.userAgent) && !/Chrome\/\d/.test(navigator.userAgent);
const isAppleiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

export default class ScrollBehavior extends Behavior {
	_scrollLogic: ScrollLogic;
	_mousemoveCounter: number;

	static get schema(): any {
		return {
			overscroll: {
				type: 'boolean',
				default: 'true'
			}
		};
	}

	static get behaviorName(): string {
		return 'scroll';
	}

	static get dependencies(): Array<string> {
		return ['guides-layout'];
	}

	attach() {
		this.scrollMode = 'touch';

		this._scrollAnimation = null;

		this._lastScrollTime = -1;

		this._setupScrolling();

		this.connectTo('guides-layout', this._updateScrollHeight.bind(this));

		//It is important that the _scrollLoop is scheduled after initLayoutEngine (which schedules layout).
		//This guarantees that the very first `scroll` event will be emited AFTER the very first `layout` event.
		raf(this._scrollLoop.bind(this));
	}

	detach() {
		this.scrollState.destroy();
	}

	update(prevProps: Props) {
		if (prevProps.overscroll !== this.props.overscroll) {
			this._scrollLogic.options.bouncing = this.props.overscroll;
		}
	}

	_setupScrolling() {
		this.scrollState = new ScrollState(this.notify.bind(this), this.emit.bind(this, 'pause', false));

		this._setupMobileScrolling();
		this._handleScrollModes();
	}

	_setupMobileScrolling() {
		this._scrollLogic = new ScrollLogic({
			bouncing: this.props.overscroll
		});

		this.listen(document, 'touchstart', e => {
			//For caret positioning on mobile.
			//On "bad" Android (stock browser) preventing touchstart will cause touchmove to not fire.
			if (!isTextInput(e.target) && !isBadAndroid) {
				e.preventDefault();
				fakeClick.start(e);
			}

			this._mousemoveCounter = 0;
			this._scrollLogic.beginInteraction(e.changedTouches[0].pageY, e.timeStamp);
		});

		this.listen(document, 'touchmove', e => {
			e.preventDefault();

			this._mousemoveCounter = 0;
			this._scrollLogic.interact(e.changedTouches[0].pageY, e.timeStamp);
		});

		this.listen(document, 'touchend touchcancel', e => {
			//For caret positioning on mobile.
			if (!isTextInput(e.target) && !isBadAndroid) {
				e.preventDefault();
				fakeClick.end(e);
			}

			this._mousemoveCounter = 0;
			this._scrollLogic.endInteraction(e.timeStamp);
		});
	}

	//This thing intelligently switches between fake and native scrolling.
	//It does not do any sniffing and instead relies on scroll, mousemove and touchstart events.
	//It also preserves scroll position when switching.
	_handleScrollModes() {
		let waitForNativeAction = () => {
			let oneNative = () => {
				window.removeEventListener('mousemove', threeMousemove, false);
				window.removeEventListener('scroll', oneNative, false);

				//Move the scroll offset over from fake to native scrolling.
				const scrollPosition = this._scrollLogic.getOffset();

				//This compensates the amount scrolling that JUST happened.
				//Imagine using pageup/down keys, we would lose the first jump otherwise.
				const delta = this._getNativeScrollPosition() - this._lastNativeScrollPosition;

				window.scrollTo(0, scrollPosition + delta);

				this.scrollMode = 'native';

				waitForFakeAction();
			};

			let threeMousemove = () => {
				//Cheez. Some mobile browsers (*cough* Android *cough*) trigger mousemove before ANYTHING else.
				//Even before touchstart. But they will only trigger a single mousemove for any touch sequence.
				//To make sure we only get real mousemoves, we wait for three consecutive events.
				//We reset this counter every time we receive a touch event.
				//Note: it was 2 before, now 3. Because Android Firefox does weird things inside a textarea.
				this._mousemoveCounter++;

				if (this._mousemoveCounter !== 3) {
					return;
				}

				this._mousemoveCounter = 0;

				oneNative();
			};

			//A "mousemove" event is a strong indicator that we're on a desktop device.
			//"mousemove" makes sure that we switch to native scrolling even if we haven't scrolled yet.
			//In reality this means stuff like iframes are immediately accessible on desktop.
			window.addEventListener('mousemove', threeMousemove, false);

			//We should never get a scroll event on mobile because we prevent it.
			//So that's the strongest desktop indicator you can get.
			window.addEventListener('scroll', oneNative, false);
		};

		let waitForFakeAction = () => {
			let oneTouchStart = () => {
				document.removeEventListener('touchstart', oneTouchStart, false);

				//Move the scroll offset over from native to fake scrolling.
				const scrollPosition = Math.round(this._getNativeScrollPosition());
				this._scrollLogic.scrollTo(scrollPosition);

				this._mousemoveCounter = 0;

				this.scrollMode = 'touch';

				waitForNativeAction();
			};

			document.addEventListener('touchstart', oneTouchStart, false);
		};

		//By default we assume we're in fake scrolling mode.
		//This makes sure the user can scroll on iframes if this happens to be the first thing she touches.
		this._mousemoveCounter = 0;
		waitForNativeAction();
	}

	_getNativeScrollPosition() {
		if (!document.documentElement || !document.body) {
			throw new Error('There is no documentElement or body to get the scroll position from.');
		}

		return document.documentElement.scrollTop || document.body.scrollTop;
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
			if (this.scrollMode === 'native') {
				window.scrollTo(0, position);
			} else {
				this._scrollLogic.scrollTo(position);
			}
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
		let currentScrollPosition;

		if (this.scrollMode === 'touch') {
			currentScrollPosition = this._scrollLogic.getOffset();
		} else {
			currentScrollPosition = this._lastNativeScrollPosition = Math.round(this._getNativeScrollPosition());
		}

		return currentScrollPosition;
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

		//Firefox on Android will scroll natively to remove the addressbar.
		//This can not be prevented, even with preventDefault on the touch events.
		//Since moving the addressbar causes doLayout calls, it performs bad.
		//http://stackoverflow.com/questions/28129663/firefox-on-android-prevent-adressbar-from-disappearing
		//It's also causing trouble on Android stock browser with scrollMode detection.
		//We also recently added this for iOS because it was the only thing breaking iframe embeds.
		//On iOS the iframe will scale to the height of its content, but we query the window height.
		//So basically it was growing ENDLESSLY (100vh kept getting larger)!
		if (isAndroidFirefox || isBadAndroid || isAppleiOS) {
			if (!document.documentElement) {
				throw new Error('There is no documentElement to style.');
			}

			document.documentElement.style.overflow = 'visible';
			this.el.style.height = 0;
		} else {
			this.el.style.height = Math.round(requiredHeight) + 'px';
		}

		this._scrollLogic.setContainerLength(layoutEngine.viewport.height);
		this._scrollLogic.setContentLength(requiredHeight);

		this.scrollState.maxPosition = requiredHeight - layoutEngine.viewport.height;

		//Make sure we don't lose our relative scroll position.
		this.scrollTo(this.scrollState.maxPosition * this.scrollState.progress);
	}
}
