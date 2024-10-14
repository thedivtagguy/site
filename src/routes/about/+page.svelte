<script>
	import Now from '$lib/assets/images/now.webp';
	import Diver from '$lib/components/About/Diver.svelte';
	import PostCard from '$lib/components/Now/PostCard.svelte';
	import SEO from '$lib/components/Primary/SEO.svelte';
	import TableOfContents from '$lib/components/Primary/TableOfContents.svelte';

	import { formatDate } from '$lib/utils.ts';
	import { ChevronRight } from 'lucide-svelte';
	import { marked } from 'marked';
	export let data;

	let about = data.meta;
	let content = data.content;
	const age = new Date().getFullYear() - 2001;
</script>

<SEO
	title="About | Aman Bhargava"
	description="A general mishmash of design, data & code"
	url="https://aman.bh"
	ogImage="sharecard.jpg"
	name="Aman Bhargava"
	jobTitle="Developer and designer"
	skills={['JavaScript', 'Svelte', 'D3.js', 'Data visualization', 'Design']}
	sameAs={[
		'https://www.linkedin.com/in/amnbh/',
		'https://github.com/thedivtagguy',
		'https://www.instagram.com/thedivtagguy',
		'https://bsky.app/profile/aman.bh'
	]}
	lang="en"
/>

<!-- <TableOfContents /> -->
<article class="relative flex flex-col w-full gap-4 py-8 md:flex-row">
	<div class="basis-1/2">
		<hgroup class="items-center justify-start w-full">
			<ol class="flex items-center justify-start whitespace-nowrap font-roboto" aria-label="Links">
				<li class="inline-flex items-start">
					<a class="flex items-center text-sm text-base-300 hover:underline" href="/"> Home </a>
					<ChevronRight class="h-4 stroke-base-300" />
				</li>
			</ol>
			<h1 class="text-5xl italic leading-normal text-left capitalize">{about.title} - {age}</h1>
			<p class="py-4 text-xs text-left font-fira">Updated on {formatDate(about.lastUpdated)}</p>
		</hgroup>
		<div class="py-2 prose md:text-xl blog">
			<svelte:component this={content} />
			<h2 class="p-0 mt-0 mb-4">Thank yous</h2>
			<p>{about.thanks}</p>
			<ul class="grid grid-cols-2 list-outside auto-row-max">
				{#each about.people as person}
					<li><a href={person.link}>{person.name}</a></li>
				{/each}
			</ul>
		</div>
	</div>
	<div class="basis-1/2">
		<Diver />
	</div>
</article>
