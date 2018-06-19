const skipRegex = /skip\s+(\d+)/;
const consumeRegex = /consume\s+(\d+)/;

function isFlowElement(element) {
	return element.behaviors.layout && element.layout.props.mode === 'flow';
}

function findPreviousFlowElement(context) {
	let element = context;

	while (element.previousSibling) {
		element = element.previousSibling;

		if (element.nodeType !== Node.ELEMENT_NODE) {
			continue;
		}

		if (isFlowElement(element)) {
			return element;
		}
	}

	return null;
}

function findDependencies(value, context) {
	if (value === 'none') {
		return [];
	}

	//"inherit" mimics a regular document flow by rendering the element behind the previous one.
	if (value === 'inherit') {
		let element = findPreviousFlowElement(context);

		if (element) {
			return [element.layout];
		} else {
			return [];
		}
	}

	if (value.indexOf('skip') !== -1 || value.indexOf('consume') !== -1) {
		let numberOfSkips = skipRegex.test(value) ? parseInt(value.match(skipRegex)[1], 10) : 0;
		let numberOfConsumes = consumeRegex.test(value) ? parseInt(value.match(consumeRegex)[1], 10) : 1;

		//Same as inherit
		if (numberOfSkips === 0 && numberOfConsumes === 1) {
			return findDependencies('inherit', context);
		}

		if (numberOfSkips < 0) {
			throw new Error(
				`You've specified a non-positive number of skips (${numberOfSkips}) for the layout dependencies.`
			);
		}

		if (numberOfConsumes < 1) {
			throw new Error(
				`You have specified less than 1 (${numberOfConsumes}) for "consume" for the layout dependencies..`
			);
		}

		let element = context;

		//skip
		do {
			element = findPreviousFlowElement(element);
		} while (element && numberOfSkips--);

		if (!element) {
			//TODO: throw? We could not find the deps, too many skips.
			return [];
		}

		//consume
		let dependencies = [];

		do {
			dependencies.push(element.layout);
			element = findPreviousFlowElement(element);
		} while (element && --numberOfConsumes);

		return dependencies;
	}

	//TODO: nope, this should do sth. like "prevSiblings()"
	//Double nope: we can get into circular-dependencies here (which the layout engine would catch though)
	//Maybe allow negative skips to reverse the order like flexbox?
	//I need to put some thought into this. KISS.
	let dependencies = Array.prototype.slice.call(document.querySelectorAll(value)).filter(isFlowElement);

	if (dependencies.length === 0) {
		throw new Error(
			`Couldn't resolve the layout dependency "${value}". No flow elements found matching this selector.`
		);
	}

	return dependencies.map(el => el.layout);
}

export default {
	parse: function(value, context) {
		value = value.trim();

		let dependencies = findDependencies(value, context);

		return {
			nodes: dependencies,
			value: value
		};
	},
	stringify: function(value) {
		return value.value;
	}
};
