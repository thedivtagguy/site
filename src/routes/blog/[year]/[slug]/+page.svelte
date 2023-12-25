<script lang="ts">
	import { formatDate } from '$lib/utils.ts';
	import { ChevronRight } from 'lucide-svelte';
	export let data;
</script>

<svelte:head>
	<title>{data.meta.title} | aman.bh</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content="{data.meta.title} | aman.bh" />
</svelte:head>

<article class="py-8">
	<hgroup>
		<ol class="flex items-center whitespace-nowrap font-roboto" aria-label="Links">
			<li class="inline-flex items-center">
				<a class="flex items-center text-sm text-base-300 hover:underline" href="/"> Home </a>
				<ChevronRight class="h-4 stroke-base-300" />
			</li>
			<li class="inline-flex items-center">
				<a class="flex items-center text-sm text-base-300 hover:underline" href="/blog"> Blog </a>
				<ChevronRight class="h-4 stroke-base-300" />
			</li>
		</ol>
		<h1 class="text-5xl max-w-lg capitalize leading-normal">{data.meta.title}</h1>
		<p class="font-fira text-sm py-4">Published on {formatDate(data.meta.date)}</p>
	</hgroup>

	<div class="prose blog text-xl">
		<svelte:component this={data.content} />
	</div>
	<div class="tags pt-4 flex gap-3">
		{#each data.meta.tags as tag}
			<span class="bg-base-200 px-2 py-1 rounded-lg">{tag}</span>
		{/each}
	</div>
</article>

<style>
	:global(.prose.blog > p) {
		font-family:
			Roboto Condensed,
			sans-serif;
		font-size: 1.2rem;
		line-height: 2.1rem;
	}

	:global(.prose.blog > li) {
		font-family:
			Roboto Condensed,
			sans-serif;
		font-size: 1.2rem;
		line-height: 3.1rem;
	}
</style>
