<script>
	import { recentTracks } from '$lib/stores';
	let listening = recentTracks();

	let currentTrack;
	if ($listening?.track[0]) currentTrack = $listening.track[0];
</script>

{#if currentTrack}
	<div class="flex flex-row items-start justify-start w-full h-full md:gap-2 md:flex-col">
		<div class="py-1 font-roboto md:py-0 group text-base-200">
			<!-- <span class="hidden text-sm group-hover:block">〜(￣▽￣〜) </span>
			<span class="block group-hover:hidden">(〜￣▽￣)〜 </span> -->
			<h3 class="hidden font-bold md:inline font-roboto text-base-200">Current bop</h3>
		</div>

		<div class="flex justify-end h-full gap-2 md:items-end text-base-200">
			{#if currentTrack.image[1]}
				<figure class="w-full h-full max-w-16">
					<img
						src={currentTrack.image[2]['#text']}
						class="object-cover h-full"
						alt=" Track cover"
					/>
				</figure>
			{/if}
			<div>
				<h3 class="block font-bold md:hidden font-roboto text-base-200">Current bop</h3>

				<p class="font-semibold text-md font-roboto">{currentTrack.name}</p>
				<p class="p-0 m-0 text-sm font-roboto">by {currentTrack.artist['#text']}</p>
			</div>
		</div>
	</div>
{/if}
