// @flow

import Behavior from 'behaviors/Behavior.js';

export default class RotatingGradientBehavior extends Behavior {
	static get schema(): any {
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

	static get dependencies(): Array<string> {
		return ['interpolate'];
	}

	attach() {
		this.connectTo('interpolate', interpolateBehavior => {
			let angle = interpolateBehavior.values.progress * this.props.speed * 360;
			let color1 = `hsl(${angle}, 100%, 50%)`;
			let color2 = `hsl(${angle + this.props.offset}, 100%, 50%)`;

			this.el.style.backgroundImage = `linear-gradient(${angle}deg, ${color1}, ${color2})`;

			this.notify();
		});
	}

	detach() {
		this.el.style.backgroundImage = '';
	}
}
