import Scrollmeister from '../scrollmeister.js';

export default class ScrollMeisterComponent extends HTMLElement {
	static get observedAttributes() {
		return Scrollmeister.getDefinedBehaviorNames();
	}

	constructor() {
		super();
	}

	//Similar to componentDidMount
	connectedCallback() {}

	//Similar to componentWillUnmount
	disconnectedCallback() {}

	attributeChangedCallback(attr, oldValue, newValue) {
		if (newValue === null) {
			Scrollmeister.detachBehavior(this, attr);
		} else {
			Scrollmeister.attachBehavior(this, attr, newValue);
		}
	}
}
