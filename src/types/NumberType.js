// @flow

const looksLikeANumberRegex = /^-?[\d.+]+$/;

export default {
	parse: function(value: string): number {
		value = value.trim();

		if (!looksLikeANumberRegex.test(value)) {
			throw new Error(`The value "${value}" does not look like a number.`);
		}

		let number = parseFloat(value);

		if (isNaN(number)) {
			throw new Error(`Could not parse "${value}" as a number.`);
		}

		return number;
	},
	stringify: function(value: string): string {
		return '' + value;
	}
};
