let container = document.createElement('div');
let line = document.createElement('span');

//Offscreen container.
container.style.cssText = 'position:fixed;bottom:-100px;right:-100px;opacity:0;pointer-events:none;';

container.appendChild(line);

export default function(node) {
	line.innerHTML = node.innerHTML;
	line.style.cssText = window.getComputedStyle(node).cssText;

	//Force a single line of text.
	line.style.display = 'inline-block';
	line.style.whiteSpace = 'nowrap';

	//We set the font size to 100 to get our baseline width calculation
	//and then change the font proportionally to the width of the element.
	line.style.fontSize = '100px';
	line.style.width = 'auto';

	if (!container.parentNode) {
		document.body.appendChild(container);
	}

	let perfectFontSize = Math.round(100 * node.clientWidth / line.clientWidth);

	return perfectFontSize + 'px';
}
