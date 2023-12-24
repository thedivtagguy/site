<script>
	import headerImage from '$lib/assets/images/MIMICRY.webp';
	import hits from '$lib/assets/images/hits.webp';
	import Categories from '$lib/components/Work/Categories.svelte';
	// import TvScene from '$lib/components/Work/TVScene.svelte';
	import WorkList from '$lib/components/Work/WorkList.svelte';

	export let data;

	let works = data.data;
	let types = data?.meta?.types;
	let tags = data?.meta.tags;
</script>

<div
	class="grid grid-cols-1 justify-center items-center px-6 md:grid-cols-1 lg:grid-cols-5 border-b-[1px] mb-2 border-base-300"
>
	<figure class="hidden lg:block noise-image">
		<img
			width="400"
			class="rounded-xl"
			src={headerImage}
			alt="My chaotic so called mimicry of the entire ecosystem"
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
		<img
			width="150"
			class="mx-auto h-full"
			src={hits}
			alt="My chaotic so called mimicry of the entire ecosystem"
		/>
	</figure>
</div>

<main
	class="grid grid-cols-1 h-full justify-center items-start md:px-6 md:grid-cols-1 lg:grid-cols-5 w-full divide-base-300"
>
	<div
		class="col-span-1 w-full h-full hidden md:block text-right pr-2 border-r-[1px] border-base-300"
	>
		<ul class="ml-2 font-fira">
			{#each Object.entries(types).sort((a, b) => b[1] - a[1]) as [tag, count]}
				<li
					class="hover:underline hover:cursor-pointer uppercase text-xs py-1 text-neutral font-medium"
				>
					<span class="font-light">({count})</span>
					{tag}
				</li>
			{/each}
		</ul>
		<Categories />
	</div>
	<section class="col-span-3">
		<WorkList data={works} />
	</section>
	<div class="border-l-[1px] h-full border-base-300 col-span-1 hidden md:block">
		<ul class="ml-2 flex flex-col font-fira">
			{#each Object.entries(tags).sort((a, b) => b[1] - a[1]) as [tag, count]}
				<li
					class="hover:underline hover:cursor-pointer uppercase text-xs py-1 text-neutral font-medium"
				>
					{tag} <span class="font-light">({count})</span>
				</li>
			{/each}
		</ul>
	</div>
</main>
