// @flow

import Behavior from 'behaviors/Behavior.js';

export default class TransformBehavior extends Behavior {
	static get schema(): any {
		return {};
	}

	static get behaviorName(): string {
		return 'transform';
	}

	static get dependencies(): Array<string> {
		return ['interpolate'];
	}

	attach() {
		this.listen('interpolate:change', () => {
			//TODO: What if the transition behavior is added lazy? We interpolate behavior won't trigger any events until we scroll again.
			//The same applies to the layout behavior. If we add it later (not in the same frame as guidelayout) then it won't receive
			//the most rect guidelayout:layout event. So this is something we need to solve in the grand schema.
			//TODO: in which order will we apply translate, rotate, scale and skew?
			//I guess translate should always be the first. And scaling the last one.
			//So... translate, skew, rotate, scale?
			//This feels natural. Skewing after rotating is nothing people can imagine in their head.
			//Or just add an order property with a default.

			this._render();
		});
	}

	_render() {
		this.style.opacity = this.el.interpolate.values.opacity;
		this.style.transform = `rotate(${this.el.interpolate.values.rotate}deg) scale(${this.el.interpolate.values.scale})`;
	}
}
