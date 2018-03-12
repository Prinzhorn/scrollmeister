let container = document.createElement('div');

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

	//We set the font size to 100 to get our baseline width calculation
	//and then change the font proportionally to the width of the element.
	line.style.fontSize = '100px';
	line.style.width = 'auto';

	node.parentNode.appendChild(container);
	let perfectFontSize = 100 * node.clientWidth / line.clientWidth;
	node.parentNode.removeChild(container);
	container.removeChild(line);

	return perfectFontSize + 'px';
}
