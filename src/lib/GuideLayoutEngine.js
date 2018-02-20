// @flow

export default class GuideLayoutEngine {
	guides: Array<{ name: string, width: number, position: number, leftPosition: number, rightPosition: number }>;
	requiredHeight: number;
	viewport: { width: number, height: number, outerWidth: number, outerHeight: number };

	constructor() {
		this.guides = [];
		this.requiredHeight = 0;
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

	doLayout(
		nodes: Array<{ layout: any }>,
		rawGuides: Array<{ name: string, position: number, width: { length: number, unit: string } }>,
		contentWidth: { length: number, unit: string }
	) {
		this._computeGuides(rawGuides, contentWidth);

		//First we invalidate all existing layout for each node so we know which ones we touched.
		//We need to know this to figure out if the dependencies of a given node have been updated yet.
		for (let i = 0; i < nodes.length; i++) {
			let node = nodes[i];

			node.layout.dirty = true;
		}

		this.requiredHeight = 0;

		let skippedNode;

		//We could do some fancy acyclic directed graph thing (our layout is not a tree) and use topological sorting.
		//But this is fast enough and easy to follow. We simply loop until all nodes have been updated, eventually resolving all dependencies.
		do {
			skippedNode = false;

			let didANewLayout = false;

			//I felt like using labels instead of moving stuff to a function ¯\_(ツ)_/¯.
			outer: for (let i = 0; i < nodes.length; i++) {
				let node = nodes[i];

				//We already computed layout for this node.
				if (!node.layout.dirty) {
					continue;
				}

				let dependencies = node.layout.props.dependencies;

				//Check if any of the dependencies is still dirty.
				for (let j = 0; j < dependencies.length; j++) {
					let otherNode = dependencies[j];

					if (otherNode.layout.dirty) {
						skippedNode = true;

						//We encountered a dirty dependency, there is no need to find a second one.
						//Just continue with the outer loop.
						continue outer;
					}
				}

				this._doNodeLayout(node, dependencies);

				//We found a layout we can compute, yay!
				node.layout.dirty = false;
				didANewLayout = true;

				//This node requires more height than the previous ones we've enountered.
				if (node.layout.requiredHeight > this.requiredHeight) {
					this.requiredHeight = node.layout.requiredHeight;
				}
			}

			if (nodes.length > 0 && !didANewLayout) {
				throw new Error(
					'The layout engine did a whole loop of just skipping. It seems like some dependencies cannot be resolved.'
				);
			}
		} while (skippedNode);
	}

	//This will attach the layout info directly to each dom node. No need for a lookup map.
	_doNodeLayout(node: { layout: any }, dependencies: Array<{ layout: any }>) {
		let layout = node.layout;
		let props = layout.props;
		let state = layout.state;
		let layoutMode = props.mode;

		layout.spacingTop = this.lengthToPixel(props.spacing.top);
		layout.spacingBottom = this.lengthToPixel(props.spacing.bottom);

		/*
		if (layoutMode === 'follower') {
			//A follower can have one or more leaders.
			//Here we normalize it to always have two, the top and bottom most.
			dependencies = Immutable.List([
				dependencies.minBy(function(leader) {
					return leader.get('top');
				}),
				dependencies.maxBy(function(leader) {
					return leader.get('bottom');
				})
			]);

			layout.set('leaderHeight', dependencies.get(1).get('bottom') - dependencies.get(0).get('top'));
		}
		*/

		//
		//left
		//

		if (props.guides.left === 'viewport') {
			layout.left = 0;
		} else {
			layout.left = this._getGuideByName(props.guides.left).leftPosition;
		}

		//
		//right + width
		//

		if (props.guides.right === 'viewport') {
			layout.right = this.viewport.width;
		} else {
			layout.right = this._getGuideByName(props.guides.right).rightPosition;
		}

		layout.width = layout.right - layout.left;

		//
		//height
		//

		if (props.height === 'auto') {
			layout.height = state.height;
		} else {
			layout.height = this.lengthToPixel(props.height, layout.width);
		}

		/*
		if (heightMode === 'ratio') {
			layout.set('height', layout.get('width') / item.get('heightRatio'));
		} else if (heightMode === 'length') {
			layout.set('height', this.lengthToPixel(item.get('heightLength')));
		} else if (heightMode === 'inherit') {
			layout.set('height', dependencies.last().get('outerBottom') - dependencies.get(0).get('outerTop'));
		} else if (heightMode === 'auto') {
			//"auto" means we query the DOM for the height.
			//This is something a normal "layout engine" wouldn't do, but we delegate some stuff do the browser.
			//In order for this to work we get a list of heights passed to this method.
			layout.set('height', intrinsicHeights.get(item.get('id'), this.viewportHeight));
		} else {
			throw new Error('Unknown height mode "' + heightMode + '"');
		}

		layout.set('outerHeight', layout.get('height') + layout.get('spacingTop') + layout.get('spacingBottom'));
		*/

		//
		//top
		//

		layout.outerTop = layout.top + layout.spacingTop;

		if (layoutMode === 'flow') {
			/*
			let predecessorBottom = 0;

			if (dependencies.length > 0) {
				predecessorBottom = dependencies
					.map(function(dependency) {
						return dependency.get('outerBottom');
					})
					.max();
			}

			layout.set('top', predecessorBottom + layout.get('spacingTop'));
			*/
			let predecessorBottom = 0;

			if (dependencies.length > 0) {
				predecessorBottom = dependencies[0].layout.outerBottom;
			}

			layout.top = predecessorBottom + layout.spacingTop;
		} /* else if (layoutMode === 'follower') {
			//When the follower is larger than the leader it follows the bottom of its leader, not the top.
			if (item.get('followerMode') === 'pin' && layout.get('outerHeight') > layout.get('leaderHeight')) {
				layout.set('top', dependencies.get(1).get('bottom') - layout.get('height') - layout.get('spacingBottom'));
			} else {
				layout.set('top', dependencies.get(0).get('top') + layout.get('spacingTop'));
			}
		} else if (layoutMode === 'attachment') {
			switch (item.get('attachmentAnchor')) {
				case 'top':
					layout.set('top', dependencies.get(0).get('top') + layout.get('spacingTop'));
					break;
				case 'center':
					layout.set(
						'top',
						(dependencies.get(0).get('top') + dependencies.get(0).get('bottom') - layout.get('height')) / 2 +
							layout.get('spacingTop') -
							layout.get('spacingBottom')
					);
					break;
				case 'bottom':
					layout.set('top', dependencies.get(0).get('bottom') - layout.get('height') - layout.get('spacingBottom'));
					break;
				default:
					throw new Error('Unknown attachment anchor "' + item.get('attachmentAnchor') + '"');
			}
		}

		layout.set('outerTop', layout.get('top') - layout.get('spacingTop'));
		*/

		//
		//bottom (for the sake of simpler to follow computations at later points)
		//

		layout.bottom = layout.height + layout.top;
		layout.outerBottom = layout.bottom + layout.spacingBottom;

		//
		//required height
		//

		/*
		if (layoutMode === 'follower') {
			layout.set('requiredHeight', 0);
		} else {
			layout.set('requiredHeight', layout.get('outerBottom'));
		}
		*/

		//
		//transform the scroll position
		//

		/*
		if (layoutMode === 'follower') {
			layout.set('transformTopPosition', this.createFollowerTopPositionTransformer(item, layout, dependencies));

			var progressAnchors = this.calculateProgressAnchors(item, layout, dependencies);

			layout
				.set('progressScrollStart', progressAnchors.progressScrollStart)
				.set('progressScrollDuration', progressAnchors.progressScrollDuration);

			layout.set('calculateScrollProgress', this.createFollowerScrollProgressCalculator(layout));
		} else if (layoutMode === 'attachment') {
			if (dependencies.get(0).has('transformTopPosition')) {
				layout.set('transformTopPosition', this.createNestedTopPositionTransformer(layout, dependencies.get(0)));
			}

			//If the parent is clipped, clip the attachment as well.
			if (dependencies.get(0).has('clipRect')) {
				layout.set('clipRect', dependencies.get(0).get('clipRect'));
			}
		}
		*/

		//
		//clipping
		//

		/*
		if (item.get('clip')) {
			if (layoutMode === 'follower') {
				layout.set(
					'clipRect',
					Immutable.Map({
						top: dependencies.get(0).get('top'),
						bottom: dependencies.get(1).get('bottom'),
						height: layout.get('leaderHeight')
					})
				);
			} else {
				layout.set(
					'clipRect',
					Immutable.Map({
						top: layout.get('top'),
						bottom: layout.get('bottom'),
						height: layout.get('height')
					})
				);
			}
		}

		if (item.get('appear') && item.get('appear').size > 0) {
			layout.set('calculateAppear', this.createAppearCalculator(item, dependencies, layout));
		}
		*/
	}

	_computeGuides(
		rawGuides: Array<{ name: string, position: number, width: { length: number, unit: string } }>,
		contentWidth: { length: number, unit: string }
	) {
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

	_getGuideByName(
		name: string
	): { name: string, width: number, position: number, leftPosition: number, rightPosition: number } {
		for (let i = 0; i < this.guides.length; i++) {
			let guide = this.guides[i];

			if (guide.name === name) {
				return guide;
			}
		}

		throw new Error(`Looks like you've used a guide called "${name}" without defining it.`);
	}
}
