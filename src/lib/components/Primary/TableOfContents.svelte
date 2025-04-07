<script lang="ts">
	import Tree from './TableOfContentsTree.svelte';
	import { createTableOfContents } from '@melt-ui/svelte';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let selector = 'article';
	let visible = false;
	let isFirefox = false;

	const {
		elements: { item },
		states: { activeHeadingIdxs, headingsTree }
	} = createTableOfContents({
		activeType: 'lowest',
		selector: selector
	});

	onMount(() => {
		// Check if the browser is Firefox

		// Ensure the DOM is fully loaded before initializing the observer
		setTimeout(() => {
			const observer = new IntersectionObserver(
				(entries) => {
					// Find any heading that's in view
					const isHeadingVisible = entries.some(
						(entry) => entry.isIntersecting && entry.target.tagName.match(/^H[1-6]$/i)
					);

					if (isHeadingVisible) {
						visible = true;
					} else if (entries[0]?.boundingClientRect.top > 0) {
						// If we're above all headings
						visible = false;
					}
				},
				{
					rootMargin: '0px 0px -80% 0px',
					threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
				}
			);

			// Use a more specific selector to ensure we get all headings
			const headings = document.querySelectorAll(
				`${selector} h1, ${selector} h2, ${selector} h3, ${selector} h4, ${selector} h5, ${selector} h6`
			);

			if (headings.length > 0) {
				headings.forEach((heading) => observer.observe(heading));
			}

			return () => {
				headings.forEach((heading) => observer.unobserve(heading));
			};
		}, 100); // Small delay to ensure DOM is ready
	});
</script>

{#if !isFirefox}
	<aside class="toc-container">
		<p class="pb-2 text-sm font-semibold uppercase font-fira border-b border-base-300 mb-2">
			Contents
		</p>
		<nav class="toc-nav">
			{#key $headingsTree}
				<Tree tree={$headingsTree} activeHeadingIdxs={$activeHeadingIdxs} {item} />
			{/key}
		</nav>
	</aside>
{/if}

<style>
	.toc-container {
		position: relative;
		width: 220px;
		max-height: calc(100vh - 8rem);
		overflow-y: auto;
		background-color: white;
		border-radius: 0.5rem;
		border: 1px solid #e5e5e5;
		padding: 0.75rem;
		box-shadow: 0 2px 0 0 #2b2b2b;
		z-index: 10;
		transition:
			opacity 0.3s ease-in-out,
			visibility 0.3s ease-in-out;
	}

	@media (max-width: 1023px) {
		.toc-container {
			display: none;
		}
	}
</style>
