import Scrollmeister from 'scrollmeister.js';
import MeisterComponent from './MeisterComponent.js';

export default class ScrollMeisterComponent extends MeisterComponent {
	static get observedAttributes() {
		return Scrollmeister.getDefinedBehaviorNames();
	}
}
