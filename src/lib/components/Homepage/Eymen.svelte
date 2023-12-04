<script>
	import slide1 from '$lib/assets/images/common/eymen-1.webp';
	import slide2 from '$lib/assets/images/common/eymen-2.webp';
	import Eymen from '$lib/assets/eymen.webm';
</script>

<div class="relative">
	<video src={Eymen} autoplay muted loop playsinline preload="none" poster={slide1}></video>
	<div class="absolute top-0 left-0 w-full h-full bg-noise bg-cover z-5"></div>
</div>

<style>
	.bg-noise {
		width: 100%;
		height: 100%;
		filter: contrast(170%) brightness(3000%);
		background: linear-gradient(180deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),
			url("data:image/svg+xml,%3Csvg viewBox='0 0 245 245' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='8.51' numOctaves='10' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
		mix-blend-mode: soft-light;
		opacity: 0.4;
	}
</style>
