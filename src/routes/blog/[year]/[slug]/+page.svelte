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
	ogImage={`og?title=${encodeURIComponent(data.meta.title)}&date=${encodeURIComponent(
		data.meta.date
	)}`}
	authorName="Aman Bhargava"
	isBlogPost={true}
	twitterHandle="@thedivtagguy"
/>
<article class="py-8">
	<hgroup>
		<ol class="flex items-center whitespace-nowrap font-roboto" aria-label="Links">
			<li class="inline-flex items-center">
				<a class="flex items-center text-sm text-black/70 hover:underline" href="/"> Home </a>
				<ChevronRight class="h-4 stroke-black/70" />
			</li>
			<li class="inline-flex items-center">
				<a class="flex items-center text-sm text-black/70 hover:underline" href="/blog"> Blog </a>
				<ChevronRight class="h-4 stroke-black/70" />
			</li>
		</ol>
		<h1 class="max-w-xl text-4xl md:text-6xl leading-snug capitalize font-libre-caslon">
			{data.meta.title}
		</h1>
		<p class="py-4 text-xs sm:text-sm font-fira">Published on {formatDate(data.meta.date)}</p>
	</hgroup>

	<div
		class="leading-relaxed prose prose-base sm:prose-base lg:prose-xl blog prose-h3:font-libre-caslon prose-p:font-archivo"
	>
		<svelte:component this={data.content} />
	</div>
</article>

<style>
	:global(.footnotes > hr) {
		border-top: 1px solid black;
		margin: 1rem auto;
	}
	:global(.footnote-backref) {
		padding-left: 0.5rem;
	}

	:global(.footnote-ref) {
		padding-left: 0.2rem;
		font-style: bold;
	}
</style>
