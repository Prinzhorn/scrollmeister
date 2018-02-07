import StringType from 'types/StringType.js';
import CSSLengthType from 'types/CSSLengthType.js';
import Behavior from 'behaviors/Behavior.js';

const GuideDefinitionType = {
	type: [{ name: String }, { left: Number }, { width: Number }]
};

export default class LayoutBehavior extends Behavior {
	static get schema() {
		return {
			guides: {
				type: [[StringType, CSSLengthType, CSSLengthType]]
			},
			width: {
				type: CSSLengthType,
				default: '1400px'
			},
			widths: {
				type: [CSSLengthType],
				default: '1400px, 500px'
			}
		};
	}

	static get dependencies() {
		return [];
	}

	attach() {
		this.element.title = 'behavior did this 1';
	}

	detach() {
		this.element.title = 'clean af';
	}

	scroll() {}

	bam() {
		console.log('in yop face');
	}
}

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
