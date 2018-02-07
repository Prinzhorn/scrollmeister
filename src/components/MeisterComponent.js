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

		for (let attr of ScrollMeisterComponent.observedAttributes) {
			console.log('detach all the things');
			Scrollmeister.detachBehavior(this, attr);
		}
	}

	attributeChangedCallback(attr, oldValue, newValue) {
		console.log('attr', attr);
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
		for (let attr of ScrollMeisterComponent.observedAttributes) {
			if (this.hasOwnProperty(attr) && this[attr].scroll) {
				this._scrollBehaviors.push(this[attr]);
			}
		}
	}

	tick() {
		for (let behavior of this._scrollBehaviors) {
			behavior.scroll();
		}

		requestAnimationFrame(this.tick.bind(this));
	}
}
