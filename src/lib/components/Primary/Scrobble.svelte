<script>
	import { recentTracks } from '$lib/stores';
	let currentTrack = $recentTracks.track[0];

	console.log(currentTrack);
</script>

{#if currentTrack}
	<div class="flex flex-col items-start justify-end gap-1">
		<div class="mt-1 text-sm font-roboto group text-base-200">
			<span class="mr-1 text-md font-roboto text-base-200">Latest bop </span>
			<span class="hidden group-hover:inline-block">〜(￣▽￣〜) </span>
			<span class="inline-block group-hover:hidden">(〜￣▽￣)〜 </span>
		</div>

		<div class="flex items-end justify-end gap-2 text-base-200">
			{#if currentTrack.image[1]}
				<img src={currentTrack.image[1]['#text']} alt="Track cover" />
			{/if}
			<div>
				<p class="text-lg font-bold font-roboto">{currentTrack.name}</p>
				<p class="p-0 m-0 text-sm font-roboto">by {currentTrack.artist['#text']}</p>
			</div>
		</div>
	</div>
{:else}
	<p>Loading track...</p>
{/if}
