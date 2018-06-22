const NUM_ITERATIONS = 100;
const NUM_BATCHES = 10;

describe('DOM fuzzing', () => {
	beforeAll(async () => {
		await page.exposeFunction('log', text => {
			//console.log(text);
		});
	});

	beforeEach(async () => {
		await page.goto('http://localhost:4444/__tests__/dom-manipulation.test.html', {
			waitUntil: 'domcontentloaded'
		});
	});

	test(
		'add / remove / shuffle all the things',
		async () => {
			await page.evaluate(
				(NUM_ITERATIONS, NUM_BATCHES) => {
					let wrapper = document.querySelector('scroll-meister');

					let addElements = numElements => {
						window.log(`addElements ${numElements}`);
						while (numElements-- > 0) {
							let element = document.createElement('element-meister');
							element.textContent = Math.random();
							element.setAttribute('layout', `height: ${numElements % 2 ? 'auto' : Math.random() * 1000 + 'px'};`);

							if (Math.random() > 0.5) {
								element.setAttribute('interpolate', 'y: top 0, bottom: 100;');
								element.setAttribute('transform', '');
							}

							if (numElements % 2 === 0) {
								wrapper.insertBefore(element, wrapper.children[Math.floor(Math.random() * wrapper.children.length)]);
							} else {
								wrapper.appendChild(element);
							}
						}
					};

					let removeElements = numElements => {
						window.log(`removeElements ${numElements}`);
						while (numElements > 0 && wrapper.children.length > 0) {
							numElements--;
							wrapper.removeChild(wrapper.children[Math.floor(Math.random() * wrapper.children.length)]);
						}
					};

					let shuffleElements = () => {
						window.log(`shuffleElements`);
						for (let i = 0; i < wrapper.children.length; i++) {
							wrapper.appendChild(wrapper.children[Math.floor(Math.random() * i)]);
						}
					};

					let fuzzPromise = new Promise(resolve => {
						let counter = 0;

						let timer = setInterval(() => {
							let operations = [];

							for (let i = 0; i < NUM_BATCHES; i++) {
								let rand = Math.random();

								if (rand < 1 / 3) {
									operations.push(addElements.bind(window, 1));
								} else if (rand < 2 / 3) {
									operations.push(removeElements.bind(window, 1));
								} else {
									operations.push(shuffleElements);
								}
							}

							console.time('op');
							for (let i = 0; i < operations.length; i++) {
								let op = operations[i];
								op();
							}
							console.timeEnd('op');

							console.log(counter);

							counter++;

							if (counter >= NUM_ITERATIONS) {
								clearInterval(timer);
								resolve();
							}
						}, 1);
					});

					return fuzzPromise;
				},
				NUM_ITERATIONS,
				NUM_BATCHES
			);
		},
		30 * 60 * 1000
	);
});
