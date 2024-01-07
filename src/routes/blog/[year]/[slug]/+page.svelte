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

<article class="pt-8">
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
		<h1 class="max-w-xl text-6xl leading-normal capitalize">{data.meta.title}</h1>
		<p class="py-4 text-sm font-fira">Published on {formatDate(data.meta.date)}</p>
	</hgroup>

	<div class="text-lg leading-relaxed prose blog prose-p:font-archivo">
		<svelte:component this={data.content} />
	</div>
	<div class="flex gap-3 pt-4 tags">
		{#each data.meta.tags as tag}
			<span class="px-2 py-1 rounded-lg bg-base-200">{tag}</span>
		{/each}
	</div>
</article>
<hr class="my-12 divide" />
