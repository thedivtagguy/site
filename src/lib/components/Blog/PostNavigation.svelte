<script lang="ts">
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	export let previousPost: { slug: string; title: string; date: number; year: number } | null =
		null;
	export let nextPost: { slug: string; title: string; date: number; year: number } | null = null;
	export let type: 'blog' | 'links' = 'blog';
</script>

<nav class="flex justify-between gap-4 items-start w-full my-12 border-t border-base-300 pt-8">
	{#if nextPost}
		<a
			data-sveltekit-reload
			href="/{type}/{nextPost.year}/{nextPost.slug}"
			class="flex items-center text-left text-md font-medium text-neutral-500 hover:text-neutral-700"
			><ChevronLeft class="sm:mr-2 stroke-base-300 size-12" />
			<span class="sm:text-lg text-md font-bold font-libre-caslon">
				<span class="block text-xs font-roboto uppercase font-bold pb-2 text-base-300"
					>Previous</span
				>
				{nextPost.title}
				<span class="block font-mono text-xs pt-2">{nextPost.date}</span>
			</span>
		</a>
	{:else}
		<div></div>
	{/if}
	{#if previousPost}
		<a
			data-sveltekit-reload
			href="/{type}/{previousPost.year}/{previousPost.slug}"
			class="flex items-center text-md text-right font-medium text-neutral-500 hover:text-neutral-700"
		>
			<span class="sm:text-lg text-md font-bold font-libre-caslon">
				<span class="block text-xs font-roboto uppercase font-bold pb-2 text-base-300">Next</span>
				{previousPost.title}
				<span class="block font-mono text-xs pt-2">{previousPost.date}</span>
			</span>
			<ChevronRight class="sm:ml-2 stroke-base-300 size-12" />
		</a>
	{:else}
		<div></div>
	{/if}
</nav>
