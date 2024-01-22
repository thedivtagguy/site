<script>
	import Banner from '$lib/assets/svg/Banner.svelte';
</script>

<div>
	<header class="relative w-1/3 mx-auto h-60">
		<div class="absolute text-4xl -left-[6%] uppercase -top-3 font-libre-caslon">
			<svg width="400" height="300">
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
		<Banner />
		<div class="absolute left-[35%] top-[30%]">
			<p class="text-3xl font-libre-caslon">as I know it</p>
			<hr class="divide" />
		</div>
		<p class="w-3/5 mx-auto -mt-8 italic text-center text-md font-archivo">
			A map of everywhere I've travelled in the city, updated weekly.
		</p>
	</header>
</div>
