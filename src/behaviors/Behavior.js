import assign from 'ponies/Object.assign.js';
import CustomEvent from 'ponies/CustomEvent.js';

import schemaParser from 'lib/schemaParser.js';
import scrollStatus from 'lib/scrollStatus.js';

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

		//TODO: does this make sense? Does ANYONE except for the layout behavior need the scroll event?
		//We wanted to solve everything else using signals/slots which can be triggered by the layout engine.
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
					listener.element.removeEventListener(listener.event, listener.callback, thirdEventListenerArgument);
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

	parseProperties(rawProperties) {
		const schema = this.constructor.schema;
		schemaParser.parseProperties(this.el, schema, rawProperties, this.props);
	}
}
