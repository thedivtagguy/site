<script>
	import SEO from '$lib/components/Primary/SEO.svelte';
	import LinkPostCard from '$lib/components/Links/LinkPostCard.svelte';
	import { RssIcon, CalendarIcon } from 'lucide-svelte';
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

<div class="  w-full border-base-300">
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
	<div class="relative w-full grid-cols-1 gap-0 lg:grid-cols-5 border-base-300 grid">
		<div
			class="flex absolute top-0 justify-between items-center mx-auto w-full px-4 py-2 border-b border-base-300"
		>
			<a
				href="/links/atom.xml"
				class="flex items-center gap-2 text-sm text-base-content/60 hover:text-base-content"
				title="RSS Feed"
			>
				<RssIcon class="w-4 h-4" />

				RSS Feed
			</a>

			<a
				href="/links/week"
				class="flex items-center gap-2 text-sm text-base-content/60 hover:text-base-content"
				title="View this week's links"
			>
				<CalendarIcon class="w-4 h-4" />
				This week
			</a>
		</div>
		<div class="col-span-5 mx-auto py-8">
			<div class="grid divide-y divide-base-300 [&>*:first-child]:border-none">
				{#each posts as post}
					<LinkPostCard {post} />
				{/each}
			</div>
		</div>
	</div>
</div>
