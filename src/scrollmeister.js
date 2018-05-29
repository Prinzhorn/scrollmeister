import raf from 'raf';

import CustomEvent from 'ponies/CustomEvent.js';

import BehaviorsRegistry from 'lib/BehaviorsRegistry.js';
import ConditionsRegistry from 'lib/ConditionsRegistry.js';

import Behavior from 'behaviors/Behavior.js';

class Scrollmeister {
	constructor() {
		this.version = process.env.npm_package_version;
		//This is exposed for user-land custom behaviors to extend Scrollmeister.Behavior
		this.Behavior = Behavior;
		this.behaviorsRegistry = new BehaviorsRegistry();

		this._elements = [];

		this._scheduledConditionUpdate = false;

		this.batchUpdateConditions = this.batchUpdateConditions.bind(this);

		this.conditionsRegistry = new ConditionsRegistry(() => {
			if (!this._scheduledConditionUpdate) {
				this._scheduledConditionUpdate = true;
				raf(this.batchUpdateConditions);
			}
		});
	}

	getDefinedBehaviorNames() {
		return this.behaviorsRegistry.getNames();
	}

	getBehaviorOrder() {
		return this.behaviorsRegistry.getOrder();
	}

	getConditionsOrder() {
		return this.conditionsRegistry.getOrder();
	}

	registerBehavior(classDefinition) {
		this.behaviorsRegistry.add(classDefinition);
	}

	updateBehaviors(element, behaviorMap) {
		let behaviorOrder = this.getBehaviorOrder();
		let conditionsOrder = this.getConditionsOrder();
		let behaviorsToDetach = [];

		for (let i = 0; i < behaviorOrder.length; i++) {
			let behaviorName = behaviorOrder[i];

			//We iterate over all registered behaviors, but we only need to update those in the map.
			if (!behaviorMap.hasOwnProperty(behaviorName)) {
				continue;
			}

			let rawPropertiesList = [];
			let attr = behaviorName;

			if (element.hasAttribute(attr)) {
				rawPropertiesList.push(element.getAttribute(attr));
			}

			for (let j = 0; j < conditionsOrder.length; j++) {
				let conditionName = conditionsOrder[j];

				attr = `${behaviorName}_${conditionName}`;

				if (element.hasAttribute(attr)) {
					if (this.conditionsRegistry.is(conditionName)) {
						rawPropertiesList.push(element.getAttribute(attr));
					}
				}
			}

			if (rawPropertiesList.length > 0) {
				let missingDependencies = this._checkBehaviorDependencies(element, behaviorName);

				if (missingDependencies.length > 0) {
					let error = new Error(
						`The "${behaviorName}" behavior requires the "${missingDependencies.join(
							'", "'
						)}" behavior(s). Make sure you add the attribute to the element.`
					);

					element.renderError(error);

					throw error;
				}

				this.attachOrUpdateBehavior(element, behaviorName, rawPropertiesList);
			} else {
				//We need to detach them in reverse order, that's why we need to collect them first.
				//Because we're iterating in regular order for attaching.
				behaviorsToDetach.unshift(behaviorName);
			}
		}

		for (let i = 0; i < behaviorsToDetach.length; i++) {
			let name = behaviorsToDetach[i];
			this.detachBehavior(element, name);
		}
	}

	attachOrUpdateBehavior(element, name, rawPropertiesList) {
		if (!this.behaviorsRegistry.has(name)) {
			throw new Error(
				`Tried to attach an unknown behavior "${name}". This should never happen since we only track attributes that correspond to defined behaviors.`
			);
		}

		//The behavior is already attached, update it.
		if (element.hasOwnProperty(name)) {
			element[name].updateProperties(rawPropertiesList);
		} else {
			//Make the behavior available as a property on the DOM node.
			const Behavior = this.behaviorsRegistry.get(name);
			let contentElement = this.wrapContents(element);

			new Behavior(element, contentElement, rawPropertiesList);
		}
	}

	detachBehavior(element, name) {
		if (element.hasOwnProperty(name)) {
			element[name].destructor();
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
	}

	detachAllBehaviors(element) {
		//Detach in reverse order to not crash because of dependencies.
		let reverseBehaviorOrder = this.getBehaviorOrder()
			.slice()
			.reverse();

		for (let i = 0; i < reverseBehaviorOrder.length; i++) {
			let behaviorName = reverseBehaviorOrder[i];

			if (element.hasOwnProperty(behaviorName)) {
				element[behaviorName].destructor();
			}
		}
	}

	batchUpdateConditions() {
		//TODO: this might have a race condition with updateBehaviors
		//If a condition changes in the same frame that an attribute is added/removed/updated
		//we're doing unnecessary work and additionally if this loop right here runs before updateBehaviors
		//then the behavior might not exist yet.

		let behaviorOrder = this.getBehaviorOrder();
		let conditionsOrder = this.getConditionsOrder();

		for (let i = 0; i < this._elements.length; i++) {
			let element = this._elements[i];

			for (let j = 0; j < behaviorOrder.length; j++) {
				let behaviorName = behaviorOrder[j];
				let attr = behaviorName;
				let rawPropertiesList = [];

				if (element.hasAttribute(attr)) {
					rawPropertiesList.push(element.getAttribute(attr));
				}

				for (let k = 0; k < conditionsOrder.length; k++) {
					let conditionName = conditionsOrder[k];

					attr = `${behaviorName}_${conditionName}`;

					if (element.hasAttribute(attr)) {
						if (this.conditionsRegistry.is(conditionName)) {
							rawPropertiesList.push(element.getAttribute(attr));
						}
					}
				}

				if (rawPropertiesList.length > 0) {
					this.attachOrUpdateBehavior(element, behaviorName, rawPropertiesList);
				}
			}
		}

		this._scheduledConditionUpdate = false;
	}

	_checkBehaviorDependencies(element, name) {
		const Behavior = this.behaviorsRegistry.get(name);
		let missingDependencies = [];

		for (let dependencyIndex = 0; dependencyIndex < Behavior.behaviorDependencies.length; dependencyIndex++) {
			let dependency = Behavior.behaviorDependencies[dependencyIndex];

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
	}

	defineCondition(name, valueFn, updaterFn) {
		this.conditionsRegistry.add(name, valueFn, updaterFn);
	}

	getDefinedConditionNames() {
		return this.conditionsRegistry.getNames();
	}

	componentConnected(element) {
		this._elements.push(element);

		let event = new CustomEvent('scrollmeister:connected', {
			bubbles: false,
			cancelable: false,
			detail: element
		});

		document.dispatchEvent(event);
	}

	componentDisconnected(element) {
		let index = this._elements.indexOf(element);
		this._elements.splice(index, 1);

		let event = new CustomEvent('scrollmeister:disconnected', {
			bubbles: false,
			cancelable: false,
			detail: element
		});

		document.dispatchEvent(event);
	}

	wrapContents(element) {
		if (element.tagName.toLowerCase() !== 'element-meister') {
			return null;
		}

		let contentEl = element.querySelector('content-meister');

		if (contentEl) {
			return contentEl;
		}

		contentEl = document.createElement('content-meister');

		let childNodes = element.childNodes;
		let fragment = document.createDocumentFragment();

		//childNodes is a live list, so length gets smaller.
		while (childNodes.length > 0) {
			fragment.appendChild(childNodes[0]);
		}

		contentEl.appendChild(fragment);
		element.appendChild(contentEl);

		return contentEl;
	}
}

export default new Scrollmeister();
