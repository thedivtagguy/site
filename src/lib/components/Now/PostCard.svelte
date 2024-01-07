<script>
	import PostCard from '$lib/assets/images/postcard.webp';
	export let content;
</script>

<figure class="relative hidden py-12 mx-auto lg:block font-fira rotate-6">
	<img height="100" width="1000" src={PostCard} alt="Now" class="noise-image image-shadow" />
	<caption class="absolute max-w-sm text-xs font-semibold text-left top-40 font-fira left-20"
		><svelte:component this={content} /></caption
	>
</figure>
<figure
	class="relative w-[800px] -ml-28 block py-12 mt-24 overflow-hidden rotate-[80deg] lg:hidden font-fira"
>
	<img src={PostCard} alt="Now" class="noise-image image-shadow" />
	<caption
		class="absolute max-w-sm text-[.65rem] font-semibold text-left -rotate-[90deg] bottom-40 font-fira left-0"
		><svelte:component this={content} /></caption
	>
</figure>

<style>
	img {
		filter: saturate(0.7);
	}
</style>
