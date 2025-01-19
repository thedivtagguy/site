<script>
	import { formatDate } from '$lib/utils';
	import { Link, ExternalLink } from 'lucide-svelte';
	import { Popover } from 'svelte-ux';
	export let post;

	let open = false;

	$: year = new Date(post.date).getFullYear();
</script>

<article
	class="w-full px-2 max-w-2xl py-4 border-b border-base-300 transition-all hover:border-primary"
>
	<header class="mb-2">
		<div class="flex flex-wrap items-center justify-between my-2">
			<time datetime={post.date} class="text-lg font-bold text-base-content/60">
				{formatDate(post.date)}
			</time>
		</div>
		<h2 class="text-2xl font-medium break-words">
			<a
				href={post.url}
				target="_blank"
				rel="noopener noreferrer"
				class="hover:text-primary break-words"
			>
				{post.title}
			</a>
			<a
				href={post.url}
				target="_blank"
				rel="noopener noreferrer"
				class="ml-1 inline-flex items-center gap-1 text-sm font-bold text-base-content/60 hover:text-primary break-all"
			>
				{post.source}
				<ExternalLink class="w-4 h-4 flex-shrink-0" />
			</a>
		</h2>
	</header>
	<div class="prose prose-md max-w-none prose-neutral break-words">
		{@html post.content}
	</div>
	<footer class="my-4 flex flex-wrap items-center gap-2">
		<div class="inline-block">
			<a
				class="text-sm inline-flex items-center gap-1 text-primary hover:underline"
				href={`/links/${year}/${post.slug}`}
			>
				<Link class="w-4 h-4 flex-shrink-0" />
				<span>Permalink</span>
			</a>
		</div>
		{#if post.tags && post.tags.length > 0}
			<div class="flex flex-wrap gap-2">
				{#each post.tags as tag}
					<span class="px-2 py-0.5 text-xs rounded-full bg-base-200">{tag}</span>
				{/each}
			</div>
		{/if}
	</footer>
</article>
