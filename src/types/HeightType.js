// @flow

import CSSLengthType from 'types/CSSLengthType.js';

let ratioRegex = /^(\d+)\s*\/\s*(\d+)$/;

export default {
	parse: function(value: string): 'auto' | { length: number, unit: string } {
		value = value.trim();

		if (value === 'auto') {
			return value;
		} else {
			let match = value.match(ratioRegex);

			if (match) {
				//E.g. "16/9" is the same as "56.25%". Just some sugar.
				return {
					length: 100 * (parseInt(match[2], 10) / parseInt(match[1], 10)),
					unit: '%'
				};
			} else {
				return CSSLengthType.parse(value);
			}
		}
	},
	stringify: function(value: 'auto' | { length: number, unit: string }): string {
		if (value === 'auto') {
			return value;
		} else {
			//Parsing turns ratios into percentages. We do not try to do the opposite.
			//Finding nominator/denominator for arbitrary floats is no fun.
			return CSSLengthType.stringify(value);
		}
	}
};
