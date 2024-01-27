<script>
	import { MapLibre, VectorTileSource, LineLayer } from 'svelte-maplibre';
	const bounds = [
		[77.314911, 12.691253],
		[77.858734, 13.214545]
	];
</script>

<MapLibre
	center={[77.5871789, 12.9717847]}
	maxZoom={12}
	minZoom={12}
	class="map"
	attributionControl={false}
	pitch={40}
	maxBounds={bounds}
	style="https://amanbh.netlify.app/osm_liberty.json"
>
	<VectorTileSource url={'pmtiles://https://amanbh.netlify.app/historical.pmtiles'}>
		<LineLayer
			paint={{
				'line-opacity': 0.6,
				'line-color': 'rgb(53, 175, 109)',
				'line-width': 2
			}}
			sourceLayer={'zcta'}
		/>
	</VectorTileSource>
</MapLibre>

<style>
	:global(.map) {
		height: 800px;
		margin-top: -15rem;
		margin-bottom: 2rem;
	}
</style>
