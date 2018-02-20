// @flow

function findPreviousFlowElement(element) {
	while (element.previousSibling) {
		element = element.previousSibling;

		if (element.nodeType !== Node.ELEMENT_NODE) {
			continue;
		}

		if (element.hasAttribute('layout') && element.layout.props.mode === 'flow') {
			return element;
		}
	}
}

//TODO: do we need stringify at all?
//Also I believe SelectorType needs to be reavaluated all the time!
//https://stackoverflow.com/questions/30578673/is-it-possible-to-make-queryselectorall-live-like-getelementsbytagname
//We could return an array from here which we manipulate transparently. However, we need to know when it is not needed aylonger
export default {
	parse: function(value: string, element: HTMLElement): Array<HTMLElement> {
		value = value.trim();

		if (value === 'none') {
			return [];
		}

		//"inherit" mimics a regular document flow by rendering the element behind the previous one.
		if (value === 'inherit') {
			element = findPreviousFlowElement(element);

			if (element) {
				return [element];
			} else {
				return [];
			}
		}

		if (value.indexOf('skip') === 0) {
			let numberOfSkips = parseInt(value.slice('skip'.length).trim(), 10);

			if (numberOfSkips < 0) {
				throw new Error(`You've specified a negative number of skips (${numberOfSkips}) for the layout dependencies.`);
			}

			do {
				element = findPreviousFlowElement(element);
			} while (element && numberOfSkips--);

			if (element) {
				return [element];
			} else {
				return [];
			}
		}

		return Array.prototype.slice.call(document.querySelectorAll(value));
	},
	stringify: function(value: string): string {
		return value;
	}
};