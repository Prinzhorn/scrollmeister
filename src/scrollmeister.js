import camcelCase from 'lib/camelCase.js';
import BehaviorsRegistry from 'lib/BehaviorsRegistry.js';
import ConditionsRegistry from 'lib/ConditionsRegistry.js';
import Behavior from 'behaviors/Behavior.js';

const Scrollmeister = {
	Behavior,

	behaviorsRegistry: new BehaviorsRegistry(),
	conditionsRegistry: new ConditionsRegistry(),

	getDefinedBehaviorNames: function() {
		return this.behaviorsRegistry.getNames();
	},

	getBehaviorOrder: function() {
		return this.behaviorsRegistry.getOrder();
	},

	defineBehavior: function(classDefinition) {
		this.behaviorsRegistry.add(classDefinition);
	},

	attachBehaviors: function(element, behaviorPropertiesMap) {
		let attachedABehavior;
		let hasKeys;

		//We loop over all behaviors in unspecified order until we eventually resolve all dependencies (or not).
		do {
			hasKeys = false;
			attachedABehavior = false;

			for (let name in behaviorPropertiesMap) {
				if (!behaviorPropertiesMap.hasOwnProperty(name)) {
					continue;
				}

				hasKeys = true;

				if (this._checkBehaviorDependencies(element, name)) {
					this.attachBehavior(element, name, behaviorPropertiesMap[name]);
					attachedABehavior = true;

					delete behaviorPropertiesMap[name];
				}
			}

			if (hasKeys && !attachedABehavior) {
				throw new Error(
					//TODO: better error message with the exact thing that is missing.
					`Could not resolve dependencies for behaviors "${Object.keys(behaviorPropertiesMap).join('", "')}".`
				);
			}
		} while (hasKeys);
	},

	attachBehavior: function(element, name, rawProperties) {
		if (!this.behaviorsRegistry.has(name)) {
			throw new Error(
				`Tried to attach an unknown behavior "${name}". This should never happen since we only track attributes that correspond to defined behaviors.`
			);
		}

		//The behavior is already attached, update it.
		if (element.hasOwnProperty(name)) {
			element[name].updateProperties(rawProperties);
		} else {
			//Make the behavior available as a property on the DOM node.
			const Behavior = this.behaviorsRegistry.get(name);
			element[name] = new Behavior(element, rawProperties);
			element[camcelCase(name)] = element[name];
			element.behaviors[name] = element[name];
		}
	},

	detachBehaviors: function(element, behaviorPropertiesMap) {
		for (let name in behaviorPropertiesMap) {
			if (!behaviorPropertiesMap.hasOwnProperty(name)) {
				continue;
			}

			this.detachBehavior(element, name);
		}
	},

	detachBehavior: function(element, name) {
		if (element.hasOwnProperty(name)) {
			element[name].destructor();
			delete element[name];
			delete element[camcelCase(name)];
			delete element.behaviors[name];
		}

		//Check if all dependencies are still resolved.
		//TODO: this check missed dependencies of children.
		//E.g. removing "guide-layout" when there are children with "layout".
		for (let otherName in element.behaviors) {
			if (!element.behaviors.hasOwnProperty(otherName)) {
				continue;
			}

			if (!this._checkBehaviorDependencies(element, otherName)) {
				throw new Error(`You just removed the "${name}" behavior, which "${otherName}" requires.`);
			}
		}
	},

	_checkBehaviorDependencies: function(element, name) {
		const Behavior = this.behaviorsRegistry.get(name);

		for (let dependencyIndex = 0; dependencyIndex < Behavior.dependencies.length; dependencyIndex++) {
			let dependency = Behavior.dependencies[dependencyIndex];

			if (dependency.charAt(0) === '^') {
				dependency = dependency.slice(1);

				if (!element.parentNode.hasOwnProperty(dependency)) {
					return false;
				}
			} else {
				if (!element.hasOwnProperty(dependency)) {
					return false;
				}
			}
		}

		return true;
	},

	defineCondition: function(name, valueFn) {
		this.conditionsRegistry.add(name, valueFn);
	},

	getDefinedConditionNames: function() {
		return this.conditionsRegistry.getNames();
	}
};

export default Scrollmeister;
