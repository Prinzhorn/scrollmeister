import BooleanType from 'types/BooleanType.js';

describe('parse', () => {
	test('true is true', () => {
		expect(BooleanType.parse('true')).toBe(true);
	});

	test('is chill about whitespace', () => {
		let value = `
		   true
`;
		expect(BooleanType.parse(value)).toBe(true);
	});

	test('everything else is false', () => {
		expect(BooleanType.parse('false')).toBe(false);
		expect(BooleanType.parse('foo')).toBe(false);
	});
});

describe('stringify', () => {
	test('stringifies', () => {
		expect(BooleanType.stringify(true)).toBe('true');
		expect(BooleanType.stringify(false)).toBe('false');
	});
});
