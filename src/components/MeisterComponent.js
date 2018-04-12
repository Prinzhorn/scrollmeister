// @flow

import raf from 'raf';

import BehaviorsStyleMerger from 'lib/BehaviorsStyleMerger.js';

import Scrollmeister from 'scrollmeister.js';

const invalidMarkupSelectors = [
	':not(scroll-meister) > element-meister',
	'scroll-meister * element-meister',
	'scroll-meister scroll-meister',
	'element-meister element-meister',
	'element-meister scroll-meister'
];

export default class ScrollMeisterComponent extends HTMLElement {
	behaviors: any;
	_behaviorsStyleMerger: BehaviorsStyleMerger;
	_scheduledBatchUpdate: boolean;
	_scheduledBehaviors: { attach: any, detach: any };
	_batchHandle: number;

	//Polyfill (modern browsers have this).
	get isConnected(): boolean {
		if (!document.body) {
			return false;
		}

		return document.body.contains(this);
	}

	// Note: if you feel clever and think you can just define
	// the static `observedAttributes` getter on the super class: IE 9/10.

	// https://github.com/WebReflection/document-register-element/tree/7e2743d38f0bf01806cb9b76ba254f62f8cb24b2#v1-caveat
	// $FlowFixMe: Won't be fixed ;)
	constructor(_) {
		// $FlowFixMe: Won't be fixed ;)
		return (_ = super(_)).init(), _; // eslint-disable-line
	}

	init() {
		this.behaviors = {};

		this._behaviorsStyleMerger = new BehaviorsStyleMerger(this, Scrollmeister.getBehaviorOrder());

		this._scheduledBatchUpdate = false;
		this._scheduledBehaviors = {
			attach: {},
			detach: {}
		};
	}

	connectedCallback() {
		//This happens when a disconnected element (e.g. document.createElement) gets attributes before being inserted.
		//We will then update the behaviors as soon as it is connected.
		if (this._scheduledBatchUpdate) {
			this._batchUpdateBehaviors();
		}

		Scrollmeister.componentConnected(this);

		//Make some sanity checks on the markup for UX.
		raf(() => {
			if (document.querySelector(invalidMarkupSelectors.join(','))) {
				throw new Error(
					'You have nested <scroll-meister> and <element-meister> elements in an unsupported way. <element-meister> elements need to always be direct children of <scroll-meister>.'
				);
			}
		});
	}

	disconnectedCallback() {
		//This happens when the element is moved inside the DOM using sth. like insertBefore.
		//In this case we will just ignore the disconnectedCallback, because the Node is not actually disconnected.
		//It is safe to leave the behaviors attached, because stuff like nextSibling and parentElement are defined.
		//A connectedCallback will follow right away.
		//https://twitter.com/WebReflection/status/984400317801476097
		if (this.isConnected) {
			return;
		}

		raf.cancel(this._batchHandle);

		//Remove all attached behaviors so they can be garbage collected.
		Scrollmeister.detachBehaviors(this, this.behaviors, true);

		Scrollmeister.componentDisconnected(this);
	}

	attributeChangedCallback(attr: string, oldValue: string | null, newValue: string | null) {
		if (newValue === null) {
			this._scheduledBehaviors.detach[attr] = true;
			delete this._scheduledBehaviors.attach[attr];
		} else {
			this._scheduledBehaviors.attach[attr] = newValue;
			delete this._scheduledBehaviors.detach[attr];
		}

		if (!this._scheduledBatchUpdate) {
			this._scheduledBatchUpdate = true;

			//Only update the behaviors if the element is actually connected.
			//Otherwise we'll do it in connectedCallback.
			if (this.isConnected) {
				this._batchHandle = raf(this._batchUpdateBehaviors.bind(this));
			}
		}
	}

	setBehaviorStyle(behaviorName: string, property: string, value: string | number) {
		this._behaviorsStyleMerger.setBehaviorStyle(behaviorName, property, value);
	}

	resetBehaviorStyle(behaviorName: string, property: string) {
		this._behaviorsStyleMerger.resetBehaviorStyle(behaviorName, property);
	}

	resetBehaviorStyles(behaviorName: string) {
		this._behaviorsStyleMerger.resetBehaviorStyles(behaviorName);
	}

	_batchUpdateBehaviors() {
		this._scheduledBatchUpdate = false;

		Scrollmeister.attachBehaviors(this, this._scheduledBehaviors.attach);
		this._scheduledBehaviors.attach = {};

		Scrollmeister.detachBehaviors(this, this._scheduledBehaviors.detach);
		this._scheduledBehaviors.detach = {};
	}
}
