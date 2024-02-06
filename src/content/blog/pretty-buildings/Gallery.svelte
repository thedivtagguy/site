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
		grid-template-columns: repeat(2, 2fr);
		grid-gap: 1rem;
		margin: 0 0;
	}

	.gallery img:first-child {
		grid-column: span 2;
	}

	.gallery img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	@media (max-width: 600px) {
		.gallery {
			grid-template-columns: repeat(1, 1fr);
		}
	}
</style>
