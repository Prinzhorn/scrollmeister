// @flow

import Behavior from 'behaviors/Behavior.js';

import type LayoutBehavior from 'behaviors/LayoutBehavior.js';

export default class MediaBehavior extends Behavior {
	static get schema(): any {
		return {
			ratio: {
				type: 'ratio'
			},
			fit: {
				type: 'string',
				enum: ['fill', 'cover', 'contain'],
				default: 'cover'
			},
			position: {
				type: [{ x: 'csslength' }, { y: 'csslength' }],
				expand: function(rawProperties) {
					//Allow a single position and use it for both x and y.
					if (rawProperties.length === 1) {
						rawProperties.push(rawProperties[0]);
						return true;
					}

					return false;
				},
				default: '50% 50%'
			}
		};
	}

	static get behaviorName(): string {
		return 'media';
	}

	static get dependencies(): Array<string> {
		return ['^guidelayout', 'layout'];
	}

	attach() {
		this.connectTo('layout', this._render.bind(this));
	}

	detach() {
		let img = this.el.querySelector('img');
		let style = img.style;

		style.display = '';
		style.position = '';
		style.left = style.top = '';
		style.maxWidth = style.maxHeight = '';
		style.width = '';
		style.height = '';
		style.transform = '';
	}

	_render(layoutBehavior: LayoutBehavior) {
		//TODO: need a wrapper for overflow:hidden
		let layout = this.calculateMediaLayout(layoutBehavior);
		let img = this.el.querySelector('img');
		let style = img.style;

		style.display = 'block';
		style.position = 'absolute';
		style.left = style.top = 0;
		style.maxWidth = style.maxHeight = 'none';
		style.width = Math.round(layout.width) + 'px';
		style.height = Math.round(layout.height) + 'px';
		style.transform = `translate(${Math.round(layout.left)}px, ${Math.round(layout.top)}px)`;

		this.notify();
	}

	_calculateMediaSize(layoutBehavior: LayoutBehavior) {
		let ratio = this.props.ratio.num;
		let fit = this.props.fit;
		let { width, height } = layoutBehavior.layout;
		let containerRatio = width / height;

		if (fit !== 'fill') {
			if ((fit === 'contain' && containerRatio > ratio) || (fit === 'cover' && containerRatio < ratio)) {
				width = height * ratio;
			} else {
				height = width / ratio;
			}
		}

		return {
			width: width,
			height: height
		};
	}

	calculateMediaLayout(layoutBehavior: LayoutBehavior) {
		let layoutEngine = this.parentEl.guidelayout.engine;
		let size = this._calculateMediaSize(layoutBehavior);
		let fit = this.props.fit;
		let { width, height } = layoutBehavior.layout;
		let { x, y } = this.props.position;
		let focalPointX = layoutEngine.lengthToPixel(x, size.width);
		let focalPointY = layoutEngine.lengthToPixel(y, size.height);

		let left;
		let top;

		if (fit === 'cover') {
			//Center the focal point inside the container.
			left = width / 2 - focalPointX;
			top = height / 2 - focalPointY;

			//Make sure the media is still aligned with the edge of the container.
			//This means we move the focal point as close to the center as possible
			//without exposing the container behind it.
			left = Math.min(0, Math.max(width - size.width, left));
			top = Math.min(0, Math.max(height - size.height, top));
		} else {
			//TODO: position is relevant for contain as well.
			//For contain/stretch fit we center the media inside its container.
			left = width / 2 - size.width / 2;
			top = height / 2 - size.height / 2;
		}

		return {
			width: size.width,
			height: size.height,
			left: left,
			top: top
		};
	}
}
