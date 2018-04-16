// @flow

import Behavior from 'behaviors/Behavior.js';

export default class CSSBehavior extends Behavior {
	static get behaviorSchema(): any {
		return {};
	}

	static get behaviorName(): string {
		return 'css';
	}

	static get behaviorDependencies(): Array<string> {
		return [];
	}

	addClass(name: string) {
		if (this.el.classList) {
			this.el.classList.add(name);
		} else {
			this.el.className = this.el.className + ' ' + name;
		}
	}

	removeClass(name: string) {
		if (this.el.classList) {
			this.el.classList.remove(name);
		} else {
			this.el.className = this.el.className.replace(new RegExp('(?:^|\\s)' + name + '(?!\\S)'), '');
		}
	}

	onSignal(signal: string, data: string) {
		switch (signal) {
			case 'add':
				this.addClass(data);
				break;
			case 'remove':
				this.removeClass(data);
				break;
			default:
				this.error(new Error(`Received an unknown signal "${signal}".`));
				break;
		}
	}
}
