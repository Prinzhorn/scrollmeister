import RatioType from 'types/RatioType.js';

describe('parse', () => {
	test('parses floats', () => {
		expect(RatioType.parse('1.77777')).toEqual({
			num: 1.77777,
			value: '1.77777'
		});
	});

	test('parses ratios into % units', () => {
		expect(RatioType.parse('16/9')).toEqual({
			num: 16 / 9,
			value: '16 / 9'
		});
	});

	test('is chill about whitespaces around the number', () => {
		let value = `
		   1.5
		`;
		expect(RatioType.parse(value)).toEqual({
			num: 1.5,
			value: '1.5'
		});
	});

	test('is chill about whitespaces around and inside the ratio', () => {
		let value = `
		   16
		       	/
		9
		`;
		expect(RatioType.parse(value)).toEqual({
			num: 16 / 9,
			value: '16 / 9'
		});
	});

	test('throws for anything that is not a float or ratio', () => {
		expect(() => {
			RatioType.parse('');
		}).toThrow();

		expect(() => {
			RatioType.parse('a / b');
		}).toThrow();

		expect(() => {
			RatioType.parse('16 / b');
		}).toThrow();

		expect(() => {
			RatioType.parse('a / 9');
		}).toThrow();

		expect(() => {
			RatioType.parse('1.x');
		}).toThrow();

		expect(() => {
			RatioType.parse('bogus');
		}).toThrow();
	});
});

describe('stringify', () => {
	test('it just returns whatever the value key contains', () => {
		expect(
			RatioType.stringify({
				value: '16 / 9'
			})
		).toBe('16 / 9');

		expect(
			RatioType.stringify({
				value: '4 / 3'
			})
		).toBe('4 / 3');
	});
});
