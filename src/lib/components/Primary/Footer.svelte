<script>
	import Video from '$lib/assets/output.mp4';
	import Logo from '$lib/assets/svg/Logo.svelte';
	import License from '$lib/assets/images/common/license.png';
	import NotAI from '$lib/assets/images/common/notai.png';
	import { lazyLoadVideo } from '$lib/utils';
</script>

<footer class="relative rounded-lg w-full my-4">
	<video
		style="object-position: center 55%;"
		class="absolute rounded-lg w-full h-full object-cover"
		src={Video}
		autoplay
		muted
		loop
		playsinline
		use:lazyLoadVideo
	></video>
	<div class="relative flex justify-between px-12 py-10 items-center h-full z-10">
		<div class="flex flex-col text-white">
			<Logo width={70} height={120} />
			<img src={License} alt="CC-BY license" class="w-24 mt-4" />
			<img src={NotAI} alt="Made by human, not AI" class="w-24 mt-4" />
		</div>
	</div>
	<div class="absolute top-0 left-0 w-full h-full bg-noise bg-cover z-5"></div>
</footer>

<aside class="font-fira tracking-tighter italic text-xs pb-4">
	If you have been, thanks for reading.
</aside>

<style>
	footer {
		min-height: 600px;
	}

	.bg-noise {
		background-image: url('../../assets/images/common/noise.png');
		background-repeat: repeat;
		background-size: 400px;
	}
</style>
