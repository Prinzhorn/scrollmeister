// @flow

import ResizeObserver from 'resize-observer-polyfill';

import StringType from 'types/StringType.js';
import HeightType from 'types/HeightType.js';

import Behavior from 'behaviors/Behavior.js';

export default class DimensionsBehavior extends Behavior {
	static get schema(): any {
		return {
			guides: {
				type: [{ leftName: StringType }, { rightName: StringType }]
			},
			height: {
				type: HeightType,
				default: '100vh'
			}
		};
	}

	static get behaviorName(): string {
		return 'dimensions';
	}

	static get dependencies(): Array<string> {
		return [];
	}

	attach() {
		this.element.innerHTML = 'bam';
		console.log(this.guides.leftName, this.height);

		if (this.height === 'auto') {
			this._observeHeight();
		}
	}

	update(prev: {
		guides: Array<{ leftName: string, rightName: string }>,
		height: 'auto' | { length: number, unit: string }
	}) {
		if (this.height !== prev.height) {
			if (this.height === 'auto') {
				this._observeHeight();
			} else if (prev.height === 'auto') {
				this._unobserveHeight();
			}
		}

		//This will bubble up and tell everyone we've just changed dimensions.
		this.emit('change');
	}

	detach() {
		this.element.innerHTML = 'clean af';
		this._unobserveHeight();
	}

	_observeHeight() {
		console.log('_observeHeight');

		this._resizeObserver = new ResizeObserver(entries => {
			this.emit('intrinsicheightchange', entries[0].contentRect.height);
		});

		this._resizeObserver.observe(this.element);
	}

	_unobserveHeight() {
		console.log('_unobserveHeight');

		if (this._resizeObserver) {
			this._resizeObserver.disconnect();
			this._resizeObserver = null;
		}
	}
}
