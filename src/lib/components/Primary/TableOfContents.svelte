<script lang="ts">
	import Tree from './TableOfContentsTree.svelte';
	import { createTableOfContents } from '@melt-ui/svelte';
	import { onMount } from 'svelte';

	export let selector = 'article';
	let visible = false;

	const {
		elements: { item },
		states: { activeHeadingIdxs, headingsTree }
	} = createTableOfContents({
		activeType: 'lowest',
		selector: selector
	});

	onMount(() => {
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
			{ rootMargin: '0px 0px -80% 0px' }
		);

		// Observe all headings in the article
		const headings = document.querySelectorAll(
			`${selector} h1, ${selector} h2, ${selector} h3, ${selector} h4, ${selector} h5, ${selector} h6`
		);
		headings.forEach((heading) => observer.observe(heading));

		return () => {
			headings.forEach((heading) => observer.unobserve(heading));
		};
	});
</script>

<aside class="toc-container float-right translate-x-[87%]">
	<p class="pb-2 text-sm font-semibold uppercase font-fira border-b border-base-300 mb-2">
		Contents
	</p>
	<nav class="toc-nav">
		{#key $headingsTree}
			<Tree tree={$headingsTree} activeHeadingIdxs={$activeHeadingIdxs} {item} />
		{/key}
	</nav>
</aside>

<style>
	.toc-container {
		position: sticky;
		top: 2rem;

		width: 250px;
		max-height: calc(100vh - 4rem);
		overflow-y: auto;
		background-color: white;
		border-radius: 0.5rem;
		border: 1px solid #e5e5e5;
		padding: 1rem;
		box-shadow: 0 2px 0 0 #2b2b2b;
		z-index: 10;

		transition:
			opacity 0.3s ease-in-out,
			visibility 0.3s ease-in-out;
		margin-left: -270px;
	}

	@media (max-width: 1200px) {
		.toc-container {
			display: none;
		}
	}
</style>
