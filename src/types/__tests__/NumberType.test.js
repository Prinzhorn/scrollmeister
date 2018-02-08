import NumberType from 'types/NumberType.js';

describe('parse', () => {
	test('parses integers', () => {
		expect(NumberType.parse('100')).toBe(100);
	});

	test('parses floats', () => {
		expect(NumberType.parse('-100.5')).toBe(-100.5);
	});

	test('does not like things which are NaN', () => {
		expect(() => {
			NumberType.parse('five');
		}).toThrow();
	});

	test('does not like prefixes at all', () => {
		expect(() => {
			NumberType.parse('x100');
		}).toThrow();
	});

	test('does not like suffixes that parseFloat would accept', () => {
		expect(() => {
			NumberType.parse('100x');
		}).toThrow();
	});

	test('does not like malformed numbers', () => {
		expect(() => {
			NumberType.parse('...');
		}).toThrow();
	});

	test('is chill about whitespaces', () => {
		let value = `
		  -100.5
		`;

		expect(NumberType.parse(value)).toEqual(-100.5);
	});
});

describe('stringify', () => {
	test('turns the number into a string', () => {
		expect(NumberType.stringify(-100.5)).toBe('-100.5');
	});
});
