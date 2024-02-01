<script>
	import { MapLibre, VectorTileSource, LineLayer, Marker, Popup } from 'svelte-maplibre';
	import { markers } from './map_pois';
	import { tiles } from '$lib/stores';

	const tileData = tiles();
	let clickedName = '';
	const bounds = [
		[77.314911, 12.691253],
		[77.858734, 13.214545]
	];
</script>

<MapLibre
	center={[77.5871789, 12.9717847]}
	maxZoom={10.9}
	minZoom={10.9}
	bearing={42}
	class="map"
	attributionControl={false}
	pitch={45}
	maxBounds={bounds}
	style="https://amanbh.netlify.app/osm_liberty.json"
>
	{#each markers as { lngLat, label, name } (label)}
		<Marker
			{lngLat}
			on:click={() => (clickedName = name)}
			class="grid text-lg font-bold text-[#73022C] focus:outline-2 focus:outline-black place-items-center"
		>
			<span style="-webkit-text-stroke: 0.5px black;">⚑</span>
			<Popup popupClass="z-[900]" openOn="hover" offset={[0, -10]}>
				<div class="max-w-[14rem]">
					<div class="pb-2 text-xl font-bold font-libre-caslon">« {name} »</div>
					<div class="text-xs text-neutral font-archivo">{label}</div>
				</div>
			</Popup>
		</Marker>
	{/each}
	<VectorTileSource url={$tileData.routes}>
		<LineLayer
			paint={{
				'line-opacity': 0.8,
				'line-color': '#F26D3D',
				'line-width': 1.2
			}}
			sourceLayer={'zcta'}
		/>
	</VectorTileSource>
</MapLibre>

<style>
	:global(.map) {
		height: 600px;
		margin-top: -17rem;
		margin-bottom: 2rem;
	}
</style>
