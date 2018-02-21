import isTextInput from 'lib/isTextInput.js';

describe('isTextInput', () => {
	test('considers textareas text input', () => {
		const element = document.createElement('textarea');

		expect(isTextInput(element)).toBe(true);
	});

	test('considers input element of type text as text input', () => {
		const element = document.createElement('input');
		element.type = 'text';

		expect(isTextInput(element)).toBe(true);
	});

	test('does not consider radio buttons text input', () => {
		const element = document.createElement('input');
		element.type = 'radio';

		expect(isTextInput(element)).toBe(false);
	});
});
