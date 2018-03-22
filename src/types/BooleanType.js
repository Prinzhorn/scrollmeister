// @flow

export default {
	parse: function(value: string): boolean {
		value = value.trim();

		return value === 'true' || value === 'on' || value === 'yes' || value === '1';
	},
	stringify: function(value: boolean): string {
		return String(value);
	}
};
