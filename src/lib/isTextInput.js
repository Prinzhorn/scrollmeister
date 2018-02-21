export default function(node) {
	if (node.tagName === 'TEXTAREA') {
		return true;
	}

	if (node.tagName === 'INPUT' && node.type === 'text') {
		return true;
	}

	return false;
}
