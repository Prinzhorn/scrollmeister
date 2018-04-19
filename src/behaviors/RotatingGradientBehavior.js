// @flow

import Behavior from 'behaviors/Behavior.js';

export default class RotatingGradientBehavior extends Behavior {
	static get behaviorSchema(): any {
		return {
			speed: {
				type: 'number',
				default: '1'
			},
			offset: {
				type: 'number',
				default: '40'
			}
		};
	}

	static get behaviorName(): string {
		return 'rotating-gradient';
	}

	static get behaviorDependencies(): Array<string> {
		return ['interpolate'];
	}

	behaviorDidAttach() {
		this.connectTo('interpolate', interpolateBehavior => {
			let angle = interpolateBehavior.values.progress * this.props.speed * 360;
			let color1 = `hsl(${angle}, 100%, 50%)`;
			let color2 = `hsl(${angle + this.props.offset}, 100%, 50%)`;

			this.style.backgroundImage = `linear-gradient(${angle}deg, ${color1}, ${color2})`;

			this.notify();
		});
	}
}
