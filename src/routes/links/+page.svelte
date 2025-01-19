<script>
	import SEO from '$lib/components/Primary/SEO.svelte';
	import LinkPostCard from '$lib/components/Links/LinkPostCard.svelte';
	export let data;

	let posts = data.data;
</script>

<SEO
	title="Links | Aman Bhargava"
	description="Quick thoughts and interesting links I've found around the web"
	url="https://aman.bh/links"
	ogImage="sharecard.jpg"
	name="Aman Bhargava"
	isBlogPost={false}
/>

<div
	class="grid items-center justify-center w-full grid-cols-1 gap-0 lg:grid-cols-5 border-base-300"
>
	<header class="col-span-5 w-full grid grid-cols-1 md:grid-cols-5 border-b-[1px] border-base-300">
		<div class="flex items-center justify-center h-full col-span-5 py-6 border-base-300">
			<h1 class="text-3xl leading-tight text-center lg:text-6xl text-neutral">
				<span class="hidden md:inline-block">════╡</span>
				<span class="inline-block md:hidden"> ✱ </span>
				<span class="inline-block highlight md:px-8"> Links & finds</span>
				<span class="inline-block md:hidden"> ✱ </span>
				<span class="hidden md:inline-block">╞════</span>
			</h1>
		</div>
	</header>

	<div class="col-span-5 mx-auto py-8">
		<div class="grid gap-6 md:gap-8">
			{#each posts as post}
				<LinkPostCard {post} />
			{/each}
		</div>
	</div>
</div>
