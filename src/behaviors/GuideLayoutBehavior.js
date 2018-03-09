// @flow

import raf from 'raf';
import ScrollLogic from 'scroll-logic';

import ScrollState from 'lib/ScrollState.js';
import fakeClick from 'lib/fakeClick.js';
import isTextInput from 'lib/isTextInput.js';
import GuideLayoutEngine from 'lib/GuideLayoutEngine.js';

import Behavior from 'behaviors/Behavior.js';

const isAndroidFirefox = /Android; (?:Mobile|Tablet); .+ Firefox/i.test(navigator.userAgent);
const isBadAndroid = /Android /.test(navigator.userAgent) && !/Chrome\/\d/.test(navigator.userAgent);
const isAppleiOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

export default class GuideLayoutBehavior extends Behavior {
	_scrollLogic: ScrollLogic;
	_mousemoveCounter: number;

	static get schema(): any {
		return {
			guides: {
				type: [[{ name: 'string' }, { position: 'csslength' }, { width: 'csslength' }]],
				expand: function(rawProperties) {
					//The width is optional and defaults to 0.
					if (rawProperties.length === 2) {
						rawProperties.push('0');
						return true;
					}

					return false;
				},
				default: ''
				//TODO: can we default to an empty array here by using an empty string?
				//Answer: write a test. multiple. a whole suite.
			},
			width: {
				type: 'csslength',
				default: '1280px'
			},
			overscroll: {
				type: 'string',
				enum: ['yes', 'no'],
				default: 'yes'
			}
		};
	}

	static get dependencies(): Array<string> {
		return [];
	}

	static get behaviorName(): string {
		return 'guidelayout';
	}

	attach() {
		this.state = {
			scrollMode: 'touch'
		};

		this._layoutScheduled = false;
		this._lastRenderTime = -1;

		this._setupScrolling();
		this._initLayoutEngine();

		//It is important that the _scrollLoop is scheduled after initLayoutEngine (which schedules layout).
		//This guarantees that the very first `scroll` event will be emited AFTER the very first `layout` event.
		//TODO: write a test which checks the correct order of events (also viewport:enter etc.).
		raf(this._scrollLoop.bind(this));
	}

	detach() {
		this.scrollState.destroy();
	}

	update(prevProps) {
		if (prevProps.overscroll !== this.props.overscroll) {
			this._scrollLogic.options.bouncing = this.props.overscroll === 'yes';
		}

		this._updateScrollHeight();
	}

	_setupScrolling() {
		this.scrollState = new ScrollState(this.emit.bind(this, 'scroll', false), this.emit.bind(this, 'pause', false));

		this._setupMobileScrolling();
		this._handleScrollModes();
	}

	_setupMobileScrolling() {
		this._scrollLogic = new ScrollLogic({
			bouncing: this.props.overscroll === 'yes'
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
			let oneNative = e => {
				window.removeEventListener('mousemove', threeMousemove, false);
				window.removeEventListener('scroll', oneNative, false);

				//Move the scroll offset over from fake to native scrolling.
				const scrollPosition = this._scrollLogic.getOffset();

				//This compensates the amount scrolling that JUST happened.
				//Imagine using pageup/down keys, we would lose the first jump otherwise.
				const delta = this._getNativeScrollPosition() - this._lastNativeScrollPosition;

				window.scrollTo(0, scrollPosition + delta);

				this.setState({
					scrollMode: 'native'
				});

				waitForFakeAction();
			};

			let threeMousemove = e => {
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

				oneNative(e);
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

				this.setState({
					scrollMode: 'touch'
				});

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
		return document.documentElement.scrollTop || document.body.scrollTop;
	}

	scrollTo(position) {
		position = Math.round(position);

		if (this.state.scrollMode === 'native') {
			window.scrollTo(0, position);
		} else {
			this._scrollLogic.scrollTo(position);
		}
	}

	_initLayoutEngine() {
		this.engine = new GuideLayoutEngine();

		this.listenAndInvoke(window, 'resize', () => {
			let viewport = this._getViewport();
			this.engine.updateViewport(viewport);
			this._scheduleLayout();
		});

		//Whenever a new layout behavior is attached or changed, we need to do layout.
		this.listen(document, 'layout:attach layout:update', this._scheduleLayout.bind(this));
	}

	_scrollLoop(now) {
		//The very first frame doesn't have a previous one.
		if (this._lastRenderTime === -1) {
			this._lastRenderTime = now;
		}

		this._pollScrollPosition(now, this._lastRenderTime);

		this._lastRenderTime = now;
		raf(this._scrollLoop.bind(this));
	}

	_pollScrollPosition(now, lastRenderTime) {
		let currentScrollPosition;

		if (this.state.scrollMode === 'touch') {
			currentScrollPosition = this._scrollLogic.getOffset();
		} else {
			currentScrollPosition = this._lastNativeScrollPosition = Math.round(this._getNativeScrollPosition());
		}

		this.scrollState.tick(now, currentScrollPosition);
	}

	_getScrollbarWidth() {
		//Sue me.
		//Forcing the whole document to reflow three times (by forcing overflow scroll/hidden) is insanely costly.
		//It took about 2.5ms. Compared to the 0.7ms that doLayout takes in total, this was the bottleneck by far.
		//Note: I don't like the yellow stuff in my Performance tab.
		if (this._getScrollbarWidth.hasOwnProperty('_cache')) {
			return this._getScrollbarWidth._cache;
		}

		let documentElement = document.documentElement;

		if (!documentElement) {
			throw new Error('There is no documentElement to get the scrollbar width of.');
		}

		let originalOverflow = documentElement.style.overflowY;

		//Force a scrollbar to get the inner dimensions.
		documentElement.style.overflowY = 'scroll';

		let innerWidth = documentElement.clientWidth;

		//Force NO scrollbar to get the outer dimensions.
		documentElement.style.overflowY = 'hidden';

		let outerWidth = documentElement.clientWidth;

		//Restore overflow.
		documentElement.style.overflowY = originalOverflow;

		let scrollbarWidth = (this._getScrollbarWidth._cache = outerWidth - innerWidth);

		return scrollbarWidth;
	}

	_getViewport(): { width: number, height: number, outerWidth: number, outerHeight: number } {
		let documentElement = document.documentElement;

		if (!documentElement) {
			throw new Error('There is no documentElement to get the size of.');
		}

		let width = documentElement.clientWidth;
		let outerWidth = width + this._getScrollbarWidth();
		let height = documentElement.clientHeight;
		let outerHeight = height;

		return {
			width,
			height,
			outerWidth,
			outerHeight
		};
	}

	_scheduleLayout() {
		if (!this._layoutScheduled) {
			raf(this._doLayout.bind(this));
			this._layoutScheduled = true;
		}
	}

	_doLayout() {
		this._layoutScheduled = false;

		let nodes = Array.prototype.slice.call(this.el.querySelectorAll('[layout]')).map(el => el.layout);

		this.engine.doLayout(nodes, this.props.guides, this.props.width);

		this._updateScrollHeight();

		this.emit('layout', false);
	}

	_updateScrollHeight() {
		let requiredHeight = this.engine.requiredHeight;

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

		this._scrollLogic.setContainerLength(this.engine.viewport.height);
		this._scrollLogic.setContentLength(requiredHeight);

		this.scrollState.maxPosition = requiredHeight - this.engine.viewport.height;

		//Make sure we don't lose our relative scroll position.
		this.scrollTo(this.scrollState.maxPosition * this.scrollState.progress);
	}
}
