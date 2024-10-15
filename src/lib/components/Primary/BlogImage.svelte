<script>
	import Lightbox from 'svelte-lightbox';
	export let src;
	export let alt;
</script>

<figure>
	<Lightbox>
		<img {src} {alt} />
	</Lightbox>
	{#if alt}
		<figcaption>{alt}</figcaption>
	{/if}
</figure>

<style>
	figure {
		margin: 0;
		text-align: center;
	}
	img {
		max-width: 100%;
		height: auto;
		cursor: pointer;
	}
	figcaption {
		font-style: italic;
		margin-top: 0.5em;
	}
</style>
