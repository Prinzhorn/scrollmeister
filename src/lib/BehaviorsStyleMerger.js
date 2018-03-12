import Scrollmeister from 'scrollmeister.js';

export default class BehaviorsStyleMerger {
	constructor(element) {
		this._styles = {};
		this.el = element;
	}

	setBehaviorStyle(behaviorName, property, value) {
		if (!this._styles.hasOwnProperty(property)) {
			this._styles[property] = {};
		}

		//Remember that the given behavior just set this style.
		this._styles[property][behaviorName] = value;

		this.applyBehaviorStyle(property);
	}

	//TODO: we need a consistent order.
	//I was literally about to use Scrollmeister.getBehaviorOrder to make the order of applying consistent.
	applyBehaviorStyle(property) {
		if (property === 'transform') {
			let transforms = [];

			//Collect all transforms across all behaviors.
			for (let behaviorName in this._styles[property]) {
				if (this._styles[property].hasOwnProperty(behaviorName)) {
					transforms.push(this._styles[property][behaviorName]);
				}
			}

			if (transforms.length > 0) {
				this.el.style[property] = this.el.style.WebkitTransform = this.el.style.msTransform = transforms.join(' ');
			} else {
				this.el.style[property] = '';
			}

			return;
		} else if (property === 'opacity') {
			let combinedOpacity = 1;

			//Multiply all opacity across all behaviors.
			for (let behaviorName in this._styles[property]) {
				if (this._styles[property].hasOwnProperty(behaviorName)) {
					combinedOpacity *= this._styles[property][behaviorName];
				}
			}

			this.el.style[property] = combinedOpacity;
		} else {
			let hasProperty = false;

			for (let behaviorName in this._styles[property]) {
				if (this._styles[property].hasOwnProperty(behaviorName)) {
					this.el.style[property] = this._styles[property][behaviorName];

					if (hasProperty) {
						throw new Error(
							`The "${property}" property was set by multiple behaviors (${Object.keys(this._styles[property]).join(
								', '
							)}) but it cannot be merged.`
						);
					}

					hasProperty = true;
				}
			}

			//No behavior had a style for this property. Reset it completely.
			if (!hasProperty) {
				this.el.style[property] = '';
			}
		}
	}

	resetBehaviorStyle(behaviorName, property) {
		if (this._styles.hasOwnProperty(property) && this._styles[property].hasOwnProperty(behaviorName)) {
			delete this._styles[property][behaviorName];
			this.applyBehaviorStyle(property);
		}
	}

	resetBehaviorStyles(behaviorName) {
		for (let property in this._styles) {
			this.resetBehaviorStyle(behaviorName, property);
		}
	}
}
