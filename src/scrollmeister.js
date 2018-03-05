const lowerCaseAndDashRegex = /^[a-z-]+$/;

const Scrollmeister = {
	behaviors: {},
	behaviorsWaitingForDependencies: [],

	getDefinedBehaviorNames: function() {
		return Object.keys(this.behaviors);
	},

	defineBehavior: function(classDefinition) {
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
		if (!this.behaviors.hasOwnProperty(name)) {
			throw new Error(
				`Tried to attach an unknown behavior "${name}". This should never happen since we only track attributes that correspond to defined behaviors.`
			);
		}

		//The behavior is already attached, update it.
		if (element.hasOwnProperty(name)) {
			element[name].updateProperties(rawProperties);
		} else {
			//Make the behavior available as a property on the DOM node.
			//TODO: What if people assign a plain rawProperties to the property?
			//Maybe this should not be allowed at all, but instead always use the attribute?
			//BUT: if we can make it work then it should work for UX reasons.
			//See also comments in _renderGuides of DebugGuidesBehavior. Läuft.
			const Behavior = this.behaviors[name];
			element[name] = new Behavior(element, rawProperties);
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
			delete element.behaviors[name];
		}

		//Check if all dependencies are still resolved.
		//TODO: this check missed dependencies of children.
		//E.g. removing "guidelayout" when there are children with "layout".
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
		const Behavior = this.behaviors[name];

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
	}
};

export default Scrollmeister;
