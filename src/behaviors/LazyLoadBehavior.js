// @flow

import Behavior from 'behaviors/Behavior.js';

export default class LazyLoadBehavior extends Behavior {
	static get schema(): any {
		return {};
	}

	static get dependencies(): Array<string> {
		return ['^guidelayout', 'layout'];
	}

	static get behaviorName(): string {
		return 'lazyload';
	}

	attach() {
		let lazyLoad = () => {
			if (!this.el.layout.scrollUpdate.inExtendedViewport) {
				return;
			}

			this.unlisten(this.parentEl, 'guidelayout:pause', lazyLoad);

			let elements = this.el.querySelectorAll('[data-src]');

			for (let i = 0; i < elements.length; i++) {
				let el = elements[i];

				el.src = el.getAttribute('data-src');
				el.removeAttribute('data-src');
			}
		};

		this.listen(this.parentEl, 'guidelayout:pause', lazyLoad);
	}
}
