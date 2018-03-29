export default function(input) {
	return input.replace(/-([a-z])/g, match => match[1].toUpperCase());
}
