import 'document-register-element';

import Scrollmeister from 'scrollmeister.js';

import ScrollMeisterComponent from 'components/ScrollMeisterComponent.js';
import ElementMeisterComponent from 'components/ElementMeisterComponent.js';

//https://twitter.com/WebReflection/status/973932114621161473
//https://github.com/WebReflection/ready
//We need to defer the define() calls, because the static observedAttributes getter is evaluated immediately.
//However, we need to know about all defined behaviors to observe the correct attributes.
//If we would define() synchronously, then behavior authors would need to define their behavior _before_ that.
document.addEventListener(
	'DOMContentLoaded',
	() => {
		Scrollmeister.behaviorsRegistry.close();
		customElements.define('scroll-meister', ScrollMeisterComponent);
		customElements.define('element-meister', ElementMeisterComponent);
		//customElements.define('shadow-meister', class extends HTMLElement {});
	},
	{ once: true }
);
