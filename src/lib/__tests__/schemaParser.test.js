import schemaParser from 'lib/schemaParser.js';

function parseProperties({ schema, attr }) {
	const props = {};

	schemaParser.parseProperties(null, schema, attr, props);

	return props;
}

function expectSchemaToParseProps({ schema, attr, expectedProps }) {
	expect(parseProperties({ schema, attr })).toEqual(expectedProps);
}

function expectSchemaToStringifyProps({ schema, props, expectedString }) {
	let string = schemaParser.stringifyProperties(null, schema, props);
	expect(string).toBe(expectedString);
}

describe('parse', () => {
	test('parses a simple property', () => {
		expectSchemaToParseProps({
			schema: {
				simple: {
					type: 'csslength'
				}
			},
			attr: `
				simple: 100px;
			`,
			expectedProps: {
				simple: { length: 100, unit: 'px' }
			}
		});
	});

	test('uses the default when a simple property is missing', () => {
		expectSchemaToParseProps({
			schema: {
				simple: {
					type: 'csslength',
					default: '200px'
				}
			},
			attr: '',
			expectedProps: {
				simple: { length: 200, unit: 'px' }
			}
		});
	});

	test('enforces enum properties', () => {
		expect(() => {
			parseProperties({
				schema: {
					simple: {
						type: 'string',
						enum: ['foo', 'bar']
					}
				},
				attr: `
					simple: baz;
				`
			});
		}).toThrow();
	});

	test('parses a simple list', () => {
		expectSchemaToParseProps({
			schema: {
				list: {
					type: ['string']
				}
			},
			attr: `
				list: foo, bar, baz;
			`,
			expectedProps: {
				list: ['foo', 'bar', 'baz']
			}
		});
	});

	test('uses the default for lists', () => {
		expectSchemaToParseProps({
			schema: {
				list: {
					type: ['string'],
					default: 'foo, bar'
				}
			},
			attr: '',
			expectedProps: {
				list: ['foo', 'bar']
			}
		});
	});

	test('an empty string as default results in an empty array for lists', () => {
		expectSchemaToParseProps({
			schema: {
				list: {
					type: ['string'],
					default: ''
				}
			},
			attr: '',
			expectedProps: {
				list: []
			}
		});
	});

	test('named lists become objects', () => {
		expectSchemaToParseProps({
			schema: {
				namedList: {
					type: [{ first: 'string' }, { second: 'csslength' }]
				}
			},
			attr: 'namedList: foo 300px;',
			expectedProps: {
				namedList: {
					first: 'foo',
					second: { length: 300, unit: 'px' }
				}
			}
		});
	});

	test('named lists use the expander for missing keys', () => {
		expectSchemaToParseProps({
			schema: {
				namedList: {
					type: [{ first: 'csslength' }, { second: 'csslength' }],
					expand: function(rawProperties) {
						if (rawProperties.length === 1) {
							//Use the same value twice if only one is provided.
							rawProperties.push(rawProperties[0]);
							return true;
						}

						return false;
					}
				}
			},
			attr: 'namedList: 400px;',
			expectedProps: {
				namedList: {
					first: { length: 400, unit: 'px' },
					second: { length: 400, unit: 'px' }
				}
			}
		});
	});

	test('named lists use their default', () => {
		expectSchemaToParseProps({
			schema: {
				namedList: {
					type: [{ first: 'string' }, { second: 'csslength' }],
					default: 'foo 500px'
				}
			},
			attr: '',
			expectedProps: {
				namedList: {
					first: 'foo',
					second: { length: 500, unit: 'px' }
				}
			}
		});
	});

	test('nested lists become arrays of objects', () => {
		expectSchemaToParseProps({
			schema: {
				nestedList: {
					type: [[{ first: 'string' }, { second: 'csslength' }]]
				}
			},
			attr: 'nestedList: foo 400px, bar 500px;',
			expectedProps: {
				nestedList: [
					{
						first: 'foo',
						second: { length: 400, unit: 'px' }
					},
					{
						first: 'bar',
						second: { length: 500, unit: 'px' }
					}
				]
			}
		});
	});

	test('defaults work for nested lists', () => {
		expectSchemaToParseProps({
			schema: {
				nestedList: {
					type: [[{ first: 'string' }, { second: 'csslength' }]],
					default: 'foo 1200px, bar 1300px'
				}
			},
			attr: '',
			expectedProps: {
				nestedList: [
					{
						first: 'foo',
						second: { length: 1200, unit: 'px' }
					},
					{
						first: 'bar',
						second: { length: 1300, unit: 'px' }
					}
				]
			}
		});
	});

	test('an empty string as default for nested lists becomes an empty array', () => {
		expectSchemaToParseProps({
			schema: {
				nestedList: {
					type: [[{ first: 'string' }, { second: 'csslength' }]],
					default: ''
				}
			},
			attr: '',
			expectedProps: {
				nestedList: []
			}
		});
	});

	test('nested lists use the expander for missing keys', () => {
		expectSchemaToParseProps({
			schema: {
				nestedList: {
					type: [[{ first: 'string' }, { second: 'csslength' }, { third: 'csslength' }]],
					expand: function(rawProperties) {
						//Default the third value to 0.
						if (rawProperties.length === 2) {
							rawProperties.push('0');
							return true;
						}

						return false;
					}
				}
			},
			attr: 'nestedList: foo 600px, bar 700px 800px;',
			expectedProps: {
				nestedList: [
					{
						first: 'foo',
						second: { length: 600, unit: 'px' },
						third: { length: 0, unit: 'px' }
					},
					{
						first: 'bar',
						second: { length: 700, unit: 'px' },
						third: { length: 800, unit: 'px' }
					}
				]
			}
		});
	});

	test('parses multiple simple properties', () => {
		expectSchemaToParseProps({
			schema: {
				simple1: {
					type: 'csslength'
				},
				simple2: {
					type: 'csslength'
				}
			},
			attr: `
				simple1: 100px;
				simple2: 200px;
			`,
			expectedProps: {
				simple1: { length: 100, unit: 'px' },
				simple2: { length: 200, unit: 'px' }
			}
		});
	});

	test('complains when a property is missing', () => {
		expect(() => {
			parseProperties({
				schema: {
					simple1: {
						type: 'csslength'
					},
					simple2: {
						type: 'csslength'
					}
				},
				attr: `
					simple1: 100px;
				`
			});
		}).toThrow();
	});

	test('complains about unknown properties', () => {
		expect(() => {
			parseProperties({
				schema: {
					simple1: {
						type: 'csslength'
					}
				},
				attr: `
					simple1: 100px;
					foo: 200px;
				`
			});
		}).toThrow();
	});

	test('is cool with colons within values', () => {
		expectSchemaToParseProps({
			schema: {
				url: {
					type: 'string'
				}
			},
			attr: `
				url: https://www.example.com;
			`,
			expectedProps: {
				url: 'https://www.example.com'
			}
		});
	});

	test('trims all the white-space', () => {
		expectSchemaToParseProps({
			schema: {
				simple: {
					type: 'string'
				}
			},
			attr: `
				simple:
					foo
				;
			`,
			expectedProps: {
				simple: 'foo'
			}
		});
	});
});

describe('stringify', () => {
	test('stringifies a simple property', () => {
		expectSchemaToStringifyProps({
			schema: {
				simple: {
					type: 'csslength'
				}
			},
			props: {
				simple: { length: 100, unit: 'px' }
			},
			expectedString: 'simple: 100px;'
		});
	});

	test('stringifies a simple list', () => {
		expectSchemaToStringifyProps({
			schema: {
				list: {
					type: ['string']
				}
			},
			props: {
				list: ['foo', 'bar', 'baz']
			},
			expectedString: 'list: foo, bar, baz;'
		});
	});

	test('stringifies named lists', () => {
		expectSchemaToStringifyProps({
			schema: {
				namedList: {
					type: [{ first: 'string' }, { second: 'csslength' }]
				}
			},
			props: {
				namedList: {
					first: 'foo',
					second: { length: 300, unit: 'px' }
				}
			},
			expectedString: 'namedList: foo 300px;'
		});
	});

	test('stringifies nested lists', () => {
		expectSchemaToStringifyProps({
			schema: {
				nestedList: {
					type: [[{ first: 'string' }, { second: 'csslength' }]]
				}
			},
			props: {
				nestedList: [
					{
						first: 'foo',
						second: { length: 400, unit: 'px' }
					},
					{
						first: 'bar',
						second: { length: 500, unit: 'px' }
					}
				]
			},
			expectedString: 'nestedList: foo 400px, bar 500px;'
		});
	});

	test('stringifies multple simple properties', () => {
		expectSchemaToStringifyProps({
			schema: {
				simple1: {
					type: 'csslength'
				},
				simple2: {
					type: 'csslength'
				}
			},
			props: {
				simple1: { length: 100, unit: 'px' },
				simple2: { length: 200, unit: 'px' }
			},
			expectedString: 'simple1: 100px; simple2: 200px;'
		});
	});
});
