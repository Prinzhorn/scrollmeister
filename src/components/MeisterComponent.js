import Scrollmeister from 'scrollmeister.js';

export default class ScrollMeisterComponent extends HTMLElement {
	static get observedAttributes() {
		return Scrollmeister.getDefinedBehaviorNames();
	}

	//https://github.com/WebReflection/document-register-element#v1-caveat
	constructor(_) {
		return (_ = super(_)).init(), _;
	}

	init() {
		this._scrollBehaviors = [];
	}

	connectedCallback() {
		this.raf = requestAnimationFrame(this.tick.bind(this));
	}

	disconnectedCallback() {
		cancelAnimationFrame(this.raf);

		for (let i = 0; i < ScrollMeisterComponent.observedAttributes.length; i++) {
			let attr = ScrollMeisterComponent.observedAttributes[i];

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

		//We keep a list of behaviors that implement the scroll interface so we can loop over it faster.
		for (let i = 0; i < ScrollMeisterComponent.observedAttributes.length; i++) {
			let attr = ScrollMeisterComponent.observedAttributes[i];

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

		requestAnimationFrame(this.tick.bind(this));
	}
}
