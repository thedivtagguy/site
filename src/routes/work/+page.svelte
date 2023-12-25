<script>
	import headerImage from '$lib/assets/images/MIMICRY.webp';
	import hits from '$lib/assets/images/hits.webp';
	import Categories from '$lib/components/Work/Categories.svelte';
	import WorkList from '$lib/components/Work/WorkList.svelte';
	import { filteredWorks } from '$lib/stores.js';
	import { filterData, toggleItem, workFilters } from '$lib/components/Work/filterUtils.js';
	import ToggleFormatting from '$lib/components/Primary/Toggle.svelte';
	import { X } from 'lucide-svelte';

	export let data;

	let works = data.data;
	let types = data?.meta?.types;
	let tags = data?.meta.tags;

	let showFilters = true;

	function filterWork(filterBy, value) {
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
</script>

<svelte:head>
	<title>Works | aman.bh</title>
	<meta property="og:title" content="Works | aman.bh" />
</svelte:head>

<header
	class="grid-cols-1 grid w-full justify-center items-center md:px-6 md:grid-cols-1 lg:grid-cols-5 border-b-[1px] border-base-300"
>
	<figure class="hidden lg:block p-1 mr-8">
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
		<h1 class="text-4xl md:text-4xl lg:text-7xl text-center py-6 text-neutral leading-tight">
			Things I've made for<span class="highlight inline-block italic"> myself and others</span>
		</h1>
	</div>

	<div class="justify-end bg-white hidden lg:flex items-end">
		<figure class=" noise-image">
			<img width="150" class="mx-auto h-full" src={hits} alt="All the hits" />
			<caption class="text-xs w-full font-fira italic">(and misses)</caption>
		</figure>
		<ToggleFormatting
			onToggle={() => {
				showFilters = !showFilters;
			}}
		/>
	</div>
</header>

<main
	class="grid grid-cols-1 h-full justify-center items-start md:grid-cols-1 lg:grid-cols-5 w-full lg:py-2"
>
	<aside class="col-span-1 h-full hidden lg:flex flex-col items-center w-full">
		<nav class="sticky top-2 w-full mt-2" class:filters={!showFilters}>
			<h3 class="font-semibold text-sm text-center uppercase font-fira pb-2">~ by type ~</h3>
			<hr class="divide py-2" />
			<Categories {types} />
		</nav>
	</aside>
	<section class="col-span-3 min-h-screen border-l-[1px] border-r-[1px] border-base-300 md:mx-4">
		<WorkList data={$filteredWorks} />
	</section>
	<aside class="h-full col-span-1 hidden lg:block">
		<nav class=" flex flex-col sticky top-2 font-fira w-full mt-2" class:filters={!showFilters}>
			<h3 class="font-semibold text-sm text-center uppercase font-fira pb-2">~ by tag ~</h3>
			<hr class="divide pb-2" />

			<ul>
				{#each Object.entries(tags).sort((a, b) => b[1] - a[1]) as [tag, count]}
					<li class="py-1.5 h-6">
						<button
							on:click={() => filterWork('tags', tag)}
							disabled={!filteredTags.has(tag)}
							class="hover:underline flex w-full justify-between items-center uppercase text-xs text-neutral font-medium transition-opacity duration-300
							{selectedTags.size > 0 && selectedTags.has(tag) ? 'bg-gray-200 opacity-100' : ''}
							{selectedTags.size > 0 && !selectedTags.has(tag) ? 'opacity-20' : ''}"
						>
							<span>
								{tag}
								<span class="font-light">({count})</span>
							</span>
							{#if selectedTags.has(tag) && (selectedTags.size > 0 || filteredTags.has(tag))}
								<X class="w-4 h-4 hover:stroke-2  mx-2" />
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
