import StringType from 'types/StringType.js';

describe('parse', () => {
	test('returns the same thing', () => {
		expect(StringType.parse('Scrollmeister')).toBe('Scrollmeister');
	});

	test('trims whitespace', () => {
		let value = `
		   Scrollmeister
`;
		expect(StringType.parse(value)).toBe('Scrollmeister');
	});
});

describe('stringify', () => {
	test('returns the same thing', () => {
		expect(StringType.stringify('Scrollmeister')).toBe('Scrollmeister');
	});
});
