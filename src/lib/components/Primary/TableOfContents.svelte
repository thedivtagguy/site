<script lang="ts">
	import Tree from './TableOfContentsTree.svelte';
	import { createTableOfContents } from '@melt-ui/svelte';
	export let selector = 'article';
	const {
		elements: { item },
		states: { activeHeadingIdxs, headingsTree }
	} = createTableOfContents({
		activeType: 'all',
		selector: selector
	});
</script>

<aside class="sticky top-0 overflow-y-auto rounded-lg">
	<nav>
		{#key $headingsTree}
			<Tree tree={$headingsTree} activeHeadingIdxs={$activeHeadingIdxs} {item} />
		{/key}
	</nav>
</aside>
