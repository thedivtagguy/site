<script>
	import Hero from '$lib/components/Homepage/Hero.svelte';
	import SEO from '$lib/components/Primary/SEO.svelte';
	import WorkCard from '$lib/components/Primary/WorkCard.svelte';
	import TextDivider from '$lib/components/Primary/TextDivider.svelte';
	import InTheNews from '$lib/components/Homepage/InTheNews.svelte';
	// import VizOfTheWeek from '$lib/components/Homepage/VizOfTheWeek.svelte';
	import MapContainer from '$lib/components/Homepage/MapContainer.svelte';
	import WordGames from '$lib/components/WordGames/ChartLayout.svelte';
	export let data;
	import { tiles as tileStore } from '$lib/stores';

	const tiles = tileStore();

	tiles.set(data.data?.tiles);

	let works = data.data.works;
</script>

<SEO
	title="Aman Bhargava"
	description="A general mishmash of design, data & code"
	url="https://aman.bh"
	ogImage="sharecard.jpg"
	isBlogPost={false}
	name="Aman Bhargava"
	jobTitle="Developer and designer"
	skills={['JavaScript', 'Svelte', 'D3.js', 'Data visualization', 'Design']}
	sameAs={[
		'https://www.linkedin.com/in/amnbh/',
		'https://github.com/thedivtagguy',
		'https://www.instagram.com/thedivtagguy',
		'https://bsky.app/profile/aman.bh'
	]}
/>
<header>
	<Hero liveData={data.data?.latestBlog} />

	<TextDivider text="Heard and seen, here and there" />
</header>

<!-- Works -->
<main>
	<section class="flex flex-col items-center justify-between w-full gap-4 py-2 md:flex-row">
		{#each works.slice(0, 3) as work}
			<WorkCard data={work} />
		{/each}
	</section>

	<div class="relative w-full py-4">
		<div class="absolute inset-0 flex items-center">
			<div class="w-full border-b-[1px] border-base-300"></div>
		</div>
		<div class="relative flex justify-center">
			<a href="/work" class="btn-primary bg-purple"> See more </a>
		</div>
	</div>

	<InTheNews data={data.data?.bylines} />
	<TextDivider text="Just for fun" />
	<WordGames />
	<!-- <VizOfTheWeek data={data.data?.tidytuesday} /> -->

	<MapContainer />
</main>
