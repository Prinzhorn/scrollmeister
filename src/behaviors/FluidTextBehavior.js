// @flow

import Behavior from 'behaviors/Behavior.js';

import perfectFontSize from 'lib/perfectFontSize.js';

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

		//TODO: same problem as interpolate:change. If the fluidtext behavior is added lazy, we won't catch the first render.
		this.listen(this.el, 'layout:render', () => {
			this.el.layout.innerEl.style.fontSize = perfectFontSize(this.el.layout.innerEl);
		});
	}

	detach() {
		this.el.layout.innerEl.style.fontSize = '';
	}
}
