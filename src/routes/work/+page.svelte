<script>
	import headerImage from '$lib/assets/images/MIMICRY.webp';
	import hits from '$lib/assets/images/hits.webp';
	import Categories from '$lib/components/Work/Categories.svelte';
	import WorkList from '$lib/components/Work/WorkList.svelte';
	import { filteredWorks as filterWorkStore } from '$lib/stores.js';
	$: filteredWorks = filterWorkStore();
	import { filterData, toggleItem, workFilters } from '$lib/components/Work/filterUtils.js';
	import ToggleFormatting from '$lib/components/Primary/Toggle.svelte';
	import { isWorkBeingFiltered } from '$lib/stores.js';
	import { goto } from '$app/navigation';
	import { X } from 'lucide-svelte';
	import SEO from '$lib/components/Primary/SEO.svelte';
	export let data;

	const filtered = isWorkBeingFiltered();

	let works = data.data;
	let types = data?.meta?.types;
	let tags = data?.meta.tags;

	let showFilters = true;

	function filterWork(filterBy, value) {
		goto('/work', { noScroll: true });
		$workFilters = toggleItem($workFilters, filterBy, value);
	}

	function tagsByType(selectedTypes, allWorks) {
		if (selectedTypes.size === 0) return new Set(Object.keys(tags));

		return new Set(
			allWorks.filter((work) => selectedTypes.has(work.type)).flatMap((work) => work.tags)
		);
	}

	$: $filteredWorks = filterData(works, $workFilters);

	$: filteredTags = tagsByType($workFilters.type, works);

	$: selectedTags = $workFilters.tags;

	$: if (selectedTags.size > 0) {
		filtered.set(true);
	} else {
		filtered.set(false);
	}
</script>

<SEO
	title="Work | Aman Bhargava"
	description="Websites, visualizations, interactives and other mildly interesting stuff."
	url="https://aman.bh"
	image="https://aman.bh/sharecard.jpg"
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

<header
	class="grid-cols-1 grid w-full justify-center items-center md:px-6 md:grid-cols-1 lg:grid-cols-5 border-b-[1px] border-base-300"
>
	<figure class="hidden p-1 mr-8 lg:block">
		<img
			width="400"
			class="rounded-xl"
			src={headerImage}
			alt="My chaotic step-by-step, brick by brick mimicry of the entire ecosystem"
		/>
	</figure>
	<div
		class="flex items-center justify-center col-span-3 h-full lg:border-r-[1px] lg:border-l-[1px] border-base-300"
	>
		<h1 class="py-6 text-4xl leading-tight text-center md:text-4xl lg:text-7xl text-neutral">
			Things I've made for<span class="inline-block italic highlight"> myself and others</span>
		</h1>
	</div>

	<div class="items-end justify-end hidden bg-white lg:flex">
		<figure class="font-fira noise-image">
			<img width="150" class="h-full mx-auto" src={hits} alt="All the hits" />
			<caption class=" text-xs italic text-center w-[9rem] font-fira">(and misses)</caption>
		</figure>
		<ToggleFormatting
			onToggle={() => {
				showFilters = !showFilters;
			}}
		/>
	</div>
</header>

<main
	class="grid items-start justify-center w-full h-full grid-cols-1 md:grid-cols-1 lg:grid-cols-5"
>
	<aside class="flex-col items-center hidden w-full h-full col-span-1 lg:flex">
		<nav class="sticky w-full mt-2 top-2" class:filters={!showFilters}>
			<h3 class="pb-2 text-sm font-semibold text-center uppercase font-fira">~ by type ~</h3>
			<hr class="py-2 divide" />
			<Categories {types} />
		</nav>
	</aside>
	<section
		class="col-span-3 min-h-screen border-l-[1px] border-r-[1px] border-base-300 lg:mx-[0.9rem]"
	>
		<WorkList data={$filteredWorks} />
	</section>
	<aside class="hidden h-full col-span-1 lg:block">
		<nav class="sticky flex flex-col w-full mt-2 top-2 font-fira" class:filters={!showFilters}>
			<h3 class="pb-2 text-sm font-semibold text-center uppercase font-fira">~ by tag ~</h3>
			<hr class="pb-2 divide" />

			<ul>
				{#each Object.entries(tags).sort((a, b) => b[1] - a[1]) as [tag, count]}
					<li class="py-1.5 h-6">
						<button
							on:click={() => filterWork('tags', tag)}
							disabled={!filteredTags.has(tag)}
							class="hover:underline font-fira flex w-full justify-between items-center uppercase text-xs text-neutral font-medium transition-opacity duration-300
							{selectedTags.size > 0 && selectedTags.has(tag) ? 'bg-gray-200 opacity-100' : ''}
							{selectedTags.size > 0 && !selectedTags.has(tag) ? 'opacity-20' : ''}"
						>
							<span>
								{tag}
								<span class="font-light">({count})</span>
							</span>
							{#if selectedTags.has(tag) && (selectedTags.size > 0 || filteredTags.has(tag))}
								<X class="w-4 h-4 mx-2 hover:stroke-2" />
							{/if}
						</button>
					</li>
				{/each}
			</ul>
		</nav>
	</aside>
</main>

<style>
	nav {
		transition: all 0.1s ease-in-out;
	}
	.filters {
		opacity: 0;
		visibility: hidden;
	}

	button:not(.active):hover {
		text-decoration: none;
	}

	button:disabled {
		opacity: 0.2;
	}
</style>
