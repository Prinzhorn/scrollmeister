import LayoutDependenciesType from 'types/LayoutDependenciesType.js';

const $ = document.querySelector.bind(document);

function prepareZeBody(html) {
	document.body.innerHTML = html;

	for (let i = 0; i < document.body.children.length; i++) {
		let el = document.body.children[i];

		//Mock the layout behavior.
		//The LayoutDependenciesType only cares about the mode prop.
		el.layout = {
			id: i + 1,
			props: {
				mode: el.getAttribute('layout')
			}
		};
	}
}

describe('parse', () => {
	test('inherit', () => {
		prepareZeBody(`
			<div id="a" layout="flow"></div>
			<div id="b" layout="notflow"></div>
			<div id="c"></div>
		`);

		let value = LayoutDependenciesType.parse('inherit', $('#c'));

		expect(value.nodes.length).toBe(1);
		expect(value.nodes[0]).toBe($('#a').layout);
		expect(value.value).toBe('inherit');
	});

	test('skip 0', () => {
		prepareZeBody(`
			<div id="a" layout="flow"></div>
			<div id="b" layout="notflow"></div>
			<div id="c"></div>
		`);

		let value = LayoutDependenciesType.parse('inherit', $('#c'));

		expect(value.nodes.length).toBe(1);
		expect(value.nodes[0]).toBe($('#a').layout);
		expect(value.value).toBe('inherit');
	});

	test('skip 1', () => {
		prepareZeBody(`
			<div id="a" layout="flow"></div>
			<div id="b" layout="flow"></div>
			<div id="c"></div>
		`);

		let value = LayoutDependenciesType.parse('skip 1', $('#c'));

		expect(value.nodes.length).toBe(1);
		expect(value.nodes[0]).toBe($('#a').layout);
		expect(value.value).toBe('skip 1');
	});

	test('skip 2', () => {
		prepareZeBody(`
			<div id="a" layout="flow"></div>
			<div id="b" layout="flow"></div>
			<div id="c" layout="flow"></div>
			<div id="d"></div>
		`);

		let value = LayoutDependenciesType.parse('skip 2', $('#d'));

		expect(value.nodes.length).toBe(1);
		expect(value.nodes[0]).toBe($('#a').layout);
		expect(value.value).toBe('skip 2');
	});

	test('consume 2', () => {
		prepareZeBody(`
			<div id="a" layout="flow"></div>
			<div id="b" layout="flow"></div>
			<div id="c"></div>
		`);

		let value = LayoutDependenciesType.parse('consume 2', $('#c'));

		expect(value.nodes.length).toBe(2);
		expect(value.nodes.indexOf($('#a').layout)).not.toBe(-1);
		expect(value.nodes.indexOf($('#b').layout)).not.toBe(-1);
		expect(value.value).toBe('consume 2');
	});

	test('skip 1 consume 2', () => {
		prepareZeBody(`
			<div id="a" layout="flow"></div>
			<div id="b" layout="flow"></div>
			<div id="c" layout="flow"></div>
			<div id="d" layout="flow"></div>
			<div id="e"></div>
		`);

		let value = LayoutDependenciesType.parse('skip 1 consume 2', $('#e'));

		expect(value.nodes.length).toBe(2);
		expect(value.nodes.indexOf($('#b').layout)).not.toBe(-1);
		expect(value.nodes.indexOf($('#c').layout)).not.toBe(-1);
		expect(value.value).toBe('skip 1 consume 2');
	});

	test('selector', () => {
		prepareZeBody(`
			<div id="a" layout="flow"></div>
			<div id="b" layout="flow"></div>
			<div id="c"></div>
		`);

		let value = LayoutDependenciesType.parse('#a, #b', $('#c'));

		expect(value.nodes.length).toBe(2);
		expect(value.nodes[0]).toBe($('#a').layout);
		expect(value.nodes[1]).toBe($('#b').layout);
		expect(value.value).toBe('#a, #b');
	});
});

describe('stringify', () => {
	test('returns the same thing', () => {
		expect(LayoutDependenciesType.stringify({ value: 'skip 1' })).toBe('skip 1');
	});
});
