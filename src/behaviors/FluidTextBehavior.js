// @flow

import Behavior from 'behaviors/Behavior.js';

import fontSizeWidthRatio from 'lib/fontSizeWidthRatio.js';

export default class FadeInBehavior extends Behavior {
	static get behaviorSchema(): any {
		return {};
	}

	static get behaviorName(): string {
		return 'fluid-text';
	}

	static get behaviorDependencies(): Array<string> {
		return ['layout'];
	}

	behaviorDidAttach() {
		if (this.el.layout.contentEl.children.length !== 1) {
			this.error(
				new Error(
					'The fluidtext behavior expects a single child element. We recommend an <h1>, since the behavior is most suited for headlines.'
				)
			);
		}

		//TODO: I want to be able to do this.style(this.el.layout.innerEl, 'whiteSpace', 'nowrap') which cleans up automatically.

		this.contentEl.style.whiteSpace = 'nowrap';

		this.connectTo('layout', layoutBehavior => {
			if (!this._fontSizeWidthRatio) {
				this._fontSizeWidthRatio = fontSizeWidthRatio(this.contentEl);
			}

			this.contentEl.style.fontSize = this._fontSizeWidthRatio * layoutBehavior.layout.width + 'px';

			this.notify();
		});
	}

	behaviorWillDetach() {
		this.contentEl.style.whiteSpace = '';
		this.contentEl.style.fontSize = '';
	}
}
