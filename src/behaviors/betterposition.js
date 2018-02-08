export default class BetterPositionBehavior {
	static get schema() {
		return {};
	}

	static get dependencies() {
		return ['position'];
	}

	static get behaviorName(): string {
		return 'betterposition';
	}

	constructor(element) {
		this.element = element;
		this.element.position.wup();
		this.element.style.background = 'red';
	}

	detach() {
		this.element.style.background = '';
		this.element.style.transform = '';
	}

	scroll() {
		this.element.style.transform = `rotate(${(Date.now() - 1517925133289) / 100}deg)`;
	}
}
