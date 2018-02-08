// @flow

import GuideDefinitionType from 'types/GuideDefinitionType.js';
import CSSLengthType from 'types/CSSLengthType.js';

import Behavior from 'behaviors/Behavior.js';

import GuideLayoutEngine from 'lib/GuideLayoutEngine.js';

export default class LayoutBehavior extends Behavior {
	static get schema(): any {
		return {
			guides: {
				type: [GuideDefinitionType]
			},
			width: {
				type: CSSLengthType,
				default: '1400px'
			}
		};
	}

	static get dependencies(): Array<string> {
		return [];
	}

	static get behaviorName(): string {
		return 'layout';
	}

	attach() {
		this.engine = new GuideLayoutEngine();

		this.listenAndInvoke(window, 'resize', () => {
			let viewport = this._getViewport();
			this.engine.updateViewport(viewport);
			this.engine.doLayout(this.guides, this.width);
			this.emit('layout');
		});

		this.element.title = 'behavior did this 1';
	}

	detach() {
		this.element.title = 'clean af';
	}

	scroll() {}

	bam() {
		console.log('in yop face');
	}

	_getViewport(): { width: number, height: number, outerWidth: number, outerHeight: number } {
		var documentElement = document.documentElement;

		if (!documentElement) {
			throw new Error('There is no documentElement to get the size of.');
		}

		var originalOverflow = documentElement.style.overflowY;

		//Force a scrollbar to get the inner dimensions.
		documentElement.style.overflowY = 'scroll';

		var width = documentElement.clientWidth;
		var height = documentElement.clientHeight;

		//Force NO scrollbar to get the outer dimensions.
		documentElement.style.overflowY = 'hidden';

		var outerWidth = documentElement.clientWidth;
		var outerHeight = documentElement.clientHeight;

		//Restore overflow.
		documentElement.style.overflowY = originalOverflow;

		return {
			width,
			height,
			outerWidth,
			outerHeight
		};
	}
}

/*
class IndexedExampleSchemaBehavior extends Behavior {
	static get schema() {
		return {
			thing: {
				//thing: keyword
				//a.thing = 'keyword'
				type: StringType,
				type: {
					parse: function() {}
				},

				//thing: keyword, anotherone, and, more
				//a.thing = ['keyword', 'anotherone', 'and', 'more']
				type: [StringType],

				//thing: keyword 100px
				//a.thing = ['keyword', {length: 100, unit: 'px'}]
				type: [StringType, CSSLengthType],

				//thing: keyword 30px 30px, anotherone 100px 8px
				//a.thing = [['keyword', {length: 30, unit: 'px'}, {length: 30, unit: 'px'}], [...]];
				type: [GuideDefinitionType],
				type: [[StringType, CSSLengthType, CSSLengthType]]
			}
		};
	}
}

class NamedExampleSchemaBehavior extends Behavior {
	static get schema() {
		return {
			thing: {
				//thing: keyword
				//a.thing = 'keyword'
				type: StringType,
				type: {
					parse: function() {}
				},

				//thing: keyword, anotherone, and, more
				//a.thing = ['keyword', 'anotherone', 'and', 'more']
				type: [StringType],
				type: [
					{
						parse: function() {}
					}
				],

				//thing: keyword 100px
				//a.thing = {first: 'keyword', second: '100px'}
				type: [{ first: StringType }, { second: CSSLengthType }],
				type: [
					{
						first: { parse: function() {} }
					},
					{
						second: { parse: function() {} }
					}
				],

				//thing: keyword 30px 30px, anotherone 100px 8px
				type: [GuideDefinitionType],
				type: [
					{
						type: [
							{
								first: StringType
							},
							{
								second: CSSLengthType
							},
							{
								third: CSSLengthType
							}
						]
					}
				]
			}
		};
	}
}
*/
