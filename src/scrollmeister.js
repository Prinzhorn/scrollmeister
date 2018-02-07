const lowerCaseAndDashRegex = /^[a-z-]+$/;

const Scrollmeister = {
	behaviors: {},
	//TODO: get rid of this Map (no polyfill etc.)
	behaviorsWaitingForDependencies: new Map(),

	getDefinedBehaviorNames: function() {
		return Object.keys(this.behaviors);
	},

	defineBehavior: function(name, classDefinition) {
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

	attachBehavior: function(element, name, config) {
		if (!this.behaviors.hasOwnProperty(name)) {
			throw new Error(
				`Tried to attach an unknown behavior "${name}". This should never happen since we only track attributes which correspond to defined behaviors.`
			);
		}

		let Behavior = this.behaviors[name];

		//The behavior is already attached, update it.
		if (element.hasOwnProperty(name)) {
			element[name].doTheThing();
			element.behaviorsUpdated();
		} else {
			//Check if this behavior depends on one or more others which are not yet fulfilled.
			//TODO: The whole dependency resolving is based on my mantra of "first make it work, then make it great". It works.
			if (Behavior.dependencies.length > 0) {
				for (let dependency of Behavior.dependencies) {
					//If so remember it in the map and check later.
					if (!element.hasOwnProperty(dependency)) {
						if (!this.behaviorsWaitingForDependencies.has(element)) {
							this.behaviorsWaitingForDependencies.set(element, new Set());
						}

						let waitingBehaviors = this.behaviorsWaitingForDependencies.get(element);
						waitingBehaviors.add(name);
						return;
					}
				}
			}

			//Looks like all dependencies are resolved, remove it from the list if it's in.
			if (this.behaviorsWaitingForDependencies.has(element)) {
				this.behaviorsWaitingForDependencies.get(element).delete(name);
			}

			//Make the behavior available as a property on the DOM node.
			//TODO: What if people assign a plain config to the property?
			//Maybe this should not be allowed at all, but instead always use the attribute?
			//BUT: if we can make it work then it should work for UX reasons.
			element[name] = new Behavior(element, config);

			//We just attached a new behavior.
			//Let's see if this element has behaviors waiting for the one we just created.
			if (this.behaviorsWaitingForDependencies.has(element)) {
				let waitingBehaviors = this.behaviorsWaitingForDependencies.get(element);

				for (let behavior of waitingBehaviors) {
					this.attachBehavior(element, behavior, config);
				}
			}

			element.behaviorsUpdated();
		}
	},

	detachBehavior: function(element, name) {
		element[name].detach();
		delete element[name];
		element.behaviorsUpdated();
	}
};

export default Scrollmeister;
