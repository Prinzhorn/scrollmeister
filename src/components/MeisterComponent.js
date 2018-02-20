// @flow

import raf from 'raf';

import Scrollmeister from 'scrollmeister.js';

export default class ScrollMeisterComponent extends HTMLElement {
	_scrollBehaviors: Array<{ scroll: Function }>;
	_scheduledBatchUpdate: boolean;
	_scheduledBehaviors: { attach: any, detach: any };
	_tickHandle: number;
	_batchHandle: number;

	// Note: if you feel clever and think you can just define
	// the static `observedAttributes` getter on the super class: IE 9/10.

	// https://github.com/WebReflection/document-register-element/tree/7e2743d38f0bf01806cb9b76ba254f62f8cb24b2#v1-caveat
	// $FlowFixMe: Won't be fixed ;)
	constructor(_) {
		// $FlowFixMe: Won't be fixed ;)
		return (_ = super(_)).init(), _;
	}

	init() {
		this._scrollBehaviors = [];
		this._scheduledBatchUpdate = false;
		this._scheduledBehaviors = {
			attach: {},
			detach: {}
		};
	}

	connectedCallback() {
		this._tickHandle = raf(this.tick.bind(this));
	}

	disconnectedCallback() {
		raf.cancel(this._tickHandle);
		raf.cancel(this._batchHandle);

		// $FlowFixMe: We expect this static property on the subclass. Nobody will ever create an instance of just MeisterComponent.
		let observedAttributes = this.constructor.observedAttributes;

		for (let i = 0; i < observedAttributes.length; i++) {
			let attr = observedAttributes[i];

			Scrollmeister.detachBehavior(this, attr);
		}
	}

	attributeChangedCallback(attr: string, oldValue: string | null, newValue: string | null) {
		if (!this._scheduledBatchUpdate) {
			this._scheduledBatchUpdate = true;
			this._batchHandle = raf(this._batchUpdateBehaviors.bind(this));
		}

		if (newValue === null) {
			this._scheduledBehaviors.detach[attr] = true;
			delete this._scheduledBehaviors.attach[attr];
		} else {
			this._scheduledBehaviors.attach[attr] = newValue;
			delete this._scheduledBehaviors.detach[attr];
		}
	}

	behaviorsUpdated() {
		//Clear the array.
		this._scrollBehaviors.length = 0;

		// $FlowFixMe: We expect this static property on the subclass. Nobody will ever create an instance of just MeisterComponent.
		let observedAttributes = this.constructor.observedAttributes;

		//We keep a list of behaviors that implement the scroll interface so we can loop over it faster.
		for (let i = 0; i < observedAttributes.length; i++) {
			let attr = observedAttributes[i];

			// $FlowFixMe: Flow doesn't know about the this[attr] access.
			if (this.hasOwnProperty(attr) && this[attr].scroll) {
				this._scrollBehaviors.push(this[attr]);
			}
		}
	}

	//TODO: do we really need a raf loop for EVERY SINGLE custom element?
	//There should be a single loop, e.g. inside the LayoutBehavior at the root.
	tick() {
		for (let i = 0; i < this._scrollBehaviors.length; i++) {
			let behavior = this._scrollBehaviors[i];
			behavior.scroll();
		}

		raf(this.tick.bind(this));
	}

	_batchUpdateBehaviors() {
		this._scheduledBatchUpdate = false;

		for (let key in this._scheduledBehaviors.detach) {
			if (this._scheduledBehaviors.detach.hasOwnProperty(key)) {
				Scrollmeister.detachBehavior(this, key);
				delete this._scheduledBehaviors.detach[key];
			}
		}

		for (let key in this._scheduledBehaviors.attach) {
			if (this._scheduledBehaviors.attach.hasOwnProperty(key)) {
				Scrollmeister.attachBehavior(this, key, this._scheduledBehaviors.attach[key]);
				delete this._scheduledBehaviors.attach[key];
			}
		}
	}
}
