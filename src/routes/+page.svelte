<script>
	import Hero from '$lib/components/Homepage/Hero.svelte';
	import WorkCard from '$lib/components/Primary/WorkCard.svelte';
	import TextDivider from '$lib/components/Primary/TextDivider.svelte';
	import InTheNews from '$lib/components/Homepage/InTheNews.svelte';
	import VizOfTheWeek from '$lib/components/Homepage/VizOfTheWeek.svelte';
	import MapContainer from '$lib/components/Homepage/MapContainer.svelte';
	export let data;
	let works = data.data.works;
</script>

<svelte:head>
	<title>Aman's Website</title>
</svelte:head>
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
	<VizOfTheWeek data={data.data?.tidytuesday} />

	<MapContainer />
</main>
