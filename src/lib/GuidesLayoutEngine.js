// @flow

import type { CSSLength } from 'types/CSSLengthType.js';

type RawGuide = {
	name: string,
	position: CSSLength,
	width: CSSLength
};

type Guide = {
	name: string,
	width: number,
	position: number,
	leftPosition: number,
	rightPosition: number
};

type Viewport = {
	width: number,
	height: number,
	outerWidth: number,
	outerHeight: number
};

type ScrollUpdate = {
	wrapperTop: number,
	wrapperHeight: number,
	wrapperBottom: number,
	contentTop: number,
	contentTopOffset: number,
	contentBottom: number,
	absoluteWrapperTop: number,
	absoluteContentTop: number,
	inCenter: boolean,
	inViewport: boolean,
	inExtendedViewport: boolean,
	wrapperTopChanged: boolean,
	inCenterChanged: boolean,
	inViewportChanged: boolean,
	inExtendedViewportChanged: boolean
};

type Layout = {
	dirty: boolean,
	spacingTop: number,
	spacingBottom: number,
	leaderTop: number,
	leaderHeight: number,
	left: number,
	right: number,
	width: number,
	height: number,
	outerHeight: number,
	top: number,
	outerTop: number,
	bottom: number,
	outerBottom: number,
	requiredHeight: number,
	transformTopPosition: ?Function,
	clipRect: ?{ top: number, bottom: number, height: number }
};

type Props = {
	guides: { left: 'string', right: 'string' },
	height: 'auto' | CSSLength,
	spacing: { top: CSSLength, bottom: CSSLength },
	mode: 'flow' | 'follow',
	followerMode: 'pin' | 'parallax',
	pinAnchor: 'top' | 'center' | 'bottom',
	pinOffset: CSSLength,
	clip: boolean,
	dependencies: {
		nodes: Array<Node>,
		value: string
	}
};

type Node = {
	layout: Layout,
	props: Props,
	intrinsicHeight: number
};

export default class GuidesLayoutEngine {
	guides: Array<Guide>;
	requiredHeight: number;
	fullscreenLayout: { left: number, top: number, width: number, height: number };
	viewport: Viewport;

	constructor() {
		this.guides = [];
		this.requiredHeight = 0;
		this.fullscreenLayout = {
			left: 0,
			top: 0,
			width: 0,
			height: 0
		};
	}

	updateViewport(viewport: Viewport) {
		this.viewport = viewport;
		this.fullscreenLayout = {
			left: 0,
			top: 0,
			width: viewport.outerWidth,
			height: viewport.outerHeight
		};
	}

	lengthToPixel(value: CSSLength, percentageReference: ?number): number {
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

	//E.g. calculate the scroll position when the element's anchor is at the anchor of the viewport.
	calculateAnchorPosition(node: Node, anchor: 'top' | 'center' | 'bottom', offset: number) {
		const { layout, props } = node;
		let position;
		let height;

		//TODO: for pin/parallax we basically need the reverse operation of transformTop()
		//Basically a function which, given a top position returns the scroll position when it is achieved.
		if (props.mode === 'follow') {
			position = layout.leaderTop;
			height = layout.leaderHeight;
		} else {
			position = layout.top;
			height = layout.height;
		}

		if (anchor === 'bottom') {
			position = position - this.viewport.height + height;
		} else if (anchor === 'center') {
			position = position - this.viewport.height / 2 + height / 2;
		}

		return position + offset;
	}

	doLayout(nodes: Array<Node>, rawGuides: Array<RawGuide>, contentWidth: CSSLength) {
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

				let dependencies = node.props.dependencies.nodes;

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

	//Does not return anything, instead we pass it an object that it fills.
	//This minimizes the amount of garbage we create on the hot path, we reuse this object.
	//This also has the nice side effect that we can make optimization by comparing to the previous scroll data.
	doScroll(layout: Layout, scrollPosition: number, scrollUpdate: ScrollUpdate) {
		let verticalCenter = this.viewport.height / 2;
		let contentHeight = layout.height;
		let prevWrapperTop = scrollUpdate.wrapperTop;
		let prevInCenter = scrollUpdate.inCenter;
		let prevInViewport = scrollUpdate.inViewport;
		let prevInExtendedViewport = scrollUpdate.inExtendedViewport;

		if (layout.transformTopPosition) {
			scrollUpdate.contentTop = layout.transformTopPosition(scrollPosition);
		} else {
			scrollUpdate.contentTop = layout.top - scrollPosition;
		}

		if (layout.clipRect) {
			scrollUpdate.wrapperTop = layout.clipRect.top - scrollPosition;
			scrollUpdate.wrapperHeight = layout.clipRect.height;
		} else {
			scrollUpdate.wrapperTop = scrollUpdate.contentTop;
			scrollUpdate.wrapperHeight = contentHeight;
		}

		scrollUpdate.wrapperBottom = Math.round(scrollUpdate.wrapperTop + scrollUpdate.wrapperHeight);
		scrollUpdate.contentBottom = Math.round(scrollUpdate.contentTop + contentHeight);

		//We round this here and not earlier because other calculations,
		//like wrapper/contentBottom need to be as accurate as possible.
		scrollUpdate.wrapperTop = Math.round(scrollUpdate.wrapperTop);
		scrollUpdate.contentTop = Math.round(scrollUpdate.contentTop);

		scrollUpdate.contentTopOffset = scrollUpdate.contentTop - scrollUpdate.wrapperTop;

		//Does the center of the viewport intersect with the element?
		scrollUpdate.inCenter = scrollUpdate.wrapperTop < verticalCenter && scrollUpdate.wrapperBottom > verticalCenter;

		//The extended viewport has three times the height of the normal viewport (+1 at the top and bottom).
		//It's used for lazy loading etc. before something enters the viewport.
		scrollUpdate.inExtendedViewport =
			scrollUpdate.wrapperTop < 2 * this.viewport.height && scrollUpdate.wrapperBottom > -this.viewport.height;

		//Optimization: there's no need to translate the item beyond the viewport.
		//"Park" it exactly at the edge.
		//This makes the difference between touching ~5 (visible) and ~100s (all) DOM items.
		//But we also return the absolute top position before parking it.

		scrollUpdate.absoluteWrapperTop = scrollUpdate.wrapperTop;
		scrollUpdate.absoluteContentTop = scrollUpdate.contentTop;

		//Top of the element below the viewport?
		if (scrollUpdate.wrapperTop >= this.viewport.height) {
			scrollUpdate.wrapperTop = this.viewport.height;
			scrollUpdate.contentTop = scrollUpdate.wrapperTop + scrollUpdate.contentTopOffset;
			scrollUpdate.inViewport = false;
		} else if (scrollUpdate.wrapperBottom <= 0) {
			//Bottom of the element above the viewport?
			scrollUpdate.wrapperTop = -Math.round(scrollUpdate.wrapperHeight);
			scrollUpdate.contentTop = scrollUpdate.wrapperTop + scrollUpdate.contentTopOffset;
			scrollUpdate.inViewport = false;
		} else {
			scrollUpdate.inViewport = true;
		}

		scrollUpdate.wrapperTopChanged = scrollUpdate.wrapperTop !== prevWrapperTop;
		scrollUpdate.inCenterChanged = scrollUpdate.inCenter !== prevInCenter;
		scrollUpdate.inViewportChanged = scrollUpdate.inViewport !== prevInViewport;
		scrollUpdate.inExtendedViewportChanged = scrollUpdate.inExtendedViewport !== prevInExtendedViewport;
	}

	//This will attach the layout info directly to each dom node. No need for a lookup map.
	_doNodeLayout(node: Node, dependencies: Array<Node>) {
		let { layout, props, intrinsicHeight } = node;
		let layoutMode = props.mode;

		layout.spacingTop = this.lengthToPixel(props.spacing.top);
		layout.spacingBottom = this.lengthToPixel(props.spacing.bottom);

		if (layoutMode === 'follow') {
			//A follower can have one or more leaders.
			//Here we normalize it to always have two, the top and bottom most.
			//These are the only two that are relevant for the follower.
			let topDependency = dependencies[0];
			let bottomDependency = topDependency;

			//We could use Array.reduce and create something like a minBy/maxBy.
			//But this gives us the min and max element with a simple single loop.
			for (let i = 0; i < dependencies.length; i++) {
				let otherNode = dependencies[i];

				//Found a new top node which is even higher than the current.
				if (otherNode.layout.top < topDependency.layout.top) {
					topDependency = otherNode;
				}

				//Found a new bottom node which is even lower than the current.
				if (otherNode.layout.bottom > bottomDependency.layout.bottom) {
					bottomDependency = otherNode;
				}
			}

			dependencies = [topDependency, bottomDependency];

			layout.leaderTop = topDependency.layout.top;
			layout.leaderHeight = bottomDependency.layout.bottom - topDependency.layout.top;
		}

		//
		//left
		//

		if (props.guides.left === 'viewport') {
			layout.left = 0;
		} else {
			//TODO: sort the guides. E.g. it shouldn't matter if you're using "left right" or "right left"
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
			layout.height = intrinsicHeight;
		} else {
			layout.height = this.lengthToPixel(props.height, layout.width);
		}

		layout.outerHeight = layout.height + layout.spacingTop + layout.spacingBottom;

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

		if (layoutMode === 'flow') {
			let predecessorBottom = 0;

			//Yes, we could Math.max.apply(Math, ) but what's wrong with this simple loop?
			for (let i = 0; i < dependencies.length; i++) {
				let otherNode = dependencies[i];

				if (otherNode.layout.outerBottom > predecessorBottom) {
					predecessorBottom = otherNode.layout.outerBottom;
				}
			}

			layout.top = predecessorBottom + layout.spacingTop;
		} else if (layoutMode === 'follow') {
			//When the follower is larger than the leader it follows the bottom of its leader, not the top.
			if (props.followerMode === 'pin' && layout.outerHeight > layout.leaderHeight) {
				layout.top = dependencies[1].layout.bottom - layout.height - layout.spacingBottom;
			} else {
				layout.top = dependencies[0].layout.top + layout.spacingTop;
			}
		}

		layout.outerTop = layout.top + layout.spacingTop;

		/* else if (layoutMode === 'follow') {
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

		if (layoutMode === 'flow') {
			layout.requiredHeight = layout.outerBottom;
		} else {
			layout.requiredHeight = 0;
		}

		//
		//transform the scroll position
		//

		if (layoutMode === 'follow') {
			layout.transformTopPosition = this._createFollowerTopPositionTransformer(layout, props);
		}
		/*
			let progressAnchors = this.calculateProgressAnchors(item, layout, dependencies);

			layout
				.set('progressScrollStart', progressAnchors.progressScrollStart)
				.set('progressScrollDuration', progressAnchors.progressScrollDuration);

			layout.set('calculateScrollProgress', this.createFollowerScrollProgressCalculator(layout));
			*7
		}

		/*
		if (layoutMode === 'follow') {
			layout.set('transformTopPosition', this.createFollowerTopPositionTransformer(item, layout, dependencies));

			let progressAnchors = this.calculateProgressAnchors(item, layout, dependencies);

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

		if (props.clip && layoutMode === 'follow') {
			//Reuse the object.
			if (!layout.clipRect) {
				layout.clipRect = {
					top: 0,
					bottom: 0,
					height: 0
				};
			}

			layout.clipRect.top = dependencies[0].layout.top;
			layout.clipRect.bottom = dependencies[1].layout.bottom;
			layout.clipRect.height = layout.leaderHeight;
		} else {
			delete layout.clipRect;
		}

		/*
		if (item.get('appear') && item.get('appear').size > 0) {
			layout.set('calculateAppear', this.createAppearCalculator(item, dependencies, layout));
		}
		*/
	}

	//Parallax and pinning is achieved by simply transforming the top position for those (follower-) elements.
	_createFollowerTopPositionTransformer(layout: Layout, props: Props) {
		if (props.followerMode === 'pin') {
			let pinTopPosition;

			//Calculate the spacing from top of the viewport (where the pinned element will be positioned).
			switch (props.pinAnchor) {
				case 'top':
					pinTopPosition = 0;
					break;
				case 'center':
					pinTopPosition = (this.viewport.height - layout.height) / 2;
					break;
				case 'bottom':
					pinTopPosition = this.viewport.height - layout.height;
					break;
				default:
					throw new Error(`Unknown pinAnchor "${props.pinAnchor}".`);
			}

			//The scroll position at which the element starts being pinned and does not move anymore.
			let pinStartScroll = layout.top - pinTopPosition;

			let pinDuration = Math.abs(layout.leaderHeight - layout.outerHeight);
			let pinStopScroll = pinStartScroll + pinDuration;

			return (scrollPosition: number): number => {
				let transformedTop;

				//Pinning hasn't started, scroll normally.
				if (scrollPosition < pinStartScroll) {
					transformedTop = layout.top - scrollPosition;
				} else if (scrollPosition < pinStopScroll) {
					//Pinning is currently happening.
					transformedTop = pinTopPosition;
				} else {
					//Pinning is finished, scroll normally plus the amount it was pinned.
					transformedTop = layout.top - scrollPosition + pinDuration;
				}

				return Math.round(transformedTop);
			};
		} else if (props.followerMode === 'parallax') {
			//The distance the leader and the follower need to travel inside the viewport
			//from top-bottom to bottom-top.
			let leaderScrollDistance = this.viewport.height + layout.leaderHeight;
			let scrollDistance = this.viewport.height + layout.outerHeight;

			//The follower needs to move a little slower/faster than 1.0
			//to travel the viewport in the same time the leader does.
			let speedFactor = scrollDistance / leaderScrollDistance;

			//This is the scroll position where the outer top spacing of the
			//follower enters the viewport. It's not necessarily visible then
			//as you need to scroll for a bit (spacingTop) before it actually enters.
			let enterScroll = layout.outerTop - this.viewport.height;

			return (scrollPosition: number): number => {
				//The distance the follower would have travelled from the bottom of the viewport
				//at a speed of 1.0.
				let distanceTravelled = scrollPosition - enterScroll;

				return this.viewport.height + layout.spacingTop - distanceTravelled * speedFactor;
			};
		}
	}

	_computeGuides(rawGuides: Array<RawGuide>, contentWidth: CSSLength) {
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

			let position = this.lengthToPixel(rawGuide.position, pixelWidth);

			//The position can be negative, which simply means it is rtl (similar to how a negative slice() index works).
			if (position >= 0) {
				guide.position = contentMargin + position;
			} else {
				guide.position = contentMargin + pixelWidth + position;
			}

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
