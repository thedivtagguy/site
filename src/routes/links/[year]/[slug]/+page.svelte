<script lang="ts">
	import { formatDate } from '$lib/utils.ts';
	import SEO from '$lib/components/Primary/SEO.svelte';
	import PostNavigation from '$lib/components/Blog/PostNavigation.svelte';
	export let data;

	const post = data.data;
</script>

<SEO
	title={post.title}
	excerpt={post.excerpt}
	description={post.excerpt}
	publishDate={post.date}
	tags={post.tags}
	url={`https://aman.bh/links/${post.year}/${post.slug}`}
	ogImage={`og?title=${encodeURIComponent(post.title)}&date=${encodeURIComponent(post.date)}`}
	authorName="Aman Bhargava"
	isBlogPost={true}
/>

<article class="max-w-2xl mx-auto px-4 py-8">
	<header class="mb-8">
		<div class="flex items-center justify-between mb-2">
			<time datetime={post.date} class="text-sm text-base-content/60">
				{formatDate(post.date)}
			</time>
			{#if post.tags && post.tags.length > 0}
				<div class="flex gap-2">
					{#each post.tags as tag}
						<span class="px-2 py-0.5 text-xs rounded-full bg-base-200">{tag}</span>
					{/each}
				</div>
			{/if}
		</div>
		<h1 class="text-3xl font-bold mb-2">{post.title}</h1>
		<div class="flex items-center gap-2">
			<span class="text-base-content/60">Source:</span>
			<a
				href={post.url}
				target="_blank"
				rel="noopener noreferrer"
				class="text-primary hover:underline"
			>
				{post.source}
			</a>
		</div>
	</header>

	<div class="prose prose-lg max-w-none prose-neutral">
		<svelte:component this={post.content} />
	</div>

	<footer class="mt-8">
		<PostNavigation type="links" previousPost={data.previousPost} nextPost={data.nextPost} />
	</footer>
</article>
