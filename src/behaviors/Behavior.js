import assign from 'ponies/Object.assign.js';
import CustomEvent from 'ponies/CustomEvent.js';

import scrollStatus from 'lib/scrollStatus.js';

//property:value; pairs (separated by colons) separated by semicolons.
//TODO: if this isn't the perfect thing to write unit tests for then call me steve.
//TODO: a-frame allows stuff like "databaseURL: https://aframe-firebase-component.firebaseio.com;". So the left part should not be greedy to only search for the first colon.
//However, the right part should allow colons bruh. This also solves the issue with selectors like "target: .foo:not(bar)". The only reserved character is the semicolon.
//                               /([^:]+):([^;]+)/g;
const propertiesAndValuesRegex = /([^:;]+):([^:;]+)/g;
const whiteSpaceRegex = /\s+/;

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
		this.props = {};
		this.state = {};

		this.parseProperties(rawProperties);

		if (this.scroll) {
			this.listen(scrollStatus, 'scroll', this.scroll.bind(this));
		}

		this.attach();
		this.emit('attach');
	}

	destructor() {
		//Clean up all event listeners added using listen/listenAndInvoke.
		if (this.listeners) {
			for (let i = 0; i < this.listeners.length; i++) {
				let listener = this.listeners[i];

				//listen works for both DOM elements and event emitters using on/off.
				if (typeof listener.element.removeEventListener === 'function') {
					listener.element.removeEventListener(listener.event, listener.callback);
				} else {
					listener.element.off(listener.event, listener.callback);
				}
			}
		}

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
		this.listen(element, eventName, callback);
		callback();
	}

	emit(name, params) {
		//Namespace the event to the name of the behavior.
		name = this.constructor.behaviorName + ':' + name;

		let event = new CustomEvent(name, {
			bubbles: true,
			cancelable: false,
			details: params
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

	//TODO: This might not belong to the behavior itself but to the schemas/types folder, which can then be tested much easier
	parseProperties(rawProperties) {
		const schema = this.constructor.schema;
		const rawPropertiesMap = {};
		let match;

		propertiesAndValuesRegex.lastIndex = 0;

		while ((match = propertiesAndValuesRegex.exec(rawProperties)) !== null) {
			let property = match[1].trim();
			let rawValue = match[2];

			if (!schema.hasOwnProperty(property)) {
				throw new Error(
					`You have defined a property "${property}" in your HTML that "${
						this.constructor.name
					}" is not expecting. The value was "${rawValue}".`
				);
			}

			rawPropertiesMap[property] = rawValue;
		}

		for (let key in schema) {
			if (!schema.hasOwnProperty(key)) {
				continue;
			}

			if (!rawPropertiesMap.hasOwnProperty(key)) {
				//The schema specifies a property that is currently not defined and no default was specified.
				//TODO: does that imply they are all required? What if falsy properties are OK?
				//So far I'm leaning towards yes, they're ALL required. Keywords like "none" or "0" work well as defaults.
				//This makes parts of the code much easier and consistent. KISS.
				if (!schema[key].hasOwnProperty('default')) {
					//TODO: this error message does not help people who only write HTML and don't even know what the class is.
					//It should simply be something like "The layout attribute misses the required guides property"
					//Don't get too technical.
					throw new Error(
						`You are missing the "${key}" property for the ${this.constructor.name} class, which has no default value.`
					);
				} else {
					//There is a default specified, use it.
					this.props[key] = this.parseProperty(key, schema[key].default, schema[key].type);
					continue;
				}
			}

			this.props[key] = this.parseProperty(key, rawPropertiesMap[key], schema[key].type);
		}
	}

	parseProperty(property, rawValue, propertyType) {
		if (propertyType instanceof Array) {
			//thing: keyword, anotherone, and, more
			//a.thing = ['keyword', 'anotherone', 'and', 'more']
			//or
			//thing: keyword 30px 30px, anotherone 100px 8px
			//a.thing = [['keyword', {length: 30, unit: 'px'}, {length: 30, unit: 'px'}], [...]];
			if (propertyType.length === 1) {
				propertyType = propertyType[0];

				if (propertyType instanceof Array) {
					//thing: keyword 30px 30px, anotherone 100px 8px
					//a.thing = [['keyword', {length: 30, unit: 'px'}, {length: 30, unit: 'px'}], [...]];
					let rawValuesList = rawValue.split(',');

					return rawValuesList.map((rawValue, index) => {
						return this.parseProperty(property, rawValue, propertyType);
					});
				} else {
					//thing: keyword, anotherone, and, more
					//a.thing = ['keyword', 'anotherone', 'and', 'more']
					let rawValuesList = rawValue.split(',');

					return rawValuesList.map(rawValue => {
						return propertyType.parse(rawValue);
					});
				}
			} else if (propertyType.length > 1) {
				//thing: keyword 100px
				//a.thing = ['keyword', {length: 100, unit: 'px'}]
				let rawValuesList = rawValue.trim().split(whiteSpaceRegex);

				if (rawValuesList.length !== propertyType.length) {
					throw new Error(
						`The schema for the "${property}" property of the "${this.constructor.name}" class expects ${
							propertyType.length
						} values. Got ${rawValuesList.length}, namely "${rawValuesList.join(' ')}".`
					);
				}

				let map = {};

				for (let rawValueIndex = 0; rawValueIndex < rawValuesList.length; rawValueIndex++) {
					let namedPropertyType = propertyType[rawValueIndex];
					let keys = Object.keys(namedPropertyType);

					if (keys.length !== 1) {
						throw new Error(`A nested schema should have exactly one key (the name) which maps to the type.`);
					}

					let name = keys[0];
					let rawValue = rawValuesList[rawValueIndex];

					map[name] = namedPropertyType[name].parse(rawValue, this.el);
				}

				return map;
			} else {
				throw new Error(
					`You have defined an empty array as schema type for the "${property}"" property of the "${
						this.constructor.name
					}" class.`
				);
			}
		} else {
			//thing: keyword
			//a.thing = 'keyword'
			return propertyType.parse(rawValue, this.el);
		}
	}
}
