let CustomEvent = window.CustomEvent;

if (typeof CustomEvent !== 'function') {
	CustomEvent = function(name, params = { bubbles: false, cancelable: false }) {
		let event = document.createEvent('CustomEvent');
		event.initCustomEvent(name, params.bubbles, params.cancelable, params.detail);

		return event;
	};

	CustomEvent.prototype = window.Event.prototype;
}

export default CustomEvent;
