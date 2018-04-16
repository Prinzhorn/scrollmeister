// @flow

import Behavior from 'behaviors/Behavior.js';

export default class SignalsBehavior extends Behavior {
	static get behaviorSchema(): any {
		return {
			signals: {
				type: [
					//TODO: add an optional `targetElement` with a (dom)type of `selector`.
					[{ eventName: 'string' }, { targetBehavior: 'string' }, { signalName: 'string' }, { signalData: 'string' }]
				]
			}
		};
	}

	static get behaviorName(): string {
		return 'signals';
	}

	static get behaviorDependencies(): Array<string> {
		return [];
	}

	behaviorDidAttach() {
		//TODO: this is just some prototype
		for (let i = 0; i < this.props.signals.length; i++) {
			let signalConfig = this.props.signals[i];

			this.listen(signalConfig.eventName, () => {
				//TODO: check if this thing actually has the behavior and if it has onSignal
				this.el[signalConfig.targetBehavior].onSignal(signalConfig.signalName, signalConfig.signalData);
			});
		}
	}

	update() {
		//TODO: clean up all the events and set them up new
	}
}
