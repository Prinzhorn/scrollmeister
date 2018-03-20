// @flow

export default {
	parse: function(value: string, element: HTMLElement): string {
		value = value.trim();

		const script = value === 'auto' ? element.getElementsByTagName('script')[0] : document.getElementById(value);

		if (!script) {
			throw new Error(`Could not find shader "${value}".`);
		}

		return {
			template: script.text,
			value: value
		};
	},
	stringify: function(value: { template: string, value: string }): string {
		return value.value;
	}
};
