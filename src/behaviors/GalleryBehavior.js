// @flow

import linearPartition from 'linear-partitioning';

import Behavior from 'behaviors/Behavior.js';
import LayoutBehavior from 'behaviors/LayoutBehavior.js';

export default class GalleryBehavior extends Behavior {
	static get behaviorSchema(): any {
		return {
			spacing: {
				type: 'csslength',
				default: '1vmin'
			},
			height: {
				type: 'csslength',
				default: '33vh'
			},
			minHeight: {
				type: 'csslength',
				default: '150px'
			}
		};
	}

	static get behaviorName(): string {
		return 'gallery';
	}

	static get behaviorDependencies(): Array<string> {
		return ['layout'];
	}

	behaviorDidAttach() {
		this._items = Array.prototype.slice.call(this.el.querySelectorAll('img[width][height]')).map(image => {
			return {
				image,
				ratio: image.getAttribute('width') / image.getAttribute('height')
			};
		});

		this.connectTo('layout', this._render.bind(this));
	}

	_render(layoutBehavior: LayoutBehavior) {
		let layoutEngine = this.parentEl.guidesLayout.engine;
		let { viewport } = layoutEngine;
		let spacing = layoutEngine.lengthToPixel(this.props.spacing, 0);
		let height = layoutEngine.lengthToPixel(this.props.height, viewport.height);
		let minHeight = layoutEngine.lengthToPixel(this.props.minHeight, viewport.height);
		let availableWidth = layoutBehavior.layout.width;
		let targetHeight = Math.max(minHeight, height);
		let totalWidth = this._items.reduce((sum, { ratio }) => {
			return sum + ratio * targetHeight;
		}, 0);
		let rows = Math.max(1, Math.round(totalWidth / availableWidth));
		let layout = this._balancedLayout(this._items, availableWidth, rows, spacing);

		this.contentStyle.height = layout.requiredHeight + 'px';

		for (let i = 0; i < layout.items.length; i++) {
			let imageLayout = layout.items[i];
			let style = imageLayout.image.style;

			style.position = 'absolute';
			style.left = style.top = '0px';
			//style.transition = 'width 0.3s ease-in-out, height 0.3s ease-in-out, transform 0.3s ease-in-out';
			style.width = imageLayout.width + 'px';
			style.height = imageLayout.height + 'px';
			// $FlowFixMe: WebkitTransform and msTransform are missing in CSSStyleDeclaration
			style.transform = style.WebkitTransform = style.msTransform = `translate(${imageLayout.left}px, ${
				imageLayout.top
			}px)`;
		}
	}

	//Inspired by https://medium.com/@jtreitz/the-algorithm-for-a-perfectly-balanced-photo-gallery-914c94a5d8af
	_balancedLayout(
		items: Array<{ image: HTMLImageElement, ratio: number }>,
		availableWidth: number,
		rows: number,
		spacing: number
	) {
		let weights = items.map(a => a.ratio);
		let partition = linearPartition(weights, Math.min(items.length, rows));
		let imageLayouts = [];
		let imageIndexOffset = 0;
		let topOffset = spacing;

		partition.forEach(row => {
			let itemsForThisRow = items.slice(imageIndexOffset, imageIndexOffset + row.length);
			let summedRatios = itemsForThisRow.reduce((sum, { ratio }) => {
				return sum + ratio;
			}, 0);
			let rowHeight = (availableWidth - (row.length + 1) * spacing) / summedRatios;
			let leftOffset = spacing;

			itemsForThisRow.forEach(image => {
				let width = rowHeight * image.ratio;

				//TODO: reuse the this._items array and objects.
				imageLayouts.push({
					image: image.image,
					width: Math.round(width),
					height: Math.round(rowHeight),
					left: Math.round(leftOffset),
					top: Math.round(topOffset)
				});

				leftOffset = leftOffset + width + spacing;
			});

			topOffset = topOffset + rowHeight + spacing;

			imageIndexOffset = imageIndexOffset + row.length;
		});

		return {
			requiredHeight: Math.round(topOffset),
			items: imageLayouts
		};
	}
}
