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

<header
	class="grid-cols-1 grid w-full justify-center items-center md:px-6 md:grid-cols-1 lg:grid-cols-5 border-b-[1px] border-base-300"
>
	<figure class=" noise-image hidden lg:block">
		<img
			width="400"
			class="rounded-xl"
			src={headerImage}
			alt="Artistic interpretation of an ecosystem"
		/>
	</figure>
	<div
		class="flex items-center justify-center col-span-3 h-full lg:border-r-[1px] lg:border-l-[1px] border-base-300"
	>
		<h1 class="text-4xl md:text-4xl lg:text-7xl text-center py-6 text-neutral leading-tight">
			Things I've made for<span class="highlight inline-block italic"> myself and others</span>
		</h1>
	</div>

	<div class="justify-end hidden lg:flex items-end">
		<figure class=" noise-image">
			<img width="150" class="mx-auto h-full" src={hits} alt="Collection of popular works" />
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
		<!-- <aside
			class:filters={!showFilters}
			class="bg-base-100 hidden lg:flex justify-between px-4 max-w-3xl border-b-[1px] h-full border-base-300 z-10 w-full sticky top-0 py-2"
		>
			<TagsList />
		</aside> -->
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
							class:active={filteredTags.has(tag)}
							on:click={() => filterWork('tags', tag)}
							disabled={!filteredTags.has(tag)}
							class="hover:underline flex w-full justify-between hover:bg-base-200 items-center uppercase text-xs text-neutral font-medium transition-opacity duration-300
							{!selectedTags.has(tag) && selectedTags.size === 0 ? '' : 'opacity-20'} {selectedTags.has(tag) &&
							(selectedTags.size > 0 || filteredTags.has(tag))
								? 'underline opacity-100'
								: ''}"
						>
							<span>
								{tag}
								<span class="font-light">({count}) </span>
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
		transition: all 0.7s cubic-bezier(0.075, 0.82, 0.165, 1);
	}
	.filters {
		opacity: 0;
		visibility: hidden;
	}

	button:not(.active) {
		opacity: 0.2;
	}

	button:not(.active):hover {
		text-decoration: none;
	}
</style>
