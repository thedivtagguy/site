<script lang="ts">
	import { type TableOfContentsItem, type TableOfContentsElements, melt } from '@melt-ui/svelte';

	export let tree: TableOfContentsItem[] = [];
	export let activeHeadingIdxs: number[];
	export let item: TableOfContentsElements['item'];
	export let level = 1;
</script>

<ul class="m-0 w-full py-1 list-none {level !== 1 ? 'pl-4' : ''}">
	{#if tree && tree.length}
		{#each tree as heading, i (i)}
			<li class="w-full transition-all">
				<a
					use:melt={$item(heading.id)}
					href="#{heading.id}"
					class="inline-flex items-center py-1 text-xs font-archivo text-neutral-500 no-underline transition-all
                    hover:text-orange data-[active]:text-orange text-gray-500"
				>
					<!--
              Along with the heading title, the original heading node
              is also passed down, so you can display headings
              however you want.
            -->
					{heading.node.textContent}
				</a>
				{#if heading.children && heading.children.length}
					<svelte:self tree={heading.children} level={level + 1} {activeHeadingIdxs} {item} />
				{/if}
			</li>
		{/each}
	{/if}
</ul>
