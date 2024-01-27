<script>
	import { MapLibre } from 'svelte-maplibre';
</script>

<MapLibre
	center={[77.5871789, 12.9717847]}
	maxZoom={12}
	minZoom={12}
	class="map"
	style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
/>

<style>
	:global(.map) {
		height: 800px;
	}
</style>
