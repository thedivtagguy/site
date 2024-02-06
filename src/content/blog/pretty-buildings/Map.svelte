<script>
	import { onMount } from 'svelte';
	function loadMap() {
		// Create a new map.
		const map = new mapboxgl.Map({
			container: 'map',
			accessToken:
				'pk.eyJ1IjoidGhlZGl2dGFnZ3V5IiwiYSI6ImNpcWM4N3FlaDAxd2Nmd20xejdwdmVoNmwifQ.Toi-P83h-0tC_mj60h25rg',
			style: 'mapbox://styles/mapbox/streets-v12',
			center: [78.9629, 20.5937],
			zoom: 4
		});

		map.on('load', () => {
			// Add a source for the state polygons.
			map.addSource('states', {
				type: 'geojson',
				data: 'https://gist.githubusercontent.com/thedivtagguy/8d3c9b5ea4dde9ddde4c5ec5ef661803/raw/4d601e4653df61a310586c18074f67bd33f567ef/rewound-geojson.json'
			});

			// Add a layer showing the state polygons.
			map.addLayer({
				id: 'states-layer',
				type: 'fill',
				source: 'states',
				paint: {
					'fill-color': 'rgba(200, 100, 240, 0.4)',
					'fill-outline-color': 'rgba(200, 100, 240, 1)'
				}
			});

			map.on('click', 'states-layer', (e) => {
				new mapboxgl.Popup()
					.setLngLat(e.lngLat)
					.setHTML(e.features[0].properties.QuadKey)
					.addTo(map);
			});

			// Change the cursor to a pointer when
			// the mouse is over the states layer.
			map.on('mouseenter', 'states-layer', () => {
				map.getCanvas().style.cursor = 'pointer';
			});

			// Change the cursor back to a pointer
			// when it leaves the states layer.
			map.on('mouseleave', 'states-layer', () => {
				map.getCanvas().style.cursor = '';
			});
		});
	}

	onMount(loadMap);
</script>

<svelte:head>
	<link href="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.css" rel="stylesheet" />
	<script src="https://api.mapbox.com/mapbox-gl-js/v2.13.0/mapbox-gl.js"></script>
</svelte:head>

<div class="container">
	<div id="map" />
</div>

<style>
	.container {
		position: relative;
		width: 100%;
		height: 100%;
	}
	#map {
		position: relative;
		top: 0;
		bottom: 0;
		height: 500px;
	}
	.mapboxgl-popup {
		max-width: 400px;
		font:
			12px/20px 'Helvetica Neue',
			Arial,
			Helvetica,
			sans-serif;
	}
</style>
