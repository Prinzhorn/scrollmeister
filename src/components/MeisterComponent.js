import raf from 'raf';

import Scrollmeister from 'scrollmeister.js';

export default class ScrollMeisterComponent extends HTMLElement {
	// Note: if you feel clever and think you can just define
	// the static `observedAttributes` getter on the super class: IE 9/10.

	// https://github.com/WebReflection/document-register-element/tree/7e2743d38f0bf01806cb9b76ba254f62f8cb24b2#v1-caveat
	constructor(_) {
		return (_ = super(_)).init(), _;
	}

	init() {
		this._scrollBehaviors = [];
	}

	connectedCallback() {
		this._rafHandle = raf(this.tick.bind(this));
	}

	disconnectedCallback() {
		cancelAnimationFrame(this._rafHandle);

		let observedAttributes = this.constructor.observedAttributes;

		for (let i = 0; i < observedAttributes.length; i++) {
			let attr = observedAttributes[i];

			Scrollmeister.detachBehavior(this, attr);
		}
	}

	attributeChangedCallback(attr, oldValue, newValue) {
		if (newValue === null) {
			Scrollmeister.detachBehavior(this, attr);
		} else {
			Scrollmeister.attachBehavior(this, attr, newValue);
		}
	}

	behaviorsUpdated() {
		//Clear the array.
		this._scrollBehaviors.length = 0;

		let observedAttributes = this.constructor.observedAttributes;

		//We keep a list of behaviors that implement the scroll interface so we can loop over it faster.
		for (let i = 0; i < observedAttributes.length; i++) {
			let attr = observedAttributes[i];

			if (this.hasOwnProperty(attr) && this[attr].scroll) {
				this._scrollBehaviors.push(this[attr]);
			}
		}
	}

	tick() {
		for (let i = 0; i < this._scrollBehaviors.length; i++) {
			let behavior = this._scrollBehaviors[i];
			behavior.scroll();
		}

		raf(this.tick.bind(this));
	}
}
