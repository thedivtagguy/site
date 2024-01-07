<script>
	import L from 'leaflet';
	import { getContext } from 'svelte';

	export let lat = 0;
	export let lng = 0;

	let map = getContext('leafletMapInstance');

	L.marker([lat, lng]).addTo(map);
</script>
