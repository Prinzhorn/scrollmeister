import CustomEvent from 'ponies/CustomEvent.js';

import camcelCase from 'lib/camelCase.js';
import BehaviorsRegistry from 'lib/BehaviorsRegistry.js';
import ConditionsRegistry from 'lib/ConditionsRegistry.js';

import Behavior from 'behaviors/Behavior.js';

const Scrollmeister = {
	Behavior,

	behaviorsRegistry: new BehaviorsRegistry(),
	conditionsRegistry: new ConditionsRegistry(),

	version: process.env.npm_package_version,

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
		let behaviorOrder = this.getBehaviorOrder();

		for (let i = 0; i < behaviorOrder.length; i++) {
			let behaviorName = behaviorOrder[i];

			if (!behaviorPropertiesMap.hasOwnProperty(behaviorName)) {
				continue;
			}

			let missingDependencies = this._checkBehaviorDependencies(element, behaviorName);

			if (missingDependencies.length > 0) {
				throw new Error(
					//TODO: render this error inline as well (behaviors have this.error, maybe MeisterComponent.error() method?)
					`The "${behaviorName}" behavior requires the "${missingDependencies.join(
						'", "'
					)}" behavior(s) for. Make sure you add the attribute to the element.`
				);
			}

			this.attachBehavior(element, behaviorName, behaviorPropertiesMap[behaviorName]);
		}
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

	detachBehaviors: function(element, behaviorPropertiesMap, skipDependencies = false) {
		//Remove the behaviors in reverse order to make sure their dependencies still exist for cleanup.
		let reverseBehaviorOrder = this.getBehaviorOrder()
			.slice()
			.reverse();

		for (let i = 0; i < reverseBehaviorOrder.length; i++) {
			let behaviorName = reverseBehaviorOrder[i];

			if (behaviorPropertiesMap.hasOwnProperty(behaviorName)) {
				this.detachBehavior(element, behaviorName, skipDependencies);
			}
		}
	},

	detachBehavior: function(element, name, skipDependencies = false) {
		if (element.hasOwnProperty(name)) {
			element[name].destructor();
			delete element[name];
			delete element[camcelCase(name)];
			delete element.behaviors[name];
		}

		if (skipDependencies) {
			return;
		}

		//Check if all dependencies are still resolved.
		//TODO: this check missed dependencies of children.
		//E.g. removing "guides-layout" when there are children with "layout".
		for (let otherName in element.behaviors) {
			if (!element.behaviors.hasOwnProperty(otherName)) {
				continue;
			}

			if (this._checkBehaviorDependencies(element, otherName).length > 0) {
				throw new Error(`You just removed the "${name}" behavior, which "${otherName}" requires.`);
			}
		}
	},

	_checkBehaviorDependencies: function(element, name) {
		const Behavior = this.behaviorsRegistry.get(name);
		let missingDependencies = [];

		for (let dependencyIndex = 0; dependencyIndex < Behavior.dependencies.length; dependencyIndex++) {
			let dependency = Behavior.dependencies[dependencyIndex];

			if (dependency.charAt(0) === '^') {
				let parentDependency = dependency.slice(1);

				if (!element.parentElement.hasOwnProperty(parentDependency)) {
					missingDependencies.push(dependency);
				}
			} else {
				if (!element.hasOwnProperty(dependency)) {
					missingDependencies.push(dependency);
				}
			}
		}

		return missingDependencies;
	},

	defineCondition: function(name, valueFn) {
		this.conditionsRegistry.add(name, valueFn);
	},

	getDefinedConditionNames: function() {
		return this.conditionsRegistry.getNames();
	},

	componentConnected: function(element) {
		let event = new CustomEvent('scrollmeister:connected', {
			bubbles: false,
			cancelable: false,
			detail: element
		});

		document.dispatchEvent(event);
	},

	componentDisconnected: function(element) {
		let event = new CustomEvent('scrollmeister:disconnected', {
			bubbles: false,
			cancelable: false,
			detail: element
		});

		document.dispatchEvent(event);
	}
};

export default Scrollmeister;
