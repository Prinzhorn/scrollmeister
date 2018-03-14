export default class BehaviorsStyleMerger {
	constructor(element, order) {
		this.el = element;
		this.order = order;

		this._styles = {};
	}

	setBehaviorStyle(behaviorName, property, value) {
		if (!this._styles.hasOwnProperty(property)) {
			this._styles[property] = {};
		}

		//Remember that the given behavior just set this style.
		this._styles[property][behaviorName] = value;

		this._applyBehaviorStyle(property);
	}

	resetBehaviorStyle(behaviorName, property) {
		if (this._styles.hasOwnProperty(property) && this._styles[property].hasOwnProperty(behaviorName)) {
			delete this._styles[property][behaviorName];
			this._applyBehaviorStyle(property);
		}
	}

	resetBehaviorStyles(behaviorName) {
		for (let property in this._styles) {
			this.resetBehaviorStyle(behaviorName, property);
		}
	}

	//TODO: we need a consistent order.
	//I was literally about to use Scrollmeister.getBehaviorOrder to make the order of applying consistent.
	_applyBehaviorStyle(property) {
		if (property === 'transform') {
			let transforms = [];

			//Collect all transforms across all behaviors.
			for (let i = 0; i < this.order.length; i++) {
				let behaviorName = this.order[i];
				if (this._styles.transform.hasOwnProperty(behaviorName)) {
					transforms.push(this._styles.transform[behaviorName]);
				}
			}

			if (transforms.length > 0) {
				this.el.style.transform = this.el.style.WebkitTransform = this.el.style.msTransform = transforms.join(' ');
			} else {
				this.el.style.transform = '';
			}

			return;
		} else if (property === 'opacity') {
			let combinedOpacity = 1;

			//Multiply all opacity across all behaviors.
			for (let behaviorName in this._styles.opacity) {
				if (this._styles.opacity.hasOwnProperty(behaviorName)) {
					combinedOpacity *= this._styles.opacity[behaviorName];
				}
			}

			this.el.style.opacity = combinedOpacity;
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
}
