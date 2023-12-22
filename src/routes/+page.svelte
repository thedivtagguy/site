<script>
	import Hero from '$lib/components/Homepage/Hero.svelte';
	import WorkCard from '$lib/components/Primary/WorkCard.svelte';
	import TextDivider from '$lib/components/Primary/TextDivider.svelte';
	import InTheNews from '$lib/components/Homepage/InTheNews.svelte';
	import VizOfTheWeek from '$lib/components/Homepage/VizOfTheWeek.svelte';
	export let data;
	let works = data.data.works;
</script>

<Hero />

<TextDivider text="Heard and seen, here and there" />

<!-- Works -->
<section class="flex justify-between items-center w-full md:flex-row gap-4 py-2 flex-col">
	{#each works.slice(0, 3) as work}
		<WorkCard data={work} />
	{/each}
</section>

<div class="relative py-4 w-full">
	<div class="absolute inset-0 flex items-center">
		<div class="w-full border-b-2 border-neutral"></div>
	</div>
	<div class="relative flex justify-center">
		<span class="bg-purple text-sm text-gray-500">
			<a
				style="box-shadow: 0px 2px 0px 0px #2b2b2b;"
				href="/work"
				class="text-xl font-bold bg-purple font-fira tracking-normal uppercase px-6 py-2 rounded-md text-white border-2 border-neutral"
			>
				See more
			</a>
		</span>
	</div>
</div>

<InTheNews data={data.data?.publications} />
<TextDivider text="Just for fun" />
<VizOfTheWeek data={data.data?.tidytuesday} />
