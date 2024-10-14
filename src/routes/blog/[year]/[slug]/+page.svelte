<script lang="ts">
	import { formatDate } from '$lib/utils.ts';
	import SEO from '$lib/components/Primary/SEO.svelte';
	import { ChevronRight } from 'lucide-svelte';
	import '$lib/prism.css';
	export let data;
	function encodeTitle(title: string): string {
		return encodeURIComponent(title).replace(/'/g, '%27').replace(/"/g, '%22');
	}
</script>

<SEO
	title={data.meta.title}
	excerpt={data.meta.excerpt}
	description={data.meta.excerpt}
	publishDate={data.meta.date}
	category={data.meta.category}
	tags={data.meta.tags}
	url={`https://aman.bh/${data.meta.slug}`}
	image={`https://aman.bh/og?title=${encodeTitle(data.meta.title)}&date=${encodeURIComponent(
		data.meta.date
	)}`}
	authorName="Aman Bhargava"
/>

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
		<h1 class="max-w-xl text-6xl leading-snug capitalize font-libre-caslon">{data.meta.title}</h1>
		<p class="py-4 text-sm font-fira">Published on {formatDate(data.meta.date)}</p>
	</hgroup>

	<div class="leading-relaxed prose prose-xl blog prose-h3:font-libre-caslon prose-p:font-archivo">
		<svelte:component this={data.content} />
	</div>
	<div class="flex gap-3 pt-4 tags">
		{#each data.meta.tags as tag}
			<span class="px-2 py-1 rounded-lg bg-base-200">{tag}</span>
		{/each}
	</div>
</article>
<!-- <hr class="my-12 divide another one" /> -->
