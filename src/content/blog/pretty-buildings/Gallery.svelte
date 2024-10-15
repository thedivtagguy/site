<script>
	export let slug = 'building-footprints';
	const photos = [
		`/blog/${slug}/Yelahanka-min.webp`,
		`/blog/${slug}/Basavanagudi-min.webp`,
		`/blog/${slug}/Nandini Layout-min.webp`,
		`/blog/${slug}/Majestic-min.webp`,
		`/blog/${slug}/Bangalore-min.webp`
	];
</script>

<div class="gallery">
	{#each photos as photo}
		<img src={photo} alt="building footprints" />
	{/each}
</div>

<style>
	.gallery {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-gap: 1rem;
		margin: 0;
		width: 100%;
		max-width: 100vw;
		padding: 0 1rem;
		box-sizing: border-box;
	}

	.gallery img:first-child {
		grid-column: span 2;
	}

	.gallery img {
		width: 100%;
		height: auto;
		object-fit: cover;
		max-width: 100%;
	}

	@media (max-width: 600px) {
		.gallery {
			grid-template-columns: 1fr;
			grid-gap: 0.5rem;
		}

		.gallery img:first-child {
			grid-column: span 1;
		}
	}
</style>
