// @flow

export default {
	parse: function(value: string, context: HTMLElement): { template: string, value: string } {
		value = value.trim();

		let script;

		if (value === 'auto') {
			script = (context.getElementsByTagName('script')[0]: HTMLScriptElement);
		} else {
			let element = document.getElementById(value);

			if (element instanceof HTMLScriptElement) {
				script = element;
			} else {
				throw new Error(`The shader "${value}" is not the ID of a <script> element.`);
			}
		}

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
