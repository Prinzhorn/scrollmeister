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
		};

		let unlisten = () => {
			this.unlisten(this.el, 'layout:viewport:enter', handleViewportEnter);
			this.unlisten(this.parentEl, 'guidelayout:pause', handleScrollPause);
		};

		this.listen(this.el, 'layout:viewport:enter', handleViewportEnter);
		this.listen(this.parentEl, 'guidelayout:pause', handleScrollPause);
	}
}
