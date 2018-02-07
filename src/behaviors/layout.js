export default class LayoutBehavior {
	static get schema() {
		return {
			guides: {
				type: [GuideDefinition]
			},
			width: {
				type: CSSLength
			}
		};
	}

	static get dependencies() {
		return [];
	}

	constructor(element, config) {
		this.element = element;
		this.element.title = 'behavior did this 1';
	}

	detach() {
		this.element.title = 'clean af';
	}

	scroll() {}

	bam() {
		console.log('in yop face');
	}
}
