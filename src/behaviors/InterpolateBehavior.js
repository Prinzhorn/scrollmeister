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
		} else if (rawProperties.length === 2) {
			//Default offset to 0.
			rawProperties.splice(1, 0, '0');
			return true;
		}

		return false;
	},
	default: ''
};

export default class InterpolateBehavior extends Behavior {
	static get schema(): any {
		return {
			opacity: keyframesSchema,
			rotate: keyframesSchema,
			scale: keyframesSchema,
			alpha: keyframesSchema,
			beta: keyframesSchema,
			gamma: keyframesSchema
		};
	}

	static get dependencies(): Array<string> {
		return ['^guidelayout', 'layout'];
	}

	static get behaviorName(): string {
		return 'interpolate';
	}

	attach() {
		this._interpolators = {};

		//Non-zero defaults.
		this._defaultValues = {
			opacity: 1,
			scale: 1
		};

		//TODO: what if interpolate behaviopr is added lazy? We don't get an initial event then.
		//Maybe ask the element nicely for a cached value of the last time it fired, if any?
		this.listen(this.parentEl, 'guidelayout:layout', () => {
			this._createInterpolators();
		});

		//TODO: if the translate behavior also listens to the scroll event, how do we guarantee that the interpolate behavior gets it FIRST?
		//This might already be solved because behaviors are attached in order (translate depends on interpolate).
		this.listen(this.parentEl, 'guidelayout:scroll', e => {
			this._interpolate(e.detail.scrollState);
		});
	}

	update() {
		this._createInterpolators();
	}

	_createInterpolators() {
		let schema = this.constructor.schema;

		for (let prop in schema) {
			if (schema.hasOwnProperty(prop)) {
				if (this.props[prop].length > 0) {
					this._interpolators[prop] = this._createInterpolator(this.props[prop]);
				} else {
					delete this._interpolators[prop];
				}
			}
		}

		//Apply the interpolators right away.
		this._interpolate(this.parentEl.guidelayout.scrollState);
	}

	_createInterpolator(keyframes) {
		let layoutEngine = this.parentEl.guidelayout.engine;

		//Map the keyframe anchor and offset to scroll positions.
		keyframes = keyframes.map(keyframe => {
			let pixelOffset = layoutEngine.lengthToPixel(keyframe.offset);
			let position = layoutEngine.calculateAnchorPosition(this.el.layout.layout, keyframe.anchor, pixelOffset);

			return {
				position: position,
				value: keyframe.value
			};
		});

		//Sort them by scroll position from top to bottom.
		keyframes = keyframes.sort((a, b) => a.position - b.position);

		let firstKeyframe = keyframes[0];
		let lastKeyframe = keyframes[keyframes.length - 1];

		//Return a function which, given the current scrollPosition, returns the interpolated value.
		return function(scrollPosition) {
			//If the top position is out of bounds, use the edge values.
			if (scrollPosition <= firstKeyframe.position) {
				return firstKeyframe.value;
			}

			if (scrollPosition >= lastKeyframe.position) {
				return lastKeyframe.value;
			}

			//Figure out between which two keyframes we are.
			for (let i = 1; i < keyframes.length; i++) {
				let rightKeyframe = keyframes[i];

				//We found the right keyframe!
				if (scrollPosition < rightKeyframe.position) {
					let leftKeyframe = keyframes[i - 1];

					let progress = (rightKeyframe.position - scrollPosition) / (rightKeyframe.position - leftKeyframe.position);

					return progress * (leftKeyframe.value - rightKeyframe.value) + rightKeyframe.value;
				}
			}

			throw new Error('Could not interpolate');
		};
	}

	_interpolate(scrollState) {
		let schema = this.constructor.schema;

		for (let prop in schema) {
			if (schema.hasOwnProperty(prop)) {
				if (this._interpolators.hasOwnProperty(prop)) {
					this[prop] = this._interpolators[prop](scrollState.position);
				} else {
					this[prop] = this._defaultValues.hasOwnProperty(prop) ? this._defaultValues[prop] : 0;
				}
			}
		}

		//TODO: only trigger events when a value was actually changed!
		this.emit('interpolate');
	}
}
