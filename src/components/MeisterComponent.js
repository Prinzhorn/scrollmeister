// @flow

import raf from 'raf';

import Scrollmeister from 'scrollmeister.js';

export default class ScrollMeisterComponent extends HTMLElement {
	_scrollBehaviors: Array<{ scroll: Function }>;
	_scheduledBatchUpdate: boolean;
	_scheduledBehaviors: { attach: any, detach: any };
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
		//TODO: the layout behavior requires a single child node inside the custom element.
		//Check if it has a single child of type element.
		//If not then wrap all children in a div and append it https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment
	}

	disconnectedCallback() {
		raf.cancel(this._batchHandle);

		// $FlowFixMe: We expect this static property on the subclass. Nobody will ever create an instance of just MeisterComponent.
		let observedAttributes = this.constructor.observedAttributes;

		//Remove all attached behaviors so they can be garbage collected.
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
