const container = document.createElement('div');

//Offscreen container.
container.style.cssText = `
	width: 0;
	height: 0;
	overflow: hidden;
	position: fixed;
	bottom: -100px;
	right: -100px;
	opacity:0;
	pointer-events:none;
`;

export default function(node) {
	const line = node.cloneNode(true);
	container.appendChild(line);

	//Force a single line of text.
	line.style.display = 'inline-block';
	line.style.whiteSpace = 'nowrap';

	//We set the font size to 100 to get our baseline width calculation.
	//This means we then know the width of the text when the font size is 100.
	line.style.fontSize = '100px';
	line.style.width = 'auto';

	node.parentNode.appendChild(container);
	let ratio = 100 / line.clientWidth;
	node.parentNode.removeChild(container);
	container.removeChild(line);

	return ratio;
}
