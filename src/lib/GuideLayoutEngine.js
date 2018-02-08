// @flow

export default class GuideLayoutEngine {
	guides: Array<{ name: string, width: number, position: number, leftPosition: number, rightPosition: number }>;
	viewport: { width: number, height: number, outerWidth: number, outerHeight: number };

	constructor() {
		this.guides = [];
	}

	updateViewport(viewport: { width: number, height: number, outerWidth: number, outerHeight: number }) {
		this.viewport = viewport;
	}

	lengthToPixel(value: { length: number, unit: string }, percentageReference: ?number): number {
		switch (value.unit) {
			case 'px':
				return value.length;
			case 'vw':
				return value.length / 100 * this.viewport.width;
			case 'vh':
				return value.length / 100 * this.viewport.height;
			case 'vmin':
				return value.length / 100 * Math.min(this.viewport.width, this.viewport.height);
			case 'vmax':
				return value.length / 100 * Math.max(this.viewport.width, this.viewport.height);
			case '%':
				if (percentageReference == null) {
					throw new Error('To convert percentages to pixels a reference value needs to be specified.');
				}

				return percentageReference * (value.length / 100);
			default:
				throw new Error(`Unknown unit "${value.unit}" of length "${value.length}"`);
		}
	}

	doLayout(rawGuides: Array<{}>, contentWidth: { length: number, unit: string }) {
		console.log('did the layout');
		this._computeGuides(rawGuides, contentWidth);
	}

	//This will attach the layout info directly to each dom node. No need for a lookup map.
	_doItemLayout() {}

	_computeGuides(rawGuides: Array<{}>, contentWidth: { length: number, unit: string }) {
		let pixelWidth = this.lengthToPixel(contentWidth, this.viewport.width);

		//If the wrapper element does not have enough room, make it full width fluid.
		if (pixelWidth > this.viewport.width) {
			pixelWidth = this.viewport.width;
		}

		//This causes the content to be centered by shifting it to the right by half of the margin.
		let contentMargin = (this.viewport.width - pixelWidth) / 2;

		//Expand or collapse the guides array to the correct length.
		//This will eliminate the need for push() calls.
		this.guides.length = rawGuides.length;

		for (let guideIndex = 0; guideIndex < rawGuides.length; guideIndex++) {
			let rawGuide = rawGuides[guideIndex];

			//Reuse an existing guide object to make gc happy.
			//It doesn't matter if it was the same one, we will overwrite the properties anyway.
			let guide = this.guides[guideIndex];

			if (!guide) {
				guide = this.guides[guideIndex] = {};
			}

			guide.name = rawGuide.name;

			guide.width = this.lengthToPixel(rawGuide.width, pixelWidth);

			//The guide position is always expressed in percentages of the content width.
			//This is actually the CENTER position of the guide.
			guide.position = contentMargin + pixelWidth * rawGuide.position;

			//TODO: if the guide position is negative, it should calculate the offset from the right instead of the left.

			//The RIGHT edge, but the position where the LEFT guide would snap to.
			guide.leftPosition = guide.position + guide.width / 2;

			//The LEFT edge, but the position where the RIGHT guide would snap to.
			guide.rightPosition = guide.position - guide.width / 2;

			//This makes sure that guides very close to the edges don't get cut off with small viewports.
			//It's basically for the 0% and 100% guide
			//which otherwise would only use 50% of their width on small viewports
			//because the center of the guide would be aligned with the edge.
			if (guide.rightPosition < 0) {
				guide.rightPosition = 0;
				guide.leftPosition = guide.width;
				guide.position = guide.width / 2;
			} else if (guide.leftPosition > this.viewport.width) {
				guide.leftPosition = this.viewport.width;
				guide.rightPosition = guide.leftPosition - guide.width;
				guide.position = guide.leftPosition - guide.width / 2;
			}
		}
	}
}
