// @flow

import Behavior from 'behaviors/Behavior.js';

export default class TransformBehavior extends Behavior {
	static get schema(): any {
		return {};
	}

	static get dependencies(): Array<string> {
		return ['interpolate'];
	}

	static get behaviorName(): string {
		return 'transform';
	}

	attach() {
		this.listen(this.el, 'interpolate:interpolate', () => {
			//TODO: only set these if interpolate actually did something. Maybe use separate events, e.g. interpolate:opacity
			//TODO: What if the transition behavior is added lazy? We interpolate behavior won't trigger any events until we scroll again.
			//The same applies to the layout behavior. If we add it later (not in the same frame as guidelayout) then it won't receive
			//the most rect guidelayout:layout event. So this is something we need to solve in the grand schema.

			this.css.opacity = this.el.interpolate.opacity;
			this.css.transform = `rotate(${this.el.interpolate.rotate}deg) scale(${this.el.interpolate.scale})`;

			//TODO: in which order will we apply translate, rotate, scale and skew?
			//I guess translate should always be the first. And scaling the last one.
			//So... translate, skew, rotate, scale?
			//This feels natural. Skewing after rotating is nothing people can imagine in their head.
		});
	}
}
