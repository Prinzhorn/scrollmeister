// @flow

const units = ['px', 'vw', 'vh', 'vmin', 'vmax', '%'];
const unitRegex = new RegExp('[\\d.](' + units.join('|') + ')$');

export default {
	parse: function(value: string): { length: number, unit: string } {
		value = value.trim();

		//Special unit-less value.
		if (value === '0') {
			return {
				length: 0,
				unit: 'px'
			};
		}

		let unitMatch = value.match(unitRegex);
		let length = parseFloat(value);

		if (!unitMatch) {
			throw new Error(
				`The value "${value}" uses a unit that is not supported by Scrollmeister. Supported units are ${units.join(
					', '
				)}.`
			);
		}

		if (isNaN(length)) {
			throw new Error(`Could not parse "${value}" as a number.`);
		}

		return {
			length: length,
			unit: unitMatch[1]
		};
	},
	stringify: function(value: { length: number, unit: string }): string {
		return '' + value.length + value.unit;
	}
};

export type CSSLength = {
	length: number,
	unit: 'px' | 'vw' | 'vh' | 'vmin' | 'vmax' | '%'
};
