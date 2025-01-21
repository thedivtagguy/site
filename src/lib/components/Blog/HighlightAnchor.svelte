<!-- HighlightAnchor.svelte -->
<script>
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	// Store for currently highlighted element
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
					// Add anchorHighlight class
					targetElement.classList.add('anchorHighlight');
					highlightedElement = targetElement;

					// Set timeout to remove anchorHighlight after animation
					timeoutId = setTimeout(() => {
						targetElement.classList.remove('anchorHighlight');
						highlightedElement = null;
					}, 2000); // Adjust timing as needed
				}
			}
		};

		// Listen for hash changes and anchor clicks
		window.addEventListener('hashchange', handleAnchorClick);

		// Handle initial load if there's a hash
		if (window.location.hash) {
			handleAnchorClick();
		}

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
