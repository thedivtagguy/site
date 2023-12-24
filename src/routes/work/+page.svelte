<script>
	import headerImage from '$lib/assets/images/MIMICRY.webp';
	import hits from '$lib/assets/images/hits.webp';
	import Categories from '$lib/components/Work/Categories.svelte';
	import WorkList from '$lib/components/Work/WorkList.svelte';
	import Search from '$lib/components/Primary/Search.svelte';
	import { filteredWorks } from '$lib/stores.js';

	export let data;
	let works = data.data;
	let types = data?.meta?.types;
	let tags = data?.meta.tags;

	let selectedTags = new Set();

	function handleTagClick(tag) {
		if (selectedTags.has(tag)) {
			selectedTags.delete(tag);
		} else {
			selectedTags.add(tag);
		}
		selectedTags = new Set(selectedTags);
		updateFilteredWorks();
	}

	function updateFilteredWorks() {
		$filteredWorks =
			selectedTags.size === 0
				? works
				: works.filter((work) => work.tags.some((tag) => selectedTags.has(tag)));
	}

	$: updateFilteredWorks();

	$: console.log(works);
</script>

<header
	class="grid grid-cols-1 w-full justify-center items-center md:px-6 md:grid-cols-1 lg:grid-cols-5 border-b-[1px] border-base-300"
>
	<figure class="hidden lg:block noise-image">
		<img
			width="400"
			class="rounded-xl"
			src={headerImage}
			alt="Artistic interpretation of an ecosystem"
		/>
	</figure>
	<div
		class="flex items-center justify-center col-span-3 h-full border-r-[1px] border-l-[1px] border-base-300"
	>
		<h1 class="text-4xl md:text-4xl lg:text-7xl text-center py-6 text-neutral leading-tight">
			Things I've made for<span class="highlight inline-block italic"> myself and others</span>
		</h1>
	</div>
	<figure class="hidden lg:block noise-image">
		<img width="150" class="mx-auto h-full" src={hits} alt="Collection of popular works" />
	</figure>
</header>

<main
	class="grid grid-cols-1 h-full justify-center items-start md:grid-cols-1 lg:grid-cols-5 w-full lg:py-2"
>
	<aside class="col-span-1 h-full hidden lg:flex flex-col items-center w-full">
		<nav class="sticky top-2 w-full mt-2">
			<h3 class="font-semibold text-sm text-center uppercase font-fira pb-2">~ Works by type ~</h3>
			<hr class="divide py-2" />
			<Categories {types} />
		</nav>
	</aside>
	<section class="col-span-3 min-h-screen border-l-[1px] border-r-[1px] border-base-300 md:mx-4">
		<aside
			class="bg-base-100 flex justify-between px-4 max-w-3xl border-b-[1px] h-full border-base-300 z-10 w-full sticky top-0 py-2"
		>
			<p class="text-sm font-fira">
				Showing {selectedTags.size === 0 ? 'all' : $filteredWorks.length} posts
			</p>
			<Search data={works} />
		</aside>
		<WorkList data={$filteredWorks} />
	</section>
	<aside class="relative h-full col-span-1 hidden lg:block">
		<nav class=" flex flex-col font-fira sticky top-2 w-full mt-2">
			<h3 class="font-semibold text-sm text-center uppercase font-fira pb-2">~ Works by tag ~</h3>
			<hr class="divide pb-2" />

			<ul>
				{#each Object.entries(tags).sort((a, b) => b[1] - a[1]) as [tag, count]}
					<li class="py-1">
						<button
							on:click={() => handleTagClick(tag)}
							class="hover:underline uppercase text-xs text-neutral font-medium"
						>
							{tag} <span class="font-light">({count})</span>
						</button>
					</li>
				{/each}
			</ul>
		</nav>
	</aside>
</main>

<style>
	.tag-button {
		/* shared styles for all buttons */
		cursor: pointer;
		text-transform: uppercase;
		font-size: 0.75rem; /* example size, adjust as needed */
		font-weight: medium;
		background: none;
		border: none;
		padding: 0.25rem;
		margin: 0;
	}
	.active-tag {
		/* styles for active tags */
		opacity: 1;
	}
	.inactive-tag {
		/* styles for inactive tags */
		opacity: 0.5;
	}
</style>
