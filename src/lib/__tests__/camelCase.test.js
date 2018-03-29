import camelCase from 'lib/camelCase.js';

describe('camelCase', () => {
	test('camelCase', () => {
		//camelCase
		expect(camelCase('camel-case')).toBe('camelCase');
		//camelCase
		expect(camelCase('-webkit-camel-case')).toBe('WebkitCamelCase');
		//camelCase
		expect(camelCase('camel-case-')).toBe('camelCase-');
	});
});
