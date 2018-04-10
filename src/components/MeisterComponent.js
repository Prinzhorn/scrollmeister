// @flow

import raf from 'raf';

import BehaviorsStyleMerger from 'lib/BehaviorsStyleMerger.js';

import Scrollmeister from 'scrollmeister.js';

const invalidMarkupSelectors = [
	':not(scroll-meister) > element-meister',
	'scroll-meister * element-meister',
	'scroll-meister scroll-meister',
	'element-meister element-meister',
	'element-meister scroll-meister'
];

export default class ScrollMeisterComponent extends HTMLElement {
	behaviors: any;
	_behaviorsStyleMerger: BehaviorsStyleMerger;
	_scheduledBatchUpdate: boolean;
	_scheduledBehaviors: { attach: any, detach: any };
	_batchHandle: number;

	// Note: if you feel clever and think you can just define
	// the static `observedAttributes` getter on the super class: IE 9/10.

	// https://github.com/WebReflection/document-register-element/tree/7e2743d38f0bf01806cb9b76ba254f62f8cb24b2#v1-caveat
	// $FlowFixMe: Won't be fixed ;)
	constructor(_) {
		// $FlowFixMe: Won't be fixed ;)
		return (_ = super(_)).init(), _; // eslint-disable-line
	}

	init() {
		this.behaviors = {};

		this._behaviorsStyleMerger = new BehaviorsStyleMerger(this, Scrollmeister.getBehaviorOrder());

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
					'You have nested <scroll-meister> and <element-meister> elements in an unsupported way. <element-meister> elements need to always be direct children of <scroll-meister>.'
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

			Scrollmeister.detachBehavior(this, attr, true);
		}

		//TODO: Notify all behaviors that use types which depend on the DOM.
	}

	attributeChangedCallback(attr: string, oldValue: string | null, newValue: string | null) {
		if (newValue === null) {
			this._scheduledBehaviors.detach[attr] = true;
			delete this._scheduledBehaviors.attach[attr];
		} else {
			this._scheduledBehaviors.attach[attr] = newValue;
			delete this._scheduledBehaviors.detach[attr];
		}

		if (!this._scheduledBatchUpdate) {
			this._scheduledBatchUpdate = true;
			this._batchHandle = raf(this._batchUpdateBehaviors.bind(this));
		}
	}

	setBehaviorStyle(behaviorName: string, property: string, value: string | number) {
		this._behaviorsStyleMerger.setBehaviorStyle(behaviorName, property, value);
	}

	resetBehaviorStyle(behaviorName: string, property: string) {
		this._behaviorsStyleMerger.resetBehaviorStyle(behaviorName, property);
	}

	resetBehaviorStyles(behaviorName: string) {
		this._behaviorsStyleMerger.resetBehaviorStyles(behaviorName);
	}

	_batchUpdateBehaviors() {
		this._scheduledBatchUpdate = false;

		Scrollmeister.attachBehaviors(this, this._scheduledBehaviors.attach);
		this._scheduledBehaviors.attach = {};

		Scrollmeister.detachBehaviors(this, this._scheduledBehaviors.detach);
		this._scheduledBehaviors.detach = {};
	}
}
