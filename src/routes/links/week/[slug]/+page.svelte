<script>
	import SEO from '$lib/components/Primary/SEO.svelte';
	import LinkPostCard from '$lib/components/Links/LinkPostCard.svelte';
	import Button from '$lib/components/Primary/Button.svelte';
	export let data;

	let posts = data.data;
	const startOfWeek = data.startDate;
	const endOfWeek = data.endDate;

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
	description="Links and finds from {dateRange}"
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
			<div class="grid divide-y divide-base-300 [&>*:first-child]:border-none">
				{#each posts as post}
					<LinkPostCard {post} />
				{/each}
			</div>
		{/if}
	</div>
</div>
<div class="relative mx-auto mb-8 w-full py-4">
	<div class="absolute inset-0 flex items-center">
		<div class="w-full border-b-[1px] border-base-300"></div>
	</div>
	<div class="relative flex justify-center">
		<a href="/links" class="btn-primary bg-purple"> Back to full archive </a>
	</div>
</div>
