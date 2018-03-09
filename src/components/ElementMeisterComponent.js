import Scrollmeister from 'scrollmeister.js';
import MeisterComponent from './MeisterComponent.js';

export default class ElementMeisterComponent extends MeisterComponent {
	static get observedAttributes() {
		let behaviorNames = Scrollmeister.getDefinedBehaviorNames();
		let conditionNames = Scrollmeister.getDefinedConditionNames();

		//First of all we observe all attributes that correspond to a behavior.
		let observedAttributes = behaviorNames.slice();

		//Additionally we need to observe each behavior for each condition as well.
		//They're separated by an underscore.
		for (let i = 0; i < behaviorNames.length; i++) {
			let behavior = behaviorNames[i];

			for (let j = 0; j < conditionNames.length; j++) {
				let condition = conditionNames[j];

				observedAttributes.push(`${behavior}_${condition}`);
			}
		}

		return observedAttributes;
	}
}
