<script>
	import Now from '$lib/assets/images/now.webp';
	import PostCard from '$lib/components/Now/PostCard.svelte';
	import TableOfContents from '$lib/components/Primary/TableOfContents.svelte';

	import { formatDate } from '$lib/utils.ts';
	import { ChevronRight } from 'lucide-svelte';
	import { marked } from 'marked';
	export let data;

	let now = data.meta;
	let content = data.content;
</script>

<svelte:head>
	<title>{now.title} now? | aman.bh</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content="{now.title} | aman.bh" />
</svelte:head>

<!-- <TableOfContents /> -->
<article class="relative py-8">
	<hgroup class="items-center justify-center w-full">
		<ol class="flex items-center justify-center whitespace-nowrap font-roboto" aria-label="Links">
			<li class="inline-flex items-center">
				<a class="flex items-center text-sm text-base-300 hover:underline" href="/"> Home </a>
				<ChevronRight class="h-4 stroke-base-300" />
			</li>
		</ol>
		<h1 class="text-5xl italic leading-normal text-center capitalize">{now.title}</h1>
		<figure class="flex items-center justify-center">
			<img height="100" width="400" src={Now} alt="Now" class="bg-blend-lighten" />
		</figure>
		<p class="py-4 text-center text-md font-fira">Updated on {formatDate(now.lastUpdated)}</p>
	</hgroup>
	<div class="px-8 pt-12 pb-[9rem] md:pb-2 md:overflow-hidden overflow-y-hidden md:w-fit w-dvw">
		<PostCard {content} />
	</div>
	<div
		class="px-4 py-12 mx-auto text-xl prose text-wrap prose-h2:font-libre-caslon prose-h3:font-libre-caslon prose-p:text-neutral"
	>
		{@html marked(now.job)}
		<h3>Where you at?</h3>
		{@html marked(now.location)}

		<h2>Highlights</h2>
		{#each now.years as year}
			<h3>{year.year}</h3>
			{@html marked(year.content)}
		{/each}
	</div>
</article>
