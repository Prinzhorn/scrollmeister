// https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
let CustomEvent;

if (typeof window.CustomEvent === 'function') {
	CustomEvent = window.CustomEvent;
} else {
	CustomEvent = function(event, params) {
		params = params || { bubbles: false, cancelable: false, detail: undefined };

		let evt = document.createEvent('CustomEvent');
		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);

		return evt;
	};

	CustomEvent.prototype = window.Event.prototype;
}

export default CustomEvent;
