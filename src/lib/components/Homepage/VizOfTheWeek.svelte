<script>
	import Label from '$lib/assets/images/viz.avif';
</script>

<section class="flex flex-col lg:flex-row justify-between items-center">
	<div class="image-container">
		<img src={Label} alt="Viz of the Week" width="200" height="320" />
	</div>
</section>

<style>
	.image-container {
		position: relative;
	}

	.image-container::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: url("data:image/svg+xml,%3Csvg viewBox='0 0 245 245' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='8.51' numOctaves='10' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
		mix-blend-mode: overlay;
		opacity: 1;
	}
</style>
