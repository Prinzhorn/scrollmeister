// @flow

import Behavior from 'behaviors/Behavior.js';

export default class LazyLoadBehavior extends Behavior {
	static get schema(): any {
		return {};
	}

	static get behaviorName(): string {
		return 'lazy-load';
	}

	static get dependencies(): Array<string> {
		return ['^scroll', 'layout'];
	}

	attach() {
		//This is the last resort, we definitely need to load the assets once the element is inside the viewport.
		let handleViewportEnter = () => {
			lazyLoad();
			unlisten();
		};

		//We try to intelligently load the asset when the element is close to the viewport (extended viewport).
		//We do this inside a scroll pause to minimize jank.
		let handleScrollPause = () => {
			if (this.el.layout.scrollUpdate.inExtendedViewport) {
				lazyLoad();
				unlisten();
			}
		};

		let lazyLoad = () => {
			let elements = this.el.querySelectorAll('[data-src]');

			for (let i = 0; i < elements.length; i++) {
				let el = elements[i];

				el.src = el.getAttribute('data-src');
				el.removeAttribute('data-src');
			}

			this.notify();
		};

		let unlisten = () => {
			this.unlisten('layout:viewport:enter', handleViewportEnter);
			this.unlisten('^scroll:pause', handleScrollPause);
		};

		this.listen('layout:viewport:enter', handleViewportEnter);
		this.listen('^scroll:pause', handleScrollPause);
	}
}
