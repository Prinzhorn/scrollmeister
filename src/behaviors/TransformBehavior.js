// @flow

import Behavior from 'behaviors/Behavior.js';
import InterpolateBehavior from 'behaviors/InterpolateBehavior.js';

export default class TransformBehavior extends Behavior {
	static get behaviorSchema(): any {
		return {};
	}

	static get behaviorName(): string {
		return 'transform';
	}

	static get behaviorDependencies(): Array<string> {
		return ['interpolate'];
	}

	behaviorDidAttach() {
		this.connectTo('interpolate', this._render.bind(this));
	}

	_render(interpolateBehavior: InterpolateBehavior) {
		let { values } = interpolateBehavior;
		this.contentStyle.opacity = values.opacity;

		//TODO: in which order will we apply translate, rotate, scale and skew?
		//I guess translate should always be the first. And scaling the last one.
		//So... translate, skew, rotate, scale?
		//This feels natural. Skewing after rotating is nothing people can imagine in their head.
		//Or just add an order property with a default.
		this.contentStyle.transform = `translate(${values.x}%, ${values.y}%) rotate(${values.rotate}deg) scale(${
			values.scale
		})`;

		this.notify();
	}
}
