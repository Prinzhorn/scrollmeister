import CSSLengthType from 'types/CSSLengthType.js';

const units = ['px', 'vw', 'vh', 'vmin', 'vmax', '%'];

describe('parse', () => {
	test('parses all supported units', () => {
		units.forEach(unit => {
			expect(CSSLengthType.parse('100' + unit)).toEqual({
				length: 100,
				unit: unit
			});
		});
	});

	test('does not like unknown units, even if they are healthy', () => {
		expect(() => {
			CSSLengthType.parse('100apples');
		}).toThrow();
	});

	test('parses a unit-less zero', () => {
		expect(CSSLengthType.parse('0')).toEqual({
			length: 0,
			unit: 'px'
		});
	});

	test('does not like other unit-less numbers', () => {
		expect(() => {
			CSSLengthType.parse('100');
		}).toThrow();
	});

	test('is chill about whitespaces', () => {
		let value = `
		  100px
		`;

		expect(CSSLengthType.parse(value)).toEqual({
			length: 100,
			unit: 'px'
		});
	});

	test('is not overly chill about whitespaces', () => {
		expect(() => {
			CSSLengthType.parse('100 px');
		}).toThrow();
	});
});

describe('stringify', () => {
	test('concats length and value', () => {
		expect(CSSLengthType.stringify({ length: 100.5, unit: 'px' })).toBe('100.5px');
	});
});
