import BooleanType from 'types/BooleanType.js';

describe('parse', () => {
	test('true, yes, on and 1 are true', () => {
		expect(BooleanType.parse('true')).toBe(true);
		expect(BooleanType.parse('yes')).toBe(true);
		expect(BooleanType.parse('on')).toBe(true);
		expect(BooleanType.parse('1')).toBe(true);
	});

	test('is chill about whitespace', () => {
		let value = `
		   true
`;
		expect(BooleanType.parse(value)).toBe(true);
	});

	test('everything else is false', () => {
		expect(BooleanType.parse('false')).toBe(false);
		expect(BooleanType.parse('no')).toBe(false);
		expect(BooleanType.parse('off')).toBe(false);
		expect(BooleanType.parse('0')).toBe(false);
		expect(BooleanType.parse('')).toBe(false);
		expect(BooleanType.parse('foo')).toBe(false);
	});
});

describe('stringify', () => {
	test('stringifies', () => {
		expect(BooleanType.stringify(true)).toBe('true');
		expect(BooleanType.stringify(false)).toBe('false');
	});
});
