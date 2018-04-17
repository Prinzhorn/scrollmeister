import Scrollmeister from 'scrollmeister.js';

const $ = document.querySelector.bind(document);

describe('content wrapping', () => {
	test('wraps texts nodes', () => {
		document.body.innerHTML = `
			<scroll-meister>
				<element-meister id="a">test</element-meister>
			</scroll-meister>
		`;

		let element = $('element-meister');
		Scrollmeister.wrapContents(element);

		expect(element.innerHTML).toBe('<content-meister>test</content-meister>');
	});

	test('wraps a single element', () => {
		document.body.innerHTML = `
			<scroll-meister>
				<element-meister id="a">
					<div>all the single ladies</div>
				</element-meister>
			</scroll-meister>
		`;

		let element = $('element-meister');
		Scrollmeister.wrapContents(element);

		expect(element.innerHTML).toBe(`<content-meister>
					<div>all the single ladies</div>
				</content-meister>`);
	});

	test('wraps multiple elements', () => {
		document.body.innerHTML = `
			<scroll-meister>
				<element-meister id="a">
					test
					<span>foo</span>
					bar
					<h1>baz</h1>
				</element-meister>
			</scroll-meister>
		`;

		let element = $('element-meister');
		Scrollmeister.wrapContents(element);

		expect(element.innerHTML).toBe(`<content-meister>
					test
					<span>foo</span>
					bar
					<h1>baz</h1>
				</content-meister>`);
	});
});
