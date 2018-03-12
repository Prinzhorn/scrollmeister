const lowerCaseAndDashRegex = /^[a-z-]+$/;

export default class BehaviorsRegistry {
	constructor() {
		this._behaviors = {};
		this._order = [];
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

		let dependencies = classDefinition.dependencies;

		for (let i = 0; i < dependencies.length; i++) {
			let dependency = dependencies[i];

			if (dependency.charAt(0) === '^') {
				dependency = dependency.slice(1);
			}

			if (!this._behaviors.hasOwnProperty(dependency)) {
				throw new Error(
					`You are trying to define a "${name}" behavior that depends on "${dependency}", which is not defined. Make sure to define behaviors in the correct order.`
				);
			}
		}

		this._behaviors[name] = classDefinition;

		//This is an insanely clever "hack".
		//Every behavior can have dependencies, so behaviors are like a graph.
		//We could sort/linearize this graph to initialize behaviors in the correct order.
		//However, we simply assume they are _defined_ in the correct order and track this here.
		//This totally makes sense and we even throw when defining a behavior that declares
		//a dependency that does not exist (yet). So the order is guaranteed to be correct.
		this._order.push(name);
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

	getOrder() {
		return this._order.slice();
	}
}
