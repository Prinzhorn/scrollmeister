//property:value; pairs (separated by colons) separated by semicolons.
//TODO: if this isn't the perfect thing to write unit tests for then call me steve.
const propertiesAndValuesRegex = /([^:;]+):([^:;]+)/g;
const whiteSpaceRegex = /\s+/;

export default class Behavior {
	constructor(element, rawProperties) {
		this.element = element;

		this.parseProperties(rawProperties);
		this.attach();
	}

	//TODO: This might not belong to the behavior itself but to the schemas/types folder.
	parseProperties(rawProperties) {
		const schema = this.constructor.schema;
		const rawPropertiesMap = {};
		const properties = {};
		let match;

		propertiesAndValuesRegex.lastIndex = 0;

		while ((match = propertiesAndValuesRegex.exec(rawProperties)) !== null) {
			let property = match[1].trim();
			let rawValue = match[2];

			if (!schema.hasOwnProperty(property)) {
				throw new Error(
					`You have defined a property "${property}" that "${this.constructor
						.name}" is not expecting. The value was "${rawValue}".`
				);
			}

			rawPropertiesMap[property] = rawValue;
		}

		for (let key in schema) {
			if (!schema.hasOwnProperty(key)) {
				continue;
			}

			if (!rawPropertiesMap.hasOwnProperty(key)) {
				//The schema specifies a property that is currently not defined and no default was specified.
				//TODO: does that imply they are all required? What if falsy properties are OK?
				if (!schema[key].hasOwnProperty('default')) {
					throw new Error(
						`You are missing the ${key} property, which has no default value specified for the ${this.constructor
							.name} class.`
					);
				} else {
					//There is a default specified, use it.
					properties[key] = this.parseProperty(key, schema[key].default, schema[key].type);
					continue;
				}
			}

			properties[key] = this.parseProperty(key, rawPropertiesMap[key], schema[key].type);
			console.log(JSON.stringify(properties[key], null, 4));
		}
	}

	/*
	const GuideDefinition = {
		type: [{ name: String }, { left: Number }, { width: Number }]
	};

	type: [GuideDefinition]

	type: [{
		type: [{ name: String }, { left: Number }, { width: Number }]
	}]
	*/

	parseProperty(property, rawValue, propertyType) {
		if (propertyType instanceof Array) {
			//thing: keyword, anotherone, and, more
			//a.thing = ['keyword', 'anotherone', 'and', 'more']
			//or
			//thing: keyword 30px 30px, anotherone 100px 8px
			//a.thing = [['keyword', {length: 30, unit: 'px'}, {length: 30, unit: 'px'}], [...]];
			if (propertyType.length === 1) {
				propertyType = propertyType[0];

				if (propertyType instanceof Array) {
					let rawValuesList = rawValue.split(',');

					return rawValuesList.map((rawValue, index) => {
						return this.parseProperty(property, rawValue, propertyType);
					});
				} else {
					//thing: keyword, anotherone, and, more
					//a.thing = ['keyword', 'anotherone', 'and', 'more']
					let rawValuesList = rawValue.split(',');

					return rawValuesList.map(rawValue => {
						return propertyType.parse(rawValue);
					});
				}
			} else if (propertyType.length > 1) {
				//thing: keyword 100px
				//a.thing = ['keyword', {length: 100, unit: 'px'}]
				let rawValuesList = rawValue.trim().split(whiteSpaceRegex);

				if (rawValuesList.length !== propertyType.length) {
					throw new Error(
						`The schema for the "${property}" property of the "${this.constructor
							.name}" class expects ${propertyType.length} values. Got ${rawValuesList.length}, namely "${rawValuesList.join(
							' '
						)}".`
					);
				}

				return rawValuesList.map((rawValue, index) => {
					return propertyType[index].parse(rawValue);
				});
			} else {
				throw new Error(
					`You have defined an empty array as schema type for the "${property}"" property of the "${this.constructor
						.name}" class.`
				);
			}
		} else {
			//thing: keyword
			//a.thing = 'keyword'
			return propertyType.parse(rawValue);
		}
	}

	attach() {
		throw new Error(`You need to implement the attach() method for your "${this.constructor.name}" class.`);
	}
}
