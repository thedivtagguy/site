<script>
	import Now from '$lib/assets/images/now.webp';
	import PostCard from '$lib/components/Now/PostCard.svelte';
	import TableOfContents from '$lib/components/Primary/TableOfContents.svelte';

	import { formatDate } from '$lib/utils.ts';
	import { ChevronRight } from 'lucide-svelte';
	import { marked } from 'marked';
	export let data;

	let about = data.meta;
	let content = data.content;
	const age = new Date().getFullYear() - 2001;
</script>

<svelte:head>
	<title>About me | aman.bh</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content="{about.title} | aman.bh" />
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
		<h1 class="text-5xl italic leading-normal text-center capitalize">{about.title} {age}</h1>

		<p class="py-4 text-center text-md font-fira">Updated on {formatDate(about.lastUpdated)}</p>
	</hgroup>

	<div class="py-12 mx-auto text-xl prose blog">
		<svelte:component this={content} />
		<h2>Thank yous</h2>
		<p>{about.thanks}</p>
		<ul class="grid grid-cols-2 list-outside auto-row-max">
			{#each about.people as person}
				<li><a href={person.link}>{person.name}</a></li>
			{/each}
		</ul>
	</div>
</article>
