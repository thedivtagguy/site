<script>
	import Banner from '$lib/assets/svg/Banner.svelte';
	import Traveller from '$lib/assets/images/traveller.webp';
	import TravelMap from './TravelMap.svelte';
</script>

<div class="relative mt-[15rem]">
	<div class="hidden select-none md:block">
		<pre class="absolute text-base-300 left-0 -top-[13rem]">
		
				,--.
				(    )
			   -   _'-.
			  (       ) ),
			_--            )-.
		   (__________________)
		
		</pre>
		<pre class="absolute text-base-300 text-xs right-0 -top-[10rem]">
		
		    	,--.
		     	(    )
		      -  _'-.
		   _--            )-.
		   (__________________)
		
		</pre>
	</div>
	<img
		width="160"
		height="200"
		src={Traveller}
		alt="Watch me go"
		class="absolute left-[28%] md:left-[43.5%] -top-[9.2rem] md:-top-[10rem]"
	/>

	<header class="relative mx-auto md:w-1/3 h-60">
		<div
			class="absolute text-4xl z-20 -left-[25%] md:-left-[7%] uppercase -top-4 font-libre-caslon"
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
			<div class="absolute left-[30%] md:left-[36%] top-[33%] md:top-[43%]">
				<p class="text-3xl font-libre-caslon">as I know it</p>
				<hr class="divide" />
			</div>
			<div class="flex items-center justify-center -mt-3 md:ml-2 md:-mt-10">
				<p class="w-4/6 px-2 text-sm italic text-center md:text-md font-archivo">
					A map of (almost) everywhere <span class="text-[#F26D3D] font-bold">I've travelled</span> in
					the city, updated weekly.
				</p>
			</div>
		</div>
	</header>
</div>
<TravelMap />
