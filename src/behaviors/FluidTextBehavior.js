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
		if (this.contentEl.children.length !== 1) {
			this.error(
				new Error(
					'The fluidtext behavior expects a single child element. We recommend an <h1>, since the behavior is most suited for headlines.'
				)
			);
		}

		this.contentStyle.whiteSpace = 'nowrap';

		this.connectTo('layout', layoutBehavior => {
			if (!this._fontSizeWidthRatio) {
				this._fontSizeWidthRatio = fontSizeWidthRatio(this.contentEl);
			}

			this.contentStyle.fontSize = this._fontSizeWidthRatio * layoutBehavior.layout.width + 'px';

			this.notify();
		});
	}
}
