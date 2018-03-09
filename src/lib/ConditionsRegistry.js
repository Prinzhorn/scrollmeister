const lowerCaseAndDashRegex = /^[a-z-]+$/;

export default class ConditionsRegistry {
	constructor() {
		this._conditions = {};
	}

	add(name, valueFn) {
		if (this._conditions.hasOwnProperty(name)) {
			throw new Error(`You are trying to redefine the "${name}" condition.`);
		}

		if (!lowerCaseAndDashRegex.test(name)) {
			throw new Error(
				`The condition "${name}" you are trying to define uses invalid characters. Conditions can only use lower case characters and dashes.`
			);
		}

		this._conditions[name] = valueFn;
	}

	has(name) {
		return this._conditions.hasOwnProperty(name);
	}

	get(name) {
		return this._conditions[name];
	}

	getNames() {
		return Object.keys(this._conditions);
	}
}
