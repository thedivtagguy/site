<script>
	import { onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	export let location;

	let map;
	let mapElement;
	let L;
	let markerLayers;
	let icon;

	async function start_map() {
		try {
			L = window.L;
			map = createMap(mapElement);
			markerLayers = L.layerGroup();
			markerLayers.addTo(map);

			icon = L.icon({
				iconUrl: '_bicycle.gif',
				iconSize: [50, 50] // size of the icon
			});
		} catch (error) {
			console.error(error);
		}
	}

	function createMap(container) {
		try {
			let m = L.map(container, { preferCanvas: true }).setView(location, 15);
			L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}).addTo(m);

			return m;
		} catch (error) {
			console.error(error);
		}
	}

	function createMarker(loc, icon) {
		let marker = L.marker(loc, { icon: icon }).addTo(map).bindPopup('popup text');
		return marker;
	}

	function resizeMap() {
		if (map) {
			map.invalidateSize();
		}
	}

	$: if (map && location && markerLayers) {
		try {
			const marker = createMarker(location, icon);
			markerLayers.addLayer(marker);
		} catch (error) {
			console.error(error);
		}
	}

	onDestroy(() => {
		try {
			if (browser && map) {
				markerLayers?.clearLayers?.();
				map?.off?.();
			}
		} catch (error) {
			console.error(error);
		}
	});
</script>

<svelte:window on:resize={resizeMap} />

<svelte:head>
	<script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js" on:load={start_map}></script>
	<link
		rel="stylesheet"
		href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
		integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
		crossorigin=""
	/>
</svelte:head>

<div class="map" bind:this={mapElement} />

<style>
	.map :global(.marker-text) {
		width: 100%;
		height: 300px;
		text-align: center;
		font-weight: 600;
		background-color: #444;
		color: #eee;
		border-radius: 0.5rem;
	}

	.map :global(.map-marker) {
		width: 30px;
		transform: translateX(-50%) translateY(-25%);
	}
</style>
