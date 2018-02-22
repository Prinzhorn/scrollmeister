// @flow

export default {
	parse: function(value: string): string {
		return value.trim() === 'true';
	},
	stringify: function(value: string): string {
		return '' + value;
	}
};
