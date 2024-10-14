<script>
	import Now from '$lib/assets/images/now.webp';
	import BatteryPercentage from '$lib/assets/svg/BatteryPercentage.svelte';
	import PostCard from '$lib/components/Now/PostCard.svelte';
	import SEO from '$lib/components/Primary/SEO.svelte';
	import TableOfContents from '$lib/components/Primary/TableOfContents.svelte';
	import { batteryLevel, recentTracks, isOnline } from '$lib/stores.js';
	const battery = batteryLevel();
	const listened = recentTracks();
	const online = isOnline();
	$: currentTrack = $listened.length > 0 ? $listened[0] : null;
	let isAmanOnline = $online.status === 'Online';
	import { formatDate } from '$lib/utils.ts';
	import { ChevronRight } from 'lucide-svelte';
	import { marked } from 'marked';
	export let data;

	let now = data.meta;
	let content = data.content;
</script>

<SEO
	title="Now | Aman Bhargava"
	description="What is Aman doing right now. "
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
<article class="relative py-8">
	<hgroup class="items-center justify-center w-full">
		<ol class="flex items-center justify-center whitespace-nowrap font-roboto" aria-label="Links">
			<li class="inline-flex items-center">
				<a class="flex items-center text-sm text-base-300 hover:underline" href="/"> Home </a>
				<ChevronRight class="h-4 stroke-base-300" />
			</li>
		</ol>
		<h1 class="text-3xl italic leading-normal text-center capitalize md:text-5xl">{now.title}</h1>
		<figure class="flex items-center md:mt-2 md:w-[400px] mx-auto w-[300px] justify-center">
			<img height="100" src={Now} alt="Now" class="bg-blend-lighten" />
		</figure>
	</hgroup>
	<div class="px-8 pt-12 pb-[9rem] md:pb-2 md:overflow-hidden overflow-y-hidden md:w-fit w-dvw">
		<div class="mx-auto mb-8 prose prose-hr:my-2 prose-hr:pb-2 md:prose-lg">
			<p class="md:text-xl">
				My phone battery is at <span class="inline-block">
					<BatteryPercentage percentage={$battery} />
				</span>
				{$battery}% right now. I just listened to {currentTrack?.name} by {currentTrack?.artist[
					'#text'
				]}. I'm {isAmanOnline
					? 'currently working on my laptop'
					: 'not working at anything on my laptop right now'}.
			</p>

			<hr class="my-2 divider" />
			<p class="text-xs text-center md:text-md font-fira">
				Things below were updated on <br class="block md:hidden" />
				{formatDate(now.lastUpdated)}
			</p>
			<hr class="my-2 divider" />
		</div>
		<PostCard {content} />
	</div>
	<div
		class="px-4 py-12 mx-auto prose md:text-xl text-wrap prose-h2:font-libre-caslon prose-h3:font-libre-caslon prose-p:text-neutral"
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
