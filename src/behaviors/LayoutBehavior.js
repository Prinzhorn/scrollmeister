// @flow

import ResizeObserver from 'resize-observer-polyfill';

import StringType from 'types/StringType.js';
import LayoutDependencyType from 'types/LayoutDependencyType.js';
import HeightType from 'types/HeightType.js';
import FollowerModeType from 'types/FollowerModeType.js';
import CSSLengthType from 'types/CSSLengthType.js';

import Behavior from 'behaviors/Behavior.js';

export default class DimensionsBehavior extends Behavior {
	static get schema(): any {
		return {
			guides: {
				type: [{ left: StringType }, { right: StringType }]
			},
			height: {
				type: HeightType,
				default: 'auto'
			},
			mode: {
				type: StringType.createEnum('mode', ['flow', 'follow']),
				default: 'flow'
			},
			followerMode: {
				type: StringType.createEnum('followerMode', ['none', 'parallax', 'pin']),
				default: 'none'
			},
			pinAnchor: {
				type: StringType.createEnum('pinAnchor', ['none', 'top', 'center', 'bottom']),
				default: 'none'
			},
			pinOffset: {
				type: CSSLengthType,
				default: '0'
			},
			dependencies: {
				type: LayoutDependencyType,
				default: 'inherit'
			},
			spacing: {
				type: [{ top: CSSLengthType }, { bottom: CSSLengthType }],
				//TODO: in cases like this we might want to accept "100vh" and automatically expand it to "100vh 100vh" (for arity 2 and 4).
				//When arity is 2, expand 100vh to 100vh 100vh. If it is 4, do the CSS dance.
				//E.g. 100vh 40vh expands to 100vh 40vh 100vh 40vh
				//and 100vh 30vh 40vh to 100vh 30vh 40vh 30vh
				//expand: true,
				//For now KISS
				default: '0 0'
			}
		};
	}

	static get behaviorName(): string {
		return 'layout';
	}

	static get dependencies(): Array<string> {
		return [];
	}

	attach() {
		this.state = {
			height: 0
		};

		this.element.innerHTML = 'bam';

		//Listen to the layout event of the layout behavior.
		//TODO: is gut? We can always refactor, but does this make sense though?
		//This means possibly hundreds of DimensionsBehaviors will react to this event.
		//We could instead reverse the responsibility and have the layout behavior
		//Call a method on each of the children.
		//Maybe we should just merge Dimensions+PositionBehavior because they belong together anyway.
		this.listen(document, 'guidelayout:layout', () => {
			this._render();
		});

		if (this.props.height === 'auto') {
			this._observeHeight();
		}
	}

	update(prevProps: {
		guides: Array<{ left: string, right: string }>,
		height: 'auto' | { length: number, unit: string },
		mode: 'flow' | 'follow',
		dependencies: string,
		followerMode: 'none' | 'parallax' | 'pin',
		pinAnchor: 'top' | 'center' | 'bottom',
		pinOffset: { length: number, unit: string },
		spacing: { top: { length: number, unit: string }, bottom: { length: number, unit: string } }
	}) {
		if (this.props.height !== prevProps.height) {
			if (this.props.height === 'auto') {
				this._observeHeight();
			} else if (prevProps.height === 'auto') {
				this._unobserveHeight();
			}
		}
	}

	detach() {
		this.element.innerHTML = 'clean af';
		this._unobserveHeight();
	}

	_observeHeight() {
		this._resizeObserver = new ResizeObserver(entries => {
			this.setState({
				height: entries[0].contentRect.height
			});
		});

		this._resizeObserver.observe(this.element);
	}

	_unobserveHeight() {
		if (this._resizeObserver) {
			this._resizeObserver.disconnect();
			this._resizeObserver = null;
		}
	}

	_render() {
		let style = this.element.style;

		style.transform = `translate3d(${Math.round(this.left)}px, ${Math.round(this.top)}px, 0)`;
		style.width = Math.round(this.width) + 'px';

		style.height = this.props.height === 'auto' ? 'auto' : Math.round(this.height) + 'px';
	}
}
