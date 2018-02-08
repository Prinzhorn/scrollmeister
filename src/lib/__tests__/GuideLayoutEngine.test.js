import GuideLayoutEngine from 'lib/GuideLayoutEngine.js';

const units = ['px', 'vw', 'vh', 'vmin', 'vmax', '%'];
const viewport = {
	width: 800,
	height: 600,
	outerWidth: 900,
	outerHeight: 700
};

describe('lengthToPixel', () => {
	let engine = new GuideLayoutEngine();
	engine.updateViewport(viewport);

	test('converts pixels', () => {
		expect(engine.lengthToPixel({ length: 100, unit: 'px' })).toBe(100);
	});

	test('converts all the viewport units', () => {
		expect(engine.lengthToPixel({ length: 50, unit: 'vw' })).toBe(viewport.width / 2);
		expect(engine.lengthToPixel({ length: 50, unit: 'vh' })).toBe(viewport.height / 2);
		expect(engine.lengthToPixel({ length: 50, unit: 'vmin' })).toBe(viewport.height / 2);
		expect(engine.lengthToPixel({ length: 50, unit: 'vmax' })).toBe(viewport.width / 2);
	});

	test('converts percentages', () => {
		expect(engine.lengthToPixel({ length: 50, unit: '%' }, 1000)).toBe(500);
	});

	test('percentages require a reference', () => {
		expect(() => {
			engine.lengthToPixel({ length: 50, unit: '%' });
		}).toThrow();
	});

	test('rejects unknown units', () => {
		expect(() => {
			engine.lengthToPixel({ length: 50, unit: 'apples' });
		}).toThrow();
	});
});
