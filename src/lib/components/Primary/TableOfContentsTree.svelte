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
					class="inline-flex items-center py-1 text-xs font-archivo text-neutral no-underline transition-all
                    hover:text-orange data-[active]:text-orange data-[active]:font-medium relative"
				>
					<span class="toc-item-text">{heading.node.textContent}</span>
				</a>
				{#if heading.children && heading.children.length}
					<svelte:self tree={heading.children} level={level + 1} {activeHeadingIdxs} {item} />
				{/if}
			</li>
		{/each}
	{/if}
</ul>

<style>
	li {
		position: relative;
	}

	a {
		display: flex;
		width: 100%;
		position: relative;
		padding-left: 0.25rem;
	}

	a:hover::before {
		content: '';
		position: absolute;
		left: -0.25rem;
		top: 50%;
		transform: translateY(-50%);
		width: 4px;
		height: 0.75rem;
		background-color: #ffa94d;
		border-radius: 1px;
	}

	a[data-active]::before {
		content: '';
		position: absolute;
		left: -0.25rem;
		top: 50%;
		transform: translateY(-50%);
		width: 4px;
		height: 100%;
		background-color: #ffa94d;
		border-radius: 1px;
	}

	.toc-item-text {
		position: relative;
		z-index: 1;
	}

	/* a[data-active] .toc-item-text::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 2px;
		background-color: #ffa94d;
		opacity: 0.2;
	} */
</style>
