const lowerCaseAndDashRegex = /^[a-z-]+$/;

export default class ConditionsRegistry {
	constructor(changeCallback) {
		this._conditions = {};
		this._values = {};
		this._order = [];
		this._changeCallback = changeCallback;
	}

	add(name, valueFn, updaterFn) {
		if (this._conditions.hasOwnProperty(name)) {
			throw new Error(`You are trying to redefine the "${name}" condition.`);
		}

		if (!lowerCaseAndDashRegex.test(name)) {
			throw new Error(
				`The condition "${name}" you are trying to define uses invalid characters. Conditions can only use lower case characters and dashes.`
			);
		}

		updaterFn((...args) => {
			let newValue = valueFn(...args);

			if (newValue !== this._values[name]) {
				this._values[name] = newValue;
				this._changeCallback(name, newValue);
			}
		});

		this._conditions[name] = valueFn;

		this._order.push(name);
	}

	is(name) {
		return this._values[name];
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

	getOrder() {
		return this._order.slice();
	}
}
