// @flow

let plainNumberRegex = /^[\d.]+$/;
let ratioRegex = /^(\d+)\s*\/\s*(\d+)$/;

type Ratio = {
	num: number,
	value: string
};

export default {
	parse: function(value: string): Ratio {
		value = value.trim();

		let match = value.match(ratioRegex);
		let num;

		if (match) {
			num = parseInt(match[1], 10) / parseInt(match[2], 10);
			value = `${match[1]} / ${match[2]}`;
		} else {
			num = parseFloat(value);

			if (isNaN(num) || !plainNumberRegex.test(value)) {
				throw new Error(
					`The value "${value} does not look like a ratio. The syntax is "width / height", e.g. "1920 / 1080" or a number like "1.5".`
				);
			}
		}

		return {
			num: num,
			value: value
		};
	},
	stringify: function(value: Ratio): string {
		return value.value;
	}
};
