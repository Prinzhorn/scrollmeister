import types from 'types';

//property:value; pairs (separated by colons) separated by semicolons.
//TODO: if this isn't the perfect thing to write unit tests for then call me steve.
//TODO: a-frame allows stuff like "databaseURL: https://aframe-firebase-component.firebaseio.com;". So the left part should not be greedy to only search for the first colon.
//However, the right part should allow colons bruh. This also solves the issue with selectors like "target: .foo:not(bar)". The only reserved character is the semicolon.
const propertiesAndValuesRegex = /([^:;]+):([^;]+)/g;
const whiteSpaceRegex = /\s+/;

export default {
	parseProperties: function(element, schema, rawProperties, props) {
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

			let value = this.parseProperty(element, key, rawValue, schema[key].type);
			let enumValues = schema[key].enum;

			if (enumValues instanceof Array && enumValues.indexOf(value) === -1) {
				throw new Error(`Got "${value}" as value for property "${key}". Expected one of "${enumValues.join('", "')}".`);
			}

			props[key] = value;
		}
	},

	parseProperty: function(element, property, rawValue, propertyType) {
		if (propertyType instanceof Array) {
			//thing: keyword, anotherone, and, more
			//a.thing = ['keyword', 'anotherone', 'and', 'more']
			//or
			//thing: keyword 30px 30px, anotherone 100px 8px
			//a.thing = [['keyword', {length: 30, unit: 'px'}, {length: 30, unit: 'px'}], [...]];
			if (propertyType.length === 1) {
				propertyType = propertyType[0];

				if (propertyType instanceof Array) {
					//thing: keyword 30px 30px, anotherone 100px 8px
					//a.thing = [['keyword', {length: 30, unit: 'px'}, {length: 30, unit: 'px'}], [...]];
					let rawValuesList = rawValue.split(',');

					return rawValuesList.map((rawValue, index) => {
						return this.parseProperty(element, property, rawValue, propertyType);
					});
				} else {
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
				let rawValuesList = rawValue.trim().split(whiteSpaceRegex);

				if (rawValuesList.length !== propertyType.length) {
					//TODO: this is exactly the place to implement something like expanding shorthand properties.
					//e.g. "spacing: 100vh" expands to "spacing: 100vh 100vh".
					throw new Error(
						`The schema for the "${property}" property expects ${propertyType.length} values. Got ${
							rawValuesList.length
						}, namely "${rawValuesList.join(' ')}".`
					);
				}

				let map = {};

				for (let rawValueIndex = 0; rawValueIndex < rawValuesList.length; rawValueIndex++) {
					let namedPropertyType = propertyType[rawValueIndex];
					let keys = Object.keys(namedPropertyType);

					if (keys.length !== 1) {
						throw new Error(`A nested schema should have exactly one key (the name) which maps to the type.`);
					}

					let name = keys[0];
					let rawValue = rawValuesList[rawValueIndex];

					map[name] = types[namedPropertyType[name]].parse(rawValue, element);
				}

				return map;
			} else {
				throw new Error(`You have defined an empty array as schema type for the "${property}" property.`);
			}
		} else {
			//thing: keyword
			//a.thing = 'keyword'
			return types[propertyType].parse(rawValue, element);
		}
	}
};
