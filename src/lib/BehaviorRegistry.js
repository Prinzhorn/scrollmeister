const lowerCaseAndDashRegex = /^[a-z-]+$/;

export default class BehaviorRegistry {
	constructor() {
		this.behaviors = {};
	}

	add(classDefinition) {
		let name = classDefinition.behaviorName;

		if (this.behaviors.hasOwnProperty(name)) {
			throw new Error(`You are trying to redefine the "${name}" behavior.`);
		}

		if (!lowerCaseAndDashRegex.test(name)) {
			throw new Error(
				`The behavior "${name}" you are trying to define uses invalid characters. Behaviors can only use lower case characters and dashes.`
			);
		}

		this.behaviors[name] = classDefinition;
	}

	has(name) {
		return this.behaviors.hasOwnProperty(name);
	}

	get(name) {
		return this.behaviors[name];
	}

	getNames() {
		return Object.keys(this.behaviors);
	}
}
