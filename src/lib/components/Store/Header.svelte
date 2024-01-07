<script>
	import MapBG from '$lib/assets/images/store/map-bg.webp';
	import Banner from '$lib/assets/images/store/banner.webp';
</script>

<header
	style="background-image: url({MapBG}); --banner-bg: url({MapBG});"
	class="relative banner max-w-[83rem] py-2 border-2 border-neutral h-[var(--banner-height)] lg:max-h-[var(--banner-height)] mt-3 -mb-1 w-full"
>
	<div
		style="--label: url({Banner});"
		class="flex label relative flex-col items-center z-10 h-full justify-center py-6 overflow-hidden max-h-[var(--banner-height)] lg:max-h-[var(--banner-height)] md:flex-row"
	>
		<h1 class="z-10 italic text-7xl">Print <br /> Store</h1>
	</div>
</header>

<style>
	:root {
		--banner-height: 15rem;
	}

	header {
		border-radius: 0.4rem;
	}
	h1 {
		text-shadow:
			-1px -1px 0px #d9d9d9,
			3px 3px 0px #d9d9d9,
			5px 5px 0px #00000055;
	}

	.banner:after {
		position: absolute;
		content: '';
		top: 0;
		border-radius: 0.8rem;
		width: 100%;
		height: 100%;
		opacity: 0.4;
		left: 0;
		background-color: black;
		z-index: 1;
		pointer-events: none;
	}

	.label:before {
		position: absolute;
		content: '';
		top: 0;
		width: 100%;
		height: 100%;
		background-size: contain;
		left: 0;
		background-position: center;
		background-repeat: no-repeat;
		background-image: var(--label);
		z-index: 1;
		pointer-events: none;
	}
</style>
