<script lang="ts">
	import { formatDate } from '$lib/utils.ts';
	import SEO from '$lib/components/Primary/SEO.svelte';
	import { ChevronRight } from 'lucide-svelte';
	import '$lib/prism.css';
	import PostNavigation from '$lib/components/Blog/PostNavigation.svelte';
	import HighlightAnchor from '$lib/components/Blog/HighlightAnchor.svelte';
	import TableOfContents from '$lib/components/Primary/TableOfContents.svelte';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	export let data;

	let isFirefox = false;
	let showToc = false;

	onMount(() => {
		// Firefox detection
		isFirefox = navigator.userAgent.includes('Firefox');

		// Only show ToC if the post has a ToC and the browser is not Firefox
		showToc = data.meta.toc && !isFirefox;
	});
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
	sharecard={data.meta.sharecard || ''}
	ogImage={!data.meta.sharecard
		? `og?title=${encodeURIComponent(data.meta.title)}&date=${encodeURIComponent(data.meta.date)}`
		: ''}
	authorName="Aman Bhargava"
	isBlogPost={true}
	twitterHandle="@thedivtagguy"
/>

<div
	class="py-8 blog-container w-full px-4 sm:px-6 lg:px-8 mx-auto max-w-full sm:max-w-4xl lg:max-w-5xl relative lg:grid lg:grid-cols-[1fr_220px] lg:gap-8"
>
	<article id="content" class="blog-post leading-royal w-full">
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
			<h1 class="pt-2 text-4xl md:text-6xl leading-relaxed capitalize font-libre-caslon">
				{data.meta.title}
			</h1>
			<p class="py-4 text-xs sm:text-sm font-fira">Published on {formatDate(data.meta.date)}</p>
		</hgroup>

		<div
			class="leading-relaxed prose-code:before:content-none prose-code:after:content-none prose prose-base sm:prose-base lg:prose-xl blog prose-h3:font-libre-caslon prose-p:font-archivo max-w-none"
		>
			<svelte:component this={data.content} />
		</div>
	</article>

	{#if showToc}
		<div class="table-of-contents-container">
			<TableOfContents selector="article#content" />
		</div>
	{/if}
</div>
<div id="webmentions"></div>
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

	.table-of-contents-container {
		position: sticky;
		top: 2rem;
		height: calc(100vh - 4rem);
		align-self: start;
		width: 220px;
	}

	@media (max-width: 1023px) {
		.table-of-contents-container {
			display: none;
		}
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
		border: 1px solid #e5e5e5;
		border-radius: 0.5rem;
		margin: 1.5rem auto;
		display: block;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	:global(.prose figure) {
		margin: 1.5rem 0;
		text-align: center;
		max-width: 100%;
	}

	:global(.prose figcaption) {
		font-size: 0.875rem;
		color: #666;
		margin-top: 0.5rem;
		text-align: center;
		font-style: italic;
		max-width: 80%;
		margin-left: auto;
		margin-right: auto;
	}

	:global(.prose p) {
		max-width: 100%;
	}

	:global(.prose table) {
		width: 100%;
		border-collapse: collapse;
		margin: 1.5rem 0;
		background-color: white;
		border-radius: 0.5rem;
		overflow: hidden;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	:global(.prose thead) {
		background-color: #f8f9fa;
		border-bottom: 1px solid #e5e5e5;
	}

	:global(.prose th) {
		font-weight: 600;
		text-align: left;
		padding: 0.55rem 1rem;
		font-size: 1.1rem;
		color: #374151;
	}

	:global(.prose td) {
		padding: 0.5rem 1rem;
		border-bottom: 1px solid #e5e5e5;
		font-size: 1rem;
	}

	:global(.prose tr:last-child td) {
		border-bottom: none;
	}

	:global(.prose tr:nth-child(even)) {
		background-color: #f9fafb;
	}

	/* Pro tip styling */
	:global(.prose blockquote) {
		background-color: #f0f7ff;
		border-left: 4px solid #3498db;
		padding: 15px;
		margin: 20px 0;
		border-radius: 4px;
		font-size: 0.95em;
	}

	:global(.prose blockquote strong) {
		color: #2980b9;
		display: block;
		margin-bottom: 5px;
	}

	@media (max-width: 640px) {
		:global(.prose img, .prose p) {
			width: 100%;
		}

		:global(.prose img) {
			max-height: 400px;
		}

		:global(.prose table) {
			display: block;
			overflow-x: auto;
			white-space: nowrap;
		}
	}

	:global(.prose code) {
		background-color: #f3f4f6;
		border: 1px solid #d1d5db;
		border-radius: 0.25rem;
		padding: 0.2em 0.4em;
		font-size: 0.875em;
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono',
			'Courier New', monospace;
	}

	:global(.prose pre code) {
		background-color: transparent;
		border: none;
		padding: 0;
		font-size: inherit;
	}
</style>
