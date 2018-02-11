import HeightType from 'types/HeightType.js';

describe('parse', () => {
	test('parses ratios into % units', () => {
		expect(HeightType.parse('16/9')).toEqual({
			length: 56.25,
			unit: '%'
		});
	});

	test('accepts the auto keyword', () => {
		expect(HeightType.parse('auto')).toBe('auto');
	});

	test('is chill about whitespaces around and inside the ratio', () => {
		let value = `
		   16
		       	/
		9
		`;
		expect(HeightType.parse(value)).toEqual({
			length: 56.25,
			unit: '%'
		});
	});

	test('is chill about whitespaces around the keyword', () => {
		let value = `
		   auto
		`;
		expect(HeightType.parse(value)).toBe('auto');
	});
});

describe('stringify', () => {
	test('accepts the auto keyword', () => {
		expect(HeightType.stringify('auto')).toBe('auto');
	});

	test('percentages do not turn back into ratios', () => {
		expect(
			HeightType.stringify({
				length: 56.25,
				unit: '%'
			})
		).toBe('56.25%');
	});
});
