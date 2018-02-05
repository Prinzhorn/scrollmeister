export default class LayoutBehavior {
	static get schema() {
		return {
			guides: {
				type: [String]
			}
		};
	}

	//https://aframe.io/docs/0.7.0/core/component.html#dependencies
	/*
		TODO: in a-frame this affects the order in which behaviors are initialized. Which makes sense. This is timing hell tho.
		We can't just blindly initialize the behaviors in attributeChangedCallback.
		But we can put them in a list and after each behavior check if a behavior depended on it and then trigger it.
	*/
	static get dependencies() {
		return [];
	}

	constructor(element, config) {
		this.element = element;
		this.element.innerHTML = 'behavior did this';
	}

	cleanUp() {
		this.element.innerHTML = 'clean af';
	}

	scroll() {}

	signal() {}

	bam() {
		console.log('in yop face');
	}
}
