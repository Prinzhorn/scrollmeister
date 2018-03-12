// @flow

import Behavior from 'behaviors/Behavior.js';

import fontSizeWidthRatio from 'lib/fontSizeWidthRatio.js';

export default class FadeInBehavior extends Behavior {
	static get schema(): any {
		return {};
	}

	static get dependencies(): Array<string> {
		return ['layout'];
	}

	static get behaviorName(): string {
		return 'fluidtext';
	}

	attach() {
		if (this.el.layout.contentEl.children.length !== 1) {
			throw new Error(
				'The fluidtext behavior expects a single child element. We recommend an <h1>, since the behavior is most suited for headlines.'
			);
		}

		//TODO: I want to be able to do this.style(this.el.layout.innerEl, 'whiteSpace', 'nowrap') which cleans up automatically.

		this.el.layout.innerEl.style.whiteSpace = 'nowrap';

		//TODO: same problem as interpolate:change. If the fluidtext behavior is added lazy, we won't catch the first render.
		this.listen('layout:render', () => {
			if (!this._fontSizeWidthRatio) {
				this._fontSizeWidthRatio = fontSizeWidthRatio(this.el.layout.innerEl);
			}

			this.el.layout.innerEl.style.fontSize = this._fontSizeWidthRatio * this.el.layout.layout.width + 'px';
		});
	}

	detach() {
		this.el.layout.innerEl.style.whiteSpace = '';
		this.el.layout.innerEl.style.fontSize = '';
	}
}
