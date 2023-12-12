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

export const formatDate = (date) => {
	const options = { day: 'numeric', month: 'long', year: 'numeric' };
	return new Date(date).toLocaleDateString('en-US', options);
};

export const getISTTime = () => {
	const now = new Date();

	// Convert to IST (UTC+5:30)
	const istOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
	const istTime = new Date(now.getTime() + istOffset);

	// Extract hours and minutes
	let hours = istTime.getUTCHours();
	let minutes = istTime.getUTCMinutes();

	// Format hours for AM/PM
	const ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0' + minutes : minutes;

	// Format IST time as "9:00 AM"
	return `${hours}:${minutes} ${ampm}`;
};
