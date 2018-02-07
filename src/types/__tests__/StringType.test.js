import StringType from 'types/StringType.js';

describe('parse', () => {
	test('returns the same thing', () => {
		expect(StringType.parse('Scrollmeister')).toBe('Scrollmeister');
	});
});

describe('stringify', () => {
	test('returns the same thing', () => {
		expect(StringType.stringify('Scrollmeister')).toBe('Scrollmeister');
	});
});
