import assign from 'object-assign';
import CustomEvent from 'ponies/CustomEvent.js';

import schemaParser from 'lib/schemaParser.js';
import { domtypes } from 'types';

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

function normalizeEventsArguments(element, eventName, callback) {
	//The first parameter can be ommitted and defaults to the element that the behavior is attached to.
	if (arguments.length === 2) {
		callback = eventName;
		eventName = element;

		if (eventName.charAt(0) === '^') {
			eventName = eventName.slice(1);
			element = this.parentEl;
		} else {
			element = this.el;
		}
	}

	return {
		element,
		eventName,
		callback
	};
}

export default class Behavior {
	static get behaviorSchema() {
		throw new Error(
			`Your behavior class "${this.constructor.name}" needs to implement the static "behaviorSchema" getter.`
		);
	}

	static get behaviorName() {
		throw new Error(
			`Your behavior class "${this.constructor.name}" needs to implement the static "behaviorName" getter.`
		);
	}

	static get behaviorDependencies() {
		throw new Error(
			`Your behavior class "${this.constructor.name}" needs to implement the static "behaviorDependencies" getter.`
		);
	}

	constructor(element, contentElement, rawProperties) {
		this.hasNotifiedAtLeastOnce = false;
		this.el = element;

		//contentEl and parentEl only make sense for element-behaviors (not globals).
		this.contentEl = contentElement;
		this.parentEl = element.parentElement;

		this.props = {};

		this._shadowChildren = [];

		this._observeDOMTypes();
		this._proxyCSS();
		this._proxyProps();
		this._parseProperties(rawProperties);

		if (this.behaviorDidAttach) {
			this.behaviorDidAttach();
		}

		this.emit('attach');
	}

	destructor() {
		if (this.behaviorWillDetach) {
			this.behaviorWillDetach();
		}

		//Clean up all event listeners added using listen/listenAndInvoke.
		if (this.listeners) {
			for (let i = 0; i < this.listeners.length; i++) {
				let listener = this.listeners[i];

				this.unlisten(listener.element, listener.eventName, listener.callback);
			}
		}

		//Clean up all element appended to shadow-meister.
		let shadowEl = this._findShadowMeister();

		if (shadowEl) {
			for (let i = 0; i < this._shadowChildren.length; i++) {
				shadowEl.removeChild(this._shadowChildren[i]);
			}

			this._shadowChildren.length = 0;
		}

		this._unproxyCSS();

		this.emit('detach');
	}

	error(error) {
		this.el.renderError(error);

		throw error;
	}

	notify() {
		this.hasNotifiedAtLeastOnce = true;
		this.emit('change');
	}

	connectTo(dependencyName, notifyCallback, connectedCallback) {
		if (this.constructor.behaviorDependencies.indexOf(dependencyName) === -1) {
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
		let callback = () => {
			//Overwrite the callback so it only ever gets called a single time.
			//After the first time we call the notifyCallback directly.
			callback = notifyCallback;

			if (connectedCallback) {
				connectedCallback(behavior);
			}

			notifyCallback(behavior);
		};

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
		({ element, eventName, callback } = normalizeEventsArguments.apply(this, arguments));

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
		({ element, eventName, callback } = normalizeEventsArguments.apply(this, arguments));

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
		({ element, eventName, callback } = normalizeEventsArguments.apply(this, arguments));

		this.listen(element, eventName, callback);
		callback();
	}

	unlisten(element, eventName, callback) {
		({ element, eventName, callback } = normalizeEventsArguments.apply(this, arguments));

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

	_findShadowMeister() {
		for (let i = this.el.children.length - 1; i > 0; i--) {
			let child = this.el.children[i];
			if (child.tagName.toUpperCase() === 'SHADOW-MEISTER') {
				return child;
			}
		}

		return null;
	}

	appendChild(element) {
		let shadowEl = this._findShadowMeister();

		if (!shadowEl) {
			shadowEl = document.createElement('shadow-meister');
			this.el.appendChild(shadowEl);
		}

		shadowEl.appendChild(element);
		this._shadowChildren.push(element);
	}

	removeChild(element) {
		let shadowEl = this._findShadowMeister();

		if (!shadowEl) {
			throw new Error(
				'You have called removeChild, but there is no shadow-meister. Did you append the element using Behavior.appendChild?'
			);
		}

		let index = this._shadowChildren.indexOf(element);

		if (index !== -1) {
			shadowEl.removeChild(element);
			this._shadowChildren.splice(index, 1);
		}
	}

	updateProperties(properties) {
		const prevProps = assign({}, this.props);

		if (typeof properties === 'string') {
			this._parseProperties(properties);
		} else {
			for (let name in properties) {
				if (properties.hasOwnProperty(name)) {
					this._parseProperty(name, properties[name]);
				}
			}
		}

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

	_observeDOMTypes() {
		let propertiesWithDOMTypes = [];
		let schema = this.constructor.behaviorSchema;

		for (let property in schema) {
			if (!schema.hasOwnProperty(property)) {
				continue;
			}

			if (domtypes.indexOf(schema[property].type) !== -1) {
				propertiesWithDOMTypes.push(property);
			}
		}

		if (propertiesWithDOMTypes.length > 0) {
			//If this behavior has DOM types, we need to update it every time the DOM changes.
			//E.g. if a new component is inserted between existing ones, layout needs to be updated.
			this.listen(document, 'scrollmeister:connected scrollmeister:disconnected', () => {
				let properties = {};

				for (let i = 0; i < propertiesWithDOMTypes.length; i++) {
					let name = propertiesWithDOMTypes[i];
					properties[name] = this[name];
				}

				//Force update/parsing with the same properties.
				this.updateProperties(properties);
			});
		}
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
		let schema = this.constructor.behaviorSchema;

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
		const schema = this.constructor.behaviorSchema;

		try {
			schemaParser.parseProperties(this.el, schema, rawProperties, this.props);
		} catch (err) {
			this.error(err);
		}
	}

	_parseProperty(property, rawValue) {
		rawValue = rawValue.trim();

		let schema = this.constructor.behaviorSchema[property];
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
