import assign from 'ponies/Object.assign.js';
import CustomEvent from 'ponies/CustomEvent.js';

import schemaParser from 'lib/schemaParser.js';

const supportsPassiveEvents = (function() {
	let passiveSupported;

	try {
		const options = Object.defineProperty({}, 'passive', {
			get: function() {
				passiveSupported = true;
			}
		});

		window.addEventListener('test', options, options);
		window.removeEventListener('test', options, options);
	} catch (ignore) {
		passiveSupported = false;
	}

	return passiveSupported;
})();

//Chrome makes touchmove passive by default. We don't want none of that.
const thirdEventListenerArgument = supportsPassiveEvents ? { passive: false } : false;

export default class Behavior {
	static get schema() {
		throw new Error(`Your behavior class "${this.constructor.name}" needs to implement the static "schema" getter.`);
	}

	static get behaviorName() {
		throw new Error(
			`Your behavior class "${this.constructor.name}" needs to implement the static "behaviorName" getter.`
		);
	}

	static get dependencies() {
		throw new Error(
			`Your behavior class "${this.constructor.name}" needs to implement the static "dependencies" getter.`
		);
	}

	attach() {
		throw new Error(`Your behavior class "${this.constructor.name}" needs to implement the attach() method.`);
	}

	constructor(element, rawProperties) {
		this.hasNotifiedAtLeastOnce = false;
		this.el = element;
		this.parentEl = element.parentNode;
		this.props = {};

		this._proxyCSS();
		this._proxyProps();
		this._parseProperties(rawProperties);

		this.attach();
		this.emit('attach');
	}

	destructor() {
		//Clean up all event listeners added using listen/listenAndInvoke.
		if (this.listeners) {
			for (let i = 0; i < this.listeners.length; i++) {
				let listener = this.listeners[i];

				this.unlisten(listener.element, listener.eventName, listener.callback);
			}
		}

		this._unproxyCSS();

		if (this.detach) {
			this.detach();
		}

		this.emit('detach');
	}

	notify() {
		this.hasNotifiedAtLeastOnce = true;
		this.emit('change');
	}

	connectTo(dependencyName, callback) {
		if (this.constructor.dependencies.indexOf(dependencyName) === -1) {
			throw new Error(
				`You are trying to connect the "${
					this.constructor.behaviorName
				}" behavior to the "${dependencyName}" behavior, which is not listed as dependency.`
			);
		}

		let element = this.el;

		if (dependencyName.charAt(0) === '^') {
			dependencyName = dependencyName.slice(1);
			element = this.parentEl;
		}

		let behavior = element[dependencyName];

		//For the most part this is what "connecting" is about.
		//We just listen to the change event of the other behavior.
		this.listen(element, dependencyName + ':change', () => {
			callback(behavior);
		});

		//This is up for debate. Do we need to update the connection every time
		//this behavior gets new props?
		this.listen(this.constructor.behaviorName + ':update', () => {
			if (behavior.hasNotifiedAtLeastOnce) {
				callback(behavior);
			}
		});

		//This catches the edge case where the current behavior is attached lazy
		//and the dependency already had a change event. We want to update the behavior immediately.
		if (behavior.hasNotifiedAtLeastOnce) {
			callback(behavior);
		}
	}

	listen(element, eventName, callback) {
		//The first parameter can be ommitted and defaults to the element that the behavior is attached to.
		if (arguments.length === 2) {
			callback = eventName;
			eventName = element;
			element = this.el;
		}

		//Space separated list of event names for the same element and callback.
		if (eventName.indexOf(' ') !== -1) {
			eventName
				.split(' ')
				.map(s => s.trim())
				.forEach(s => {
					this.listen(element, s, callback);
				});

			return;
		}

		element.addEventListener(eventName, callback, thirdEventListenerArgument);

		if (!this.listeners) {
			this.listeners = [];
		}

		this.listeners.push({ element, eventName, callback });
	}

	listenOnce(element, eventName, callback) {
		//The first parameter can be ommitted and defaults to the element that the behavior is attached to.
		if (arguments.length === 2) {
			callback = eventName;
			eventName = element;
			element = this.el;
		}

		const self = this;

		function oneCallback() {
			self.unlisten(element, eventName, oneCallback);
			callback.apply(this, arguments);
		}

		//I was too lazy to implement it more cleanly. At least we throw instead of having unpredictable behavior.
		//This is needed because below we store a reference to the actual listener as _once property.
		//If you use the same callback for two events they would overwrite each other and we
		//could never unlisten() the first one.
		if (typeof callback._once === 'function') {
			throw new Error('You cannot use the same listener for multiple events with listenOnce');
		}

		callback._once = oneCallback;
		this.listen(element, eventName, oneCallback);
	}

	listenAndInvoke(element, eventName, callback) {
		//The first parameter can be ommitted and defaults to the element that the behavior is attached to.
		if (arguments.length === 2) {
			callback = eventName;
			eventName = element;
			element = this.el;
		}

		this.listen(element, eventName, callback);
		callback();
	}

	unlisten(element, eventName, callback) {
		//The first parameter can be ommitted and defaults to the element that the behavior is attached to.
		if (arguments.length === 2) {
			callback = eventName;
			eventName = element;
			element = this.el;
		}

		//This is a hack to make listenOnce work.
		//We store a reference to the original listener as _once property.
		if (typeof callback._once === 'function') {
			callback = callback._once;
			delete callback._once;
		}

		element.removeEventListener(eventName, callback, thirdEventListenerArgument);
	}

	emit(name, bubbles = true) {
		//Namespace the event to the name of the behavior.
		name = this.constructor.behaviorName + ':' + name;

		let event = new CustomEvent(name, {
			bubbles: bubbles,
			cancelable: false,
			detail: this
		});

		this.el.dispatchEvent(event);
	}

	appendChild() {
		//TODO: append to data-scrollmeister-shadow (<shadow-meister>), innerEl or el
		//Then remove the node in destructor automagically.
	}

	updateProperties(rawProperties) {
		const prevProps = assign({}, this.props);

		this._parseProperties(rawProperties);

		if (this.update) {
			this.update(prevProps);
		}

		this.emit('update');
	}

	_updateProperty(name, rawValue) {
		const prevProps = assign({}, this.props);

		this._parseProperty(name, rawValue);

		if (this.update) {
			this.update(prevProps);
		}

		this.emit('update');
	}

	_proxyCSS() {
		let behaviorName = this.constructor.behaviorName;
		let element = this.el;

		this.style = {
			set transform(value) {
				if (value === '') {
					element.resetBehaviorStyle(behaviorName, 'transform');
				} else {
					element.setBehaviorStyle(behaviorName, 'transform', value);
				}
			},
			set opacity(value) {
				if (value === '') {
					element.resetBehaviorStyle(behaviorName, 'opacity');
				} else {
					element.setBehaviorStyle(behaviorName, 'opacity', value);
				}
			}
		};
	}

	_unproxyCSS() {
		let behaviorName = this.constructor.behaviorName;

		this.el.resetBehaviorStyles(behaviorName);
	}

	_proxyProps() {
		let schema = this.constructor.schema;

		for (let property in schema) {
			if (schema.hasOwnProperty(property)) {
				Object.defineProperty(this, property, {
					get() {
						return schemaParser.stringifyProperty(this.el, this.props[property], schema[property].type);
					},
					set(value) {
						this._updateProperty(property, value);
					}
				});
			}
		}
	}

	_parseProperties(rawProperties) {
		const schema = this.constructor.schema;
		schemaParser.parseProperties(this.el, schema, rawProperties, this.props);
	}

	_parseProperty(property, rawValue) {
		rawValue = rawValue.trim();

		let schema = this.constructor.schema[property];
		let propertyType = schema.type;
		let valueExpander = schema.expand;

		//Setting the empty string resets the property to the default value.
		if (rawValue === '') {
			if (!schema.hasOwnProperty('default')) {
				throw new Error(
					`The "${property}" property does not have a default value. It cannot be unset using an empty string.`
				);
			}

			rawValue = schema.default;
		}

		//TODO: does not validate against .enum
		this.props[property] = schemaParser.parseProperty(this.el, property, rawValue, propertyType, valueExpander);
	}
}
