<script>
	import '$lib/styles.css';
	import Header from '$lib/components/Primary/Header.svelte';
	import Footer from '$lib/components/Primary/Footer.svelte';
	import { onNavigate } from '$app/navigation';
	import { recentTracks, batteryLevel, isOnline } from '$lib/stores';
	import { onMount } from 'svelte';

	const listening = recentTracks();
	const battery = batteryLevel();
	const online = isOnline();

	onMount(async () => {
		try {
			const response = await fetch('/.netlify/functions/stats');
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const data = await response.json();

			battery.set(data.gps.batt);
			listening.set(data.songs);
			online.set(data.online);
		} catch (error) {
			console.error('Failed to fetch stats:', error);
		}
	});

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link href="/light-favicon.png" rel="icon" media="(prefers-color-scheme: light)" />
	<link href="/dark-favicon.png" rel="icon" media="(prefers-color-scheme: dark)" />
</svelte:head>
<Header />

<main
	class="mx-auto scroll-smooth selection:bg-yellow flex px-4 flex-col max-w-[85rem] justify-center items-center"
>
	<slot />
</main>

<footer class="w-full px-4">
	<Footer />
</footer>
