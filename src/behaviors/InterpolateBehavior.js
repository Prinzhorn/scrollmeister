// @flow

import Behavior from 'behaviors/Behavior.js';

//Parameters are a comma separated list of keyframes.
//A keyframe is defined by a position inside the viewport and a value.
//E.g. "alpha: top 1, bottom 0;" would set the alpha parameter to 1
//when the top is aligned with the top of the viewport and to 0 when the bottoms are aligned.
//The values inbetween are interpolated, hence the name of the behavior.
const keyframesSchema = {
	type: [[{ anchor: 'string' }, { offset: 'csslength' }, { value: 'number' }]],
	//TODO: this is sick, use for spacing as well.
	expand: function(rawProperties) {
		if (rawProperties.length === 1) {
			//Default offset to 0 and value to 1.
			rawProperties.push('0', '1');
			return true;
		} else if (rawProperties === 2) {
			//Default offset to 0.
			rawProperties.splice(1, 0, '0');
			return true;
		}

		return false;
	},
	default: ''
};

export default class DebugGuidesBehavior extends Behavior {
	static get schema(): any {
		return {
			opacity: keyframesSchema,
			scale: keyframesSchema,
			rotate: keyframesSchema,
			alpha: keyframesSchema,
			beta: keyframesSchema,
			gamma: keyframesSchema
		};
	}

	static get dependencies(): Array<string> {
		return ['layout'];
	}

	static get behaviorName(): string {
		return 'interpolate';
	}

	attach() {
		this.el.style.opacity = 1;
	}

	detach() {
		this.el.style.opacity = '';
	}
}
