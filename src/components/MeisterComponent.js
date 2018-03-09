// @flow

import raf from 'raf';

import Scrollmeister from 'scrollmeister.js';

const invalidMarkupSelectors = [
	':not(scroll-meister) > el-meister',
	'scroll-meister * el-meister',
	'scroll-meister scroll-meister',
	'el-meister el-meister',
	'el-meister scroll-meister'
];

export default class ScrollMeisterComponent extends HTMLElement {
	behaviors: any;
	_scheduledBatchUpdate: boolean;
	_scheduledBehaviors: { attach: any, detach: any };
	_batchHandle: number;

	// Note: if you feel clever and think you can just define
	// the static `observedAttributes` getter on the super class: IE 9/10.

	// https://github.com/WebReflection/document-register-element/tree/7e2743d38f0bf01806cb9b76ba254f62f8cb24b2#v1-caveat
	// $FlowFixMe: Won't be fixed ;)
	constructor(_) {
		// $FlowFixMe: Won't be fixed ;)
		return (_ = super(_)).init(), _;
	}

	init() {
		this.behaviors = {};

		this._behaviorStyles = {};
		this._scheduledBatchUpdate = false;
		this._scheduledBehaviors = {
			attach: {},
			detach: {}
		};
	}

	connectedCallback() {
		//Make some sanity checks on the markup for UX.
		raf(() => {
			if (document.querySelector(invalidMarkupSelectors.join(','))) {
				throw new Error(
					'You have nested <scroll-meister> and <el-meister> elements in an unsupported way. <el-meister> elements need to always be direct children of <scroll-meister>.'
				);
			}
		});
	}

	disconnectedCallback() {
		raf.cancel(this._batchHandle);

		// $FlowFixMe: We expect this static property on the subclass. Nobody will ever create an instance of just MeisterComponent.
		let observedAttributes = this.constructor.observedAttributes;

		//Remove all attached behaviors so they can be garbage collected.
		for (let i = 0; i < observedAttributes.length; i++) {
			let attr = observedAttributes[i];

			Scrollmeister.detachBehavior(this, attr);
		}
	}

	attributeChangedCallback(attr: string, oldValue: string | null, newValue: string | null) {
		if (!this._scheduledBatchUpdate) {
			this._scheduledBatchUpdate = true;
			this._batchHandle = raf(this._batchUpdateBehaviors.bind(this));
		}

		if (newValue === null) {
			this._scheduledBehaviors.detach[attr] = true;
			delete this._scheduledBehaviors.attach[attr];
		} else {
			this._scheduledBehaviors.attach[attr] = newValue;
			delete this._scheduledBehaviors.detach[attr];
		}
	}

	setBehaviorStyle(behaviorName, property, value) {
		if (!this._behaviorStyles.hasOwnProperty(property)) {
			this._behaviorStyles[property] = {};
		}

		//Remember that the given behavior just set this style.
		this._behaviorStyles[property][behaviorName] = value;

		this.applyBehaviorStyle(property);
	}

	//TODO: we need a consistent order.
	applyBehaviorStyle(property) {
		if (property === 'transform') {
			let transforms = [];

			//Collect all transforms across all behaviors.
			for (let behaviorName in this._behaviorStyles[property]) {
				if (this._behaviorStyles[property].hasOwnProperty(behaviorName)) {
					transforms.push(this._behaviorStyles[property][behaviorName]);
				}
			}

			if (transforms.length > 0) {
				this.style[property] = this.style.WebkitTransform = this.style.msTransform = transforms.join(' ');
			} else {
				this.style[property] = '';
			}
		} else if (property === 'opacity') {
			let combinedOpacity = 1;

			//Multiply all opacity across all behaviors.
			for (let behaviorName in this._behaviorStyles[property]) {
				if (this._behaviorStyles[property].hasOwnProperty(behaviorName)) {
					combinedOpacity *= this._behaviorStyles[property][behaviorName];
				}
			}

			this.style[property] = combinedOpacity;
		} else {
			let hasProperty = false;

			for (let behaviorName in this._behaviorStyles[property]) {
				if (this._behaviorStyles[property].hasOwnProperty(behaviorName)) {
					this.style[property] = this._behaviorStyles[property][behaviorName];

					if (hasProperty) {
						throw new Error(
							`The "${property}" property was set by multiple behaviors (${Object.keys(
								this._behaviorStyles[property]
							).join(', ')}) but it cannot be merged.`
						);
					}

					hasProperty = true;
				}
			}

			//No behavior had a style for this property. Reset it completely.
			if (!hasProperty) {
				this.style[property] = '';
			}
		}
	}

	resetBehaviorStyle(behaviorName, property) {
		if (this._behaviorStyles[property].hasOwnProperty(behaviorName)) {
			delete this._behaviorStyles[property][behaviorName];
			this.applyBehaviorStyle(property);
		}
	}

	resetBehaviorStyles(behaviorName) {
		for (let property in this._behaviorStyles) {
			if (this._behaviorStyles.hasOwnProperty(property)) {
				this.resetBehaviorStyle(behaviorName, property);
			}
		}
	}

	_batchUpdateBehaviors() {
		this._scheduledBatchUpdate = false;

		Scrollmeister.attachBehaviors(this, this._scheduledBehaviors.attach);
		this._scheduledBehaviors.attach = {};

		Scrollmeister.detachBehaviors(this, this._scheduledBehaviors.detach);
		this._scheduledBehaviors.detach = {};
	}
}
