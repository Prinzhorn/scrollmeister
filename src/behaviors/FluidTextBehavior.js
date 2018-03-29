// @flow

import Behavior from 'behaviors/Behavior.js';

import fontSizeWidthRatio from 'lib/fontSizeWidthRatio.js';

export default class FadeInBehavior extends Behavior {
	static get schema(): any {
		return {};
	}

	static get behaviorName(): string {
		return 'fluidtext';
	}

	static get dependencies(): Array<string> {
		return ['layout'];
	}

	attach() {
		if (this.el.layout.contentEl.children.length !== 1) {
			throw new Error(
				'The fluidtext behavior expects a single child element. We recommend an <h1>, since the behavior is most suited for headlines.'
			);
		}

		//TODO: I want to be able to do this.style(this.el.layout.innerEl, 'whiteSpace', 'nowrap') which cleans up automatically.

		this.el.layout.innerEl.style.whiteSpace = 'nowrap';

		this.connectTo('layout', layoutBehavior => {
			if (!this._fontSizeWidthRatio) {
				this._fontSizeWidthRatio = fontSizeWidthRatio(this.el.layout.innerEl);
			}

			this.el.layout.innerEl.style.fontSize = this._fontSizeWidthRatio * layoutBehavior.layout.width + 'px';

			this.notify();
		});
	}

	detach() {
		this.el.layout.innerEl.style.whiteSpace = '';
		this.el.layout.innerEl.style.fontSize = '';
	}
}
