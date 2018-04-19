// @flow

import Scrollmeister from 'scrollmeister.js';
import BehaviorsStyleMerger from 'lib/BehaviorsStyleMerger.js';

export default class ContentMeisterComponent extends HTMLElement {
	_behaviorsStyleMerger: BehaviorsStyleMerger;

	// https://github.com/WebReflection/document-register-element/tree/7e2743d38f0bf01806cb9b76ba254f62f8cb24b2#v1-caveat
	// $FlowFixMe: Won't be fixed ;)
	constructor(_) {
		// $FlowFixMe: Won't be fixed ;)
		return (_ = super(_)).init(), _; // eslint-disable-line
	}

	init() {
		this._behaviorsStyleMerger = new BehaviorsStyleMerger(this, Scrollmeister.getBehaviorOrder());
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
}
