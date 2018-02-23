// @flow

export default {
	parse: function(value: string): boolean {
		return value.trim() === 'true';
	},
	stringify: function(value: boolean): string {
		return '' + value;
	}
};
