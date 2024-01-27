<script>
	import Banner from '$lib/assets/svg/Banner.svelte';
	import Traveller from '$lib/assets/images/traveller.webp';
	import TravelMap from './TravelMap.svelte';
</script>

<div class="relative mt-[14rem]">
	<img
		width="200"
		src={Traveller}
		alt="Watch me go"
		class="absolute left-[23%] md:left-[42%] -top-[13rem]"
	/>
	<header class="relative mx-auto md:w-1/3 h-60">
		<div
			class="absolute text-4xl z-20 -left-[12%] md:-left-[6%] uppercase -top-3 font-libre-caslon"
		>
			<svg width="400" height="70">
				<path
					id="curve"
					fill="transparent"
					d="M 73.2 148.6 c -102.2 -45.6 65.5 -96.8 178.6 -95.6 c 111.3 1.2 257.2 56 175.1 97"
				/>
				<text>
					<textPath href="#curve" class="text-path" startOffset="28%"> ✺ Bangalore ✺</textPath>
				</text>
			</svg>
		</div>

		<div class="relative z-10 banner">
			<Banner />
			<div class="absolute left-[35%] top-[40%]">
				<p class="text-3xl font-libre-caslon">as I know it</p>
				<hr class="divide" />
			</div>
			<p
				class="w-4/6 mx-auto -mt-8 text-sm italic text-center md:w-3/5 md:-mt-8 md:text-md font-archivo"
			>
				A map of everywhere I've travelled in the city, updated weekly.
			</p>
		</div>
	</header>
</div>
<TravelMap />

<style>
	.banner::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 60px;
		background-color: white;
		z-index: -1;
	}
</style>
