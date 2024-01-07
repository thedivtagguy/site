<script>
	import Video from '$lib/assets/anfscd.mp4';
	import VideoPoster from '$lib/assets/images/common/poster-footer.webp';
	import Logo from '$lib/assets/svg/Logo.svelte';
	import License from '$lib/assets/images/common/license.png';
	import NotAi from '$lib/assets/svg/NotAi.svelte';
</script>

<footer
	class="mx-auto w-full p-2 max-w-[83rem] border-[1px] rounded-lg rounded-br-none rounded-bl-none border-b-0 border-base-300"
>
	<div class="relative border-none footer">
		<video
			style="object-position: center 55%;"
			class="absolute object-cover border-none w-full h-full rounded-[0.25rem] object"
			src={Video}
			autoplay
			muted
			tabindex="-1"
			loop
			playsinline
			preload="none"
			poster={VideoPoster}
		></video>
		<div class="relative z-10 flex items-start justify-between h-full px-12 py-10">
			<div class="flex flex-col text-white">
				<Logo width={70} height={120} />
				<img src={License} alt="CC-BY license" class="w-24 mt-4" />
			</div>
		</div>
		<div class="absolute top-0 left-0 w-full h-full bg-cover bg-noise z-5"></div>
	</div>

	<aside class="py-2 -mb-2 text-xs italic tracking-tighter text-center font-fira">
		· ✤ ٠ —– ٠ If you have been, thanks for reading —– ✤ ٠ ·
	</aside>
</footer>

<style>
	.footer {
		min-height: 600px;
	}

	.bg-noise {
		width: 100%;
		height: 100%;
		filter: contrast(170%) brightness(100%);
		background: url("data:image/svg+xml,%3Csvg viewBox='0 0 245 245' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='8.51' numOctaves='10' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
		mix-blend-mode: overlay;
		opacity: 0.7;
	}
</style>
