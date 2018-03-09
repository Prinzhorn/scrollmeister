const lowerCaseAndDashRegex = /^[a-z-]+$/;

export default class BehaviorsRegistry {
	constructor() {
		this._behaviors = {};
	}

	add(classDefinition) {
		let name = classDefinition.behaviorName;

		if (this._behaviors.hasOwnProperty(name)) {
			throw new Error(`You are trying to redefine the "${name}" behavior.`);
		}

		if (!lowerCaseAndDashRegex.test(name)) {
			throw new Error(
				`The behavior "${name}" you are trying to define uses invalid characters. Behaviors can only use lower case characters and dashes.`
			);
		}

		this._behaviors[name] = classDefinition;
	}

	has(name) {
		return this._behaviors.hasOwnProperty(name);
	}

	get(name) {
		return this._behaviors[name];
	}

	getNames() {
		return Object.keys(this._behaviors);
	}
}
