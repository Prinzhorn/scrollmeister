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

	attachBehavior: function(element, name, config) {
		if (!this.behaviors.hasOwnProperty(name)) {
			throw new Error(
				`Tried to attach an unknown behavior "${name}". This should never happen since we only track attributes which correspond to defined behaviors.`
			);
		}

		let Behavior = this.behaviors[name];

		console.log(name);

		//The behavior is already attached, update it.
		if (element.hasOwnProperty(name)) {
			element[name].doTheThing();
			element.behaviorsUpdated();
		} else {
			if (this._checkBehaviorDependencies(element, name)) {
				//Make the behavior available as a property on the DOM node.
				//TODO: What if people assign a plain config to the property?
				//Maybe this should not be allowed at all, but instead always use the attribute?
				//BUT: if we can make it work then it should work for UX reasons.
				//See also comments in _renderGuides of DebugGuidesBehavior. Läuft.
				element[name] = new Behavior(element, config);

				this._updateWaitingBehaviors(element);

				element.behaviorsUpdated();
			} else {
				this.behaviorsWaitingForDependencies.push({ name, config });
			}
		}
	},

	detachBehavior: function(element, name) {
		if (element.hasOwnProperty(name)) {
			element[name].destructor();
			delete element[name];
			element.behaviorsUpdated();
		}
	},

	_checkBehaviorDependencies: function(element, name) {
		let Behavior = this.behaviors[name];

		for (let dependencyIndex = 0; dependencyIndex < Behavior.dependencies.length; dependencyIndex++) {
			let dependency = Behavior.dependencies[dependencyIndex];

			if (!element.hasOwnProperty(dependency)) {
				return false;
			}
		}

		return true;
	},

	_updateWaitingBehaviors: function(element) {
		let stillWaiting = [];
		let finallyResolved = [];

		//Check if any of the waiting behaviors can now be resolved.
		for (let behaviorIndex = 0; behaviorIndex < this.behaviorsWaitingForDependencies.length; behaviorIndex++) {
			let waitingBehavior = this.behaviorsWaitingForDependencies[behaviorIndex];

			if (this._checkBehaviorDependencies(element, waitingBehavior.name)) {
				finallyResolved.push(waitingBehavior);
			} else {
				stillWaiting.push(waitingBehavior);
			}
		}

		this.behaviorsWaitingForDependencies = stillWaiting;

		for (let behaviorIndex = 0; behaviorIndex < finallyResolved.length; behaviorIndex++) {
			let waitingBehavior = finallyResolved[behaviorIndex];

			this.attachBehavior(element, waitingBehavior.name, waitingBehavior.config);
		}
	}
};

export default Scrollmeister;
