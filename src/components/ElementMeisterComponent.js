import Scrollmeister from 'scrollmeister.js';
import MeisterComponent from './MeisterComponent.js';

export default class ElementMeisterComponent extends MeisterComponent {
	static get observedAttributes() {
		return Scrollmeister.getDefinedBehaviorNames();
	}
}
