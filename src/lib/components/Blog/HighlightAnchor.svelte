<script>
	import { onMount } from 'svelte';

	let highlightedElement = null;
	let timeoutId = null;

	onMount(() => {
		// Function to handle hash change and clicking anchor links
		const handleAnchorClick = () => {
			// Clear any existing timeout
			if (timeoutId) {
				clearTimeout(timeoutId);
			}

			// Remove anchorHighlight from previous element
			if (highlightedElement) {
				highlightedElement.classList.remove('anchorHighlight');
			}

			// Get the hash without the #
			const hash = window.location.hash.slice(1);

			if (hash) {
				// Find the target element
				const targetElement = document.getElementById(hash);

				if (targetElement) {
					// Remove and re-add the class to trigger animation
					targetElement.classList.remove('anchorHighlight');
					// Force a reflow to ensure the animation triggers again
					void targetElement.offsetWidth;
					targetElement.classList.add('anchorHighlight');
					highlightedElement = targetElement;

					// Set timeout to remove anchorHighlight after animation
					timeoutId = setTimeout(() => {
						targetElement.classList.remove('anchorHighlight');
						highlightedElement = null;
					}, 2000);
				}
			}
		};

		// Listen for both hash changes and clicks on anchor links
		window.addEventListener('hashchange', handleAnchorClick);
		document.addEventListener('click', (e) => {
			if (e.target.matches('a[href^="#"]')) {
				handleAnchorClick();
			}
		});

		// Cleanup
		return () => {
			window.removeEventListener('hashchange', handleAnchorClick);
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	});
</script>

<style>
	:global(.blog-post *) {
		transition: background-color 0.3s ease-in-out;
	}
	:global(.anchorHighlight) {
		@apply bg-yellow;

		animation: highlightFade 2s cubic-bezier(0.4, 0, 0.2, 1);
	}

	@keyframes highlightFade {
		0% {
			background-color: transparent;
		}
		15% {
			background-color: #ffeb3b;
		}
		85% {
			background-color: #ffeb3b;
		}
		100% {
			background-color: transparent;
		}
	}
</style>
