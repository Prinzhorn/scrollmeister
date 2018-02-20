// @flow

const parse = function(value: string): string {
	return value.trim();
};

const stringify = function(value: string): string {
	return value;
};

export default {
	parse: parse,
	stringify: stringify,
	createEnum: function(propertyName: string, values: Array<string>) {
		return {
			parse: function(value: string) {
				value = parse(value);

				if (values.indexOf(value) === -1) {
					throw new Error(
						`Got "${value}" as value for property "${propertyName}". Expected one of "${values.join('", "')}".`
					);
				}

				return value;
			},
			stringify: stringify
		};
	}
};
