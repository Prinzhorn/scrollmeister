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

	static get dependencies() {
		throw new Error(
			`Your behavior class "${this.constructor.name}" needs to implement the static "dependencies" getter.`
		);
	}

	static get behaviorName() {
		throw new Error(
			`Your behavior class "${this.constructor.name}" needs to implement the static "behaviorName" getter.`
		);
	}

	attach() {
		throw new Error(`Your behavior class "${this.constructor.name}" needs to implement the attach() method.`);
	}

	constructor(element, rawProperties) {
		this.el = element;
		this.parentEl = element.parentNode;
		this.props = {};
		this.state = {};

		this.proxyCSS();
		this.proxyProps();
		this.parseProperties(rawProperties);

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

		this.unproxyCSS();

		if (this.detach) {
			this.detach();
		}

		this.emit('detach');
	}

	setState(newState) {
		const prevState = assign({}, this.state);

		assign(this.state, newState);

		if (this.update) {
			this.update(this.props, prevState);
		}

		this.emit('update');
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

		//listen works for both DOM elements and event emitters using on/off.
		if (typeof element.addEventListener === 'function') {
			element.addEventListener(eventName, callback, thirdEventListenerArgument);
		} else {
			element.on(eventName, callback);
		}

		if (!this.listeners) {
			this.listeners = [];
		}

		this.listeners.push({ element, eventName, callback });
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

		//listen works for both DOM elements and event emitters using on/off.
		if (typeof element.removeEventListener === 'function') {
			element.removeEventListener(eventName, callback, thirdEventListenerArgument);
		} else {
			element.off(eventName, callback);
		}
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

	updateProperties(rawProperties) {
		const prevProps = assign({}, this.props);

		this.parseProperties(rawProperties);

		if (this.update) {
			this.update(prevProps, this.state);
		}

		this.emit('update');
	}

	updateProperty(name, rawValue) {
		const prevProps = assign({}, this.props);

		this.parseProperty(name, rawValue);

		if (this.update) {
			this.update(prevProps, this.state);
		}

		this.emit('update');
	}

	proxyCSS() {
		let behaviorName = this.constructor.behaviorName;
		let element = this.el;

		this.css = {
			set transform(value) {
				if (value === null) {
					element.resetBehaviorStyle(behaviorName, 'transform');
				} else {
					element.setBehaviorStyle(behaviorName, 'transform', value);
				}
			},
			set opacity(value) {
				if (value === null) {
					element.resetBehaviorStyle(behaviorName, 'opacity');
				} else {
					element.setBehaviorStyle(behaviorName, 'opacity', value);
				}
			}
		};
	}

	unproxyCSS() {
		let behaviorName = this.constructor.behaviorName;

		this.el.resetBehaviorStyles(behaviorName);
	}

	proxyProps() {
		let schema = this.constructor.schema;

		for (let property in schema) {
			if (schema.hasOwnProperty(property)) {
				Object.defineProperty(this, property, {
					get() {
						return schemaParser.stringifyProperty(this.el, this.props[property], schema[property].type);
					},
					set(value) {
						this.updateProperty(property, value);
					}
				});
			}
		}
	}

	parseProperties(rawProperties) {
		const schema = this.constructor.schema;
		schemaParser.parseProperties(this.el, schema, rawProperties, this.props);
	}

	parseProperty(property, rawValue) {
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

		this.props[property] = schemaParser.parseProperty(this.el, property, rawValue, propertyType, valueExpander);
	}
}
