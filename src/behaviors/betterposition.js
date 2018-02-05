export default class BetterPositionBehavior {
	static get schema() {
		return {};
	}

	static get dependencies() {
		return ['position'];
	}

	constructor(element) {
		this.element = element;
		this.element.position.wup();
		this.element.style.background = 'red';
	}

	cleanUp() {
		this.element.style.background = '';
	}
}
