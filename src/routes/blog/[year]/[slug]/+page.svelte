<script lang="ts">
	import { formatDate } from '$lib/utils.ts';
	import SEO from '$lib/components/Primary/SEO.svelte';
	import { ChevronRight } from 'lucide-svelte';
	import '$lib/prism.css';
	import PostNavigation from '$lib/components/Blog/PostNavigation.svelte';
	import HighlightAnchor from '$lib/components/Blog/HighlightAnchor.svelte';

	export let data;
</script>

<HighlightAnchor />

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
<article class="py-8 blog-post leading-royal w-full max-w-4xl">
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
		<h1 class="md:max-w-2xl pt-2 text-4xl md:text-6xl leading-relaxed capitalize font-libre-caslon">
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
<PostNavigation previousPost={data.previousPost} nextPost={data.nextPost} />

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

	h1 {
		line-height: 1.3;
	}
	:global(.prose) {
		max-width: 100%;
		overflow-wrap: break-word;
		word-wrap: break-word;
		word-break: break-word;
	}

	:global(.prose img) {
		max-width: 100%;
		height: auto;
		object-fit: contain;
	}

	:global(.prose p) {
		max-width: 100%;
	}

	@media (max-width: 640px) {
		:global(.prose img, .prose p) {
			width: 100%;
		}
	}
</style>
