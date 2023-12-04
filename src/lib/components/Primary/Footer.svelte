<script>
	import Video from '$lib/assets/anfscd.mp4';
	import VideoPoster from '$lib/assets/images/common/poster-footer.webp';
	import Logo from '$lib/assets/svg/Logo.svelte';
	import License from '$lib/assets/images/common/license.png';
	import NotAi from '$lib/assets/svg/NotAi.svelte';
</script>

<footer class="relative rounded-lg w-full my-4">
	<video
		style="object-fit: cover; object-position: center; width: 150%; height: 170%; "
		class="absolute rounded-lg object-cover"
		src={Video}
		autoplay
		muted
		loop
		playsinline
		preload="none"
		poster={VideoPoster}
	></video>

	<div class="relative flex justify-between px-12 py-10 items-center h-full z-10">
		<div class="flex flex-col text-white">
			<Logo width={70} height={120} />
			<img src={License} alt="CC-BY license" class="w-24 mt-4" />
			<NotAi scale={0.8} />
		</div>
	</div>
	<div class="absolute top-0 left-0 w-full h-full bg-noise bg-cover z-5"></div>
	<aside class="font-fira tracking-tighter italic text-xs pb-4">
		If you have been, thanks for reading.
	</aside>
</footer>

<style>
	footer {
		min-height: 500px;
	}

	.bg-noise {
		width: 100%;
		height: 100%;
		filter: contrast(230%) brightness(1000%);
		background: linear-gradient(180deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),
			url("data:image/svg+xml,%3Csvg viewBox='0 0 245 245' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='8.51' numOctaves='10' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
		mix-blend-mode: soft-light;
		opacity: 0.4;
	}
</style>
