export function lazyLoadVideo(node, videoSources) {
	// Function to load video
	function loadVideo() {
		videoSources.forEach((source) => {
			const sourceElement = document.createElement('source');
			sourceElement.src = source.src;
			sourceElement.type = source.type;
			node.appendChild(sourceElement);
		});
		node.load();
	}

	// Intersection Observer callback
	function onIntersection(entries, observer) {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				loadVideo();
				observer.unobserve(node);
			}
		});
	}

	// Create and use IntersectionObserver if available
	if ('IntersectionObserver' in window) {
		const observer = new IntersectionObserver(onIntersection);
		observer.observe(node);
	}

	// Clean up
	return {
		destroy() {
			if ('IntersectionObserver' in window) {
				observer.unobserve(node);
			}
		}
	};
}
