<script>
	import SEO from '$lib/components/Primary/SEO.svelte';
	import LinkPostCard from '$lib/components/Links/LinkPostCard.svelte';
	export let data;

	let posts = data.data;

	// Format date range for the title
	const now = new Date();
	const startOfWeek = new Date(now);
	startOfWeek.setDate(now.getDate() - now.getDay());
	const endOfWeek = new Date(now);
	endOfWeek.setDate(now.getDate() + (6 - now.getDay()));

	const dateRange = `${startOfWeek.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric'
	})} - ${endOfWeek.toLocaleDateString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric'
	})}`;
</script>

<SEO
	title="This Week's Links | Aman Bhargava"
	description="Links and finds from this week"
	url="https://aman.bh/links/week"
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
				<span class="inline-block highlight md:px-8">This Week's Links</span>
				<span class="inline-block md:hidden"> ✱ </span>
				<span class="hidden md:inline-block">╞════</span>
			</h1>
		</div>
		<div class="flex items-center justify-center col-span-5 pb-4">
			<span class="text-base-content/60">{dateRange}</span>
		</div>
	</header>

	<div class="col-span-5 mx-auto py-8">
		{#if posts.length === 0}
			<p class="text-center text-base-content/60">No links found for this week.</p>
		{:else}
			<div class="grid gap-6 md:gap-8">
				{#each posts as post}
					<LinkPostCard {post} />
				{/each}
			</div>
		{/if}
	</div>
</div>
