import types from 'types';

//property:value; pairs (separated by colons) separated by semicolons.
const propertiesAndValuesRegex = /([^:;]+):([^;]+)/g;
const whiteSpaceRegex = /\s+/;

export default {
	parseProperties: function(element, schema, rawPropertiesList, props) {
		//TODO: instead of parsing them and putting them immediately on the behavior
		//I want to return an array which also knows about conditions.
		//This way we only need to parse the props once and as soon as the condition changes
		//we can do assign(props, propsM, propsXL, ...)
		//So basically it is something different if the attributes on the elemrnt change (rare)
		//or if the a condition changes (expected).
		for (let i = 0; i < rawPropertiesList.length; i++) {
			let rawProperties = rawPropertiesList[i];
			this._parseProperties(element, schema, rawProperties, props);
		}
	},

	_parseProperties(element, schema, rawProperties, props) {
		const rawPropertiesMap = {};
		let match;

		propertiesAndValuesRegex.lastIndex = 0;

		//Collect all "key:value;" pairs.
		while ((match = propertiesAndValuesRegex.exec(rawProperties)) !== null) {
			let property = match[1].trim();
			let rawValue = match[2];

			if (!schema.hasOwnProperty(property)) {
				throw new Error(
					`You have defined a property "${property}" in your attribute that is not expected. The value was "${rawValue}".`
				);
			}

			rawPropertiesMap[property] = rawValue;
		}

		for (let key in schema) {
			if (!schema.hasOwnProperty(key)) {
				continue;
			}

			let rawValue;

			if (rawPropertiesMap.hasOwnProperty(key)) {
				rawValue = rawPropertiesMap[key];
			} else {
				//The schema specifies a property that is currently not defined and no default was specified.
				//That implies that all properties are required. Keywords like "none" or "0" work well as defaults.
				if (!schema[key].hasOwnProperty('default')) {
					//TODO: this error message does not help people who only write HTML and don't even know what the class is.
					//It should simply be something like "The layout attribute misses the required guides property"
					//Don't get too technical.
					throw new Error(`You are missing the "${key}" property, which has no default value.`);
				} else {
					//There is a default specified, use it.
					rawValue = schema[key].default;
				}
			}

			let value = this.parseProperty(element, key, rawValue, schema[key].type, schema[key].expand);
			let enumValues = schema[key].enum;

			if (enumValues instanceof Array && enumValues.indexOf(value) === -1) {
				throw new Error(`Got "${value}" as value for property "${key}". Expected one of "${enumValues.join('", "')}".`);
			}

			props[key] = value;
		}
	},

	parseProperty: function(element, property, rawValue, propertyType, valueExpander) {
		rawValue = rawValue.trim();

		if (propertyType instanceof Array) {
			//thing: keyword, anotherone, and, more
			//a.thing = ['keyword', 'anotherone', 'and', 'more']
			//or
			//thing: keyword 30px 30px, anotherone 100px 8px
			//a.thing = [['keyword', {length: 30, unit: 'px'}, {length: 30, unit: 'px'}], [...]];
			if (propertyType.length === 1) {
				propertyType = propertyType[0];

				if (propertyType instanceof Array) {
					if (rawValue === '') {
						return [];
					}

					//thing: keyword 30px 30px, anotherone 100px 8px
					//a.thing = [['keyword', {length: 30, unit: 'px'}, {length: 30, unit: 'px'}], [...]];
					let rawValuesList = rawValue.split(',');

					return rawValuesList.map(rawValue => {
						return this.parseProperty(element, property, rawValue, propertyType, valueExpander);
					});
				} else {
					if (rawValue === '') {
						return [];
					}

					//thing: keyword, anotherone, and, more
					//a.thing = ['keyword', 'anotherone', 'and', 'more']
					let rawValuesList = rawValue.split(',');

					return rawValuesList.map(rawValue => {
						return types[propertyType].parse(rawValue, element);
					});
				}
			} else if (propertyType.length > 1) {
				//thing: keyword 100px
				//a.thing = ['keyword', {length: 100, unit: 'px'}]

				if (rawValue === '') {
					return [];
				}

				let rawValuesList = rawValue.split(whiteSpaceRegex);

				if (rawValuesList.length !== propertyType.length) {
					if (!valueExpander || !valueExpander(rawValuesList)) {
						throw new Error(
							`The schema for the "${property}" property expects ${propertyType.length} values. Got ${
								rawValuesList.length
							}, namely "${rawValuesList.join(' ')}".`
						);
					}
				}

				let map = {};

				for (let rawValueIndex = 0; rawValueIndex < rawValuesList.length; rawValueIndex++) {
					let namedPropertyType = propertyType[rawValueIndex];
					let keys = Object.keys(namedPropertyType);

					if (keys.length !== 1) {
						throw new Error('A nested schema should have exactly one key (the name) which maps to the type.');
					}

					let name = keys[0];
					let rawValue = rawValuesList[rawValueIndex];

					map[name] = types[namedPropertyType[name]].parse(rawValue, element);
				}

				return map;
			} else {
				//TODO: add a validateSchema method and remove the mix of validation and parsing all over this place.
				throw new Error(`You have defined an empty array as schema type for the "${property}" property.`);
			}
		} else {
			//thing: keyword
			//a.thing = 'keyword'
			return types[propertyType].parse(rawValue, element);
		}
	},

	stringifyProperties(element, schema, properties) {
		const stringifiedProps = [];

		for (let property in properties) {
			let value = properties[property];
			let propertyType = schema[property].type;
			let stringValue = this.stringifyProperty(element, value, propertyType);

			stringifiedProps.push(property + ': ' + stringValue);
		}

		return stringifiedProps.join('; ') + ';';
	},

	stringifyProperty(element, value, propertyType) {
		if (propertyType instanceof Array) {
			if (propertyType.length === 1) {
				let nestedPropertyType = propertyType[0];

				if (nestedPropertyType instanceof Array) {
					return value
						.map(value => {
							return this.stringifyProperty(element, value, nestedPropertyType);
						})
						.join(', ');
				} else {
					return value
						.map(value => {
							return types[nestedPropertyType].stringify(value, element);
						})
						.join(', ');
				}
			} else if (propertyType.length > 1) {
				return propertyType
					.map(type => {
						let key = Object.keys(type)[0];
						let typeName = type[key];
						return types[typeName].stringify(value[key]);
					})
					.join(' ');
			}
		} else {
			return types[propertyType].stringify(value, element);
		}
	}
};
