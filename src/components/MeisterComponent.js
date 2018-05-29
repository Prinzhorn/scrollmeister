// @flow

import raf from 'raf';

import Scrollmeister from 'scrollmeister.js';
import BehaviorsStyleMerger from 'lib/BehaviorsStyleMerger.js';

const invalidMarkupSelectors = [
	':not(scroll-meister) > element-meister',
	'scroll-meister * element-meister',
	'scroll-meister scroll-meister',
	'element-meister element-meister',
	'element-meister scroll-meister'
];

export default class MeisterComponent extends HTMLElement {
	behaviors: any;
	_behaviorsStyleMerger: BehaviorsStyleMerger;
	_scheduledBatchUpdate: boolean;
	_scheduledBehaviors: {};
	_batchHandle: number;

	//Polyfill (modern browsers have this).
	get isConnected(): boolean {
		if (!document.body) {
			return false;
		}

		return document.body.contains(this);
	}

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
		this._scheduledBehaviors = {};
	}

	connectedCallback() {
		//This happens when a disconnected element (e.g. document.createElement) gets attributes before being inserted.
		//We will then update the behaviors as soon as it is connected.
		if (this._scheduledBatchUpdate && !this._batchHandle) {
			this._batchHandle = raf(this._batchUpdateBehaviors.bind(this));
		}

		Scrollmeister.componentConnected(this);

		if (process.env.NODE_ENV !== 'production') {
			//Make some sanity checks on the markup for UX.
			raf(() => {
				if (document.querySelector(invalidMarkupSelectors.join(','))) {
					this.renderError(
						new Error(
							'You have nested <scroll-meister> and <element-meister> elements in an unsupported way. <element-meister> elements need to always be direct children of <scroll-meister>.'
						)
					);
				}
			});
		}
	}

	disconnectedCallback() {
		//This happens when the element is moved inside the DOM using sth. like insertBefore.
		//In this case we will just ignore the disconnectedCallback, because the Node is not actually disconnected.
		//It is safe to leave the behaviors attached, because stuff like nextSibling and parentElement are defined.
		//A connectedCallback will follow right away.
		//https://twitter.com/WebReflection/status/984400317801476097
		if (this.isConnected) {
			return;
		}

		this._scheduledBatchUpdate = false;
		raf.cancel(this._batchHandle);
		delete this._batchHandle;

		Scrollmeister.detachAllBehaviors(this);

		Scrollmeister.componentDisconnected(this);
	}

	attributeChangedCallback(attr: string) {
		//Get rid of the condition, if any.
		attr = attr.split('_')[0];

		this._scheduledBehaviors[attr] = true;

		if (!this._scheduledBatchUpdate) {
			this._scheduledBatchUpdate = true;

			//Only update the behaviors if the element is actually connected.
			//Otherwise we'll do it in connectedCallback.
			if (this.isConnected) {
				this._batchHandle = raf(this._batchUpdateBehaviors.bind(this));
			}
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

	renderError(error: Error) {
		if (process.env.NODE_ENV !== 'production') {
			let el = this;
			let outerHTML = el.outerHTML;

			el.style.height = 'auto';
			el.style.position = 'static';

			//TODO: other behaviors might prevent the message from be seen, we need to completely halt Scrollmeister.
			//Maybe block all events (using process.env.NODE_ENV of course).
			el.innerHTML = `
				<div style="color: #721c24; background: #f8d7da; border: 1px solid #f5c6cb; margin: 10px; padding: 20px; border-radius: 5px;">
					<h1 style="color: inherit; font-size: 30px; padding: 0 0 20px 0; margin: 0;"></h1>
					<p style="color: inherit; font-size: 20px; padding: 0 0 20px 0; margin: 0;">
						<strong></strong>
					</p>
					<pre style="background: #eee; padding: 20px;"></pre>
				</div>
			`;

			// $FlowFixMe: Thank's flow, but I know these selectors will exist because of the line above.
			el.querySelector('h1').textContent = this.constructor.behaviorName;
			// $FlowFixMe: Thank's flow, but I know these selectors will exist because of the line above.
			el.querySelector('strong').textContent = error.message;
			// $FlowFixMe: Thank's flow, but I know these selectors will exist because of the line above.
			el.querySelector('pre').textContent = outerHTML;
		}
	}

	_batchUpdateBehaviors() {
		this._scheduledBatchUpdate = false;

		Scrollmeister.updateBehaviors(this, this._scheduledBehaviors);
		this._scheduledBehaviors = {};
	}
}
