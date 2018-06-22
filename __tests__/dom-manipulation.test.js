const firstLayout = async () => {
	//Wait for Scrollmeister to do the first layout.
	await page.evaluate(() => {
		return new Promise(resolve => {
			document.querySelector('scroll-meister').addEventListener('guides-layout:change', resolve, false);
		});
	});
};

describe('DOM manipulation', () => {
	beforeAll(async () => {
		await page.exposeFunction('log', text => {
			console.log(text);
		});
	});

	beforeEach(async () => {
		await page.goto('http://localhost:4444/__tests__/dom-manipulation.test.html', {
			waitUntil: 'domcontentloaded'
		});
	});

	test('appendChild with flow elements', async () => {
		await firstLayout();

		await page.evaluate(() => {
			let wrapper = document.querySelector('scroll-meister');
			let element = document.createElement('element-meister');
			element.id = 'new';
			element.setAttribute('layout', 'height: 100px;');

			let promise = new Promise(resolve => {
				element.addEventListener('layout:change', resolve, false);
			});

			wrapper.appendChild(element);

			return promise;
		});

		let rects = await page.evaluate(() => {
			let elements = document.querySelectorAll('element-meister');
			return Array.from(elements).map(el => {
				return el.getBoundingClientRect().y;
			});
		});

		expect(rects).toEqual([0, 100, 200]);
	});

	test('insertBefore with flow elements', async () => {
		await firstLayout();

		await page.evaluate(() => {
			let wrapper = document.querySelector('scroll-meister');
			let element = document.createElement('element-meister');
			element.id = 'new';
			element.setAttribute('layout', 'height: 100px;');

			let promise = new Promise(resolve => {
				element.addEventListener('layout:change', resolve, false);
			});

			wrapper.insertBefore(element, wrapper.querySelector('element-meister'));

			return promise;
		});

		let rects = await page.evaluate(() => {
			let elements = document.querySelectorAll('element-meister');
			return Array.from(elements).map(el => {
				return el.getBoundingClientRect().y;
			});
		});

		expect(rects).toEqual([0, 100, 200]);
	});

	test('appendChild with interpolate and transform behaviors', async () => {
		await firstLayout();

		await page.evaluate(() => {
			let wrapper = document.querySelector('scroll-meister');
			let element = document.createElement('element-meister');
			element.id = 'new';
			element.setAttribute('layout', 'height: 100px;');
			element.setAttribute('interpolate', 'y: top 0, bottom: 100;');
			element.setAttribute('transform', '');

			let promise = new Promise(resolve => {
				wrapper.addEventListener('guides-layout:change', resolve, false);
			});

			wrapper.appendChild(element);

			return promise;
		});

		let y = await page.evaluate(() => {
			let element = document.querySelector('#new');
			return element.interpolate.values.y;
		});

		expect(y).toEqual(0);
	});
});
