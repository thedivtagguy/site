<script lang="ts">
	import { type TableOfContentsItem, type TableOfContentsElements, melt } from '@melt-ui/svelte';

	export let tree: TableOfContentsItem[] = [];
	export let activeHeadingIdxs: number[];
	export let item: TableOfContentsElements['item'];
	export let level = 1;
</script>

<ul class="m-0 w-full py-2 list-none {level !== 1 ? 'pl-4' : ''}">
	{#if tree && tree.length}
		{#each tree as heading, i (i)}
			<li class="w-full px-4 transition-all has-[:a:data-[active]]:bg-red">
				<a
					use:melt={$item(heading.id)}
					href="#{heading.id}"
					class="inline-flex items-center font-semibold text-neutral/50 text-sm font-fira justify-center p-0 m-0 text-neutral-500 no-underline transition-all
             hover:!text-purple data-[active]:text-red"
				>
					<!--
              Along with the heading title, the original heading node
              is also passed down, so you can display headings
              however you want.
            -->
					{@html heading.node.innerHTML}
				</a>
				{#if heading.children && heading.children.length}
					<svelte:self tree={heading.children} level={level + 1} {activeHeadingIdxs} {item} />
				{/if}
			</li>
		{/each}
	{/if}
</ul>
