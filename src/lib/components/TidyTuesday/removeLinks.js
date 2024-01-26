export function unlink(element) {
	const links = element.querySelectorAll('a');
	links.forEach((link) => {
		const textNode = document.createTextNode(link.textContent);
		link.parentNode.replaceChild(textNode, link);
	});
}
