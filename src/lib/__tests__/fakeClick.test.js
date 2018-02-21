import fakeClick from 'lib/fakeClick.js';

describe('fakeClick', () => {
	test('triggers a click event when the touch distance was small enough', () => {
		const element = document.createElement('a');
		let clicked = false;

		element.addEventListener('click', () => {
			clicked = true;
		});

		fakeClick.start({
			target: element,
			changedTouches: [
				{
					clientX: 0,
					clientY: 0
				}
			]
		});

		fakeClick.end({
			target: element,
			changedTouches: [
				{
					clientX: 1,
					clientY: 1
				}
			]
		});

		expect(clicked).toBe(true);
	});

	test('does not trigger a click event when the touch distance was too large', () => {
		const element = document.createElement('a');

		element.addEventListener('click', () => {
			fail('there was click');
		});

		fakeClick.start({
			target: element,
			changedTouches: [
				{
					clientX: 0,
					clientY: 0
				}
			]
		});

		fakeClick.end({
			target: element,
			changedTouches: [
				{
					clientX: 100,
					clientY: 100
				}
			]
		});
	});

	test('does not trigger a click event on elements other than <a>', () => {
		const element = document.createElement('div');

		element.addEventListener('click', () => {
			fail('there was click');
		});

		fakeClick.start({
			target: element,
			changedTouches: [
				{
					clientX: 0,
					clientY: 0
				}
			]
		});

		fakeClick.end({
			target: element,
			changedTouches: [
				{
					clientX: 0,
					clientY: 0
				}
			]
		});
	});
});
