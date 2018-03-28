// @flow

let ratioRegex = /^(\d+)\s*\/\s*(\d+)$/;

type Ratio = {
	num: number,
	value: string
};

export default {
	parse: function(value: string): Ratio {
		value = value.trim();

		let match = value.match(ratioRegex);

		if (!match) {
			throw new Error(
				`The value "${value} does not look like a ratio. The syntax is "width / height", e.g. "1920 / 1080".`
			);
		}

		return {
			num: parseInt(match[1], 10) / parseInt(match[2], 10),
			value: value
		};
	},
	stringify: function(value: Ratio): string {
		return value.value;
	}
};
