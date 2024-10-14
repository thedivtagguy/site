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

	let retryCount = 0;
	const maxRetries = 3;
	const retryDelay = 2000;
	let lastFetchTime = null;
	const fetchInterval = 180000;
	// Determine the base URL based on the environment
	const baseUrl = process.env.NODE_ENV === 'development' ? 'https://aman.bh' : '';

	const fetchStats = async () => {
		if (!online || Date.now() - lastFetchTime < fetchInterval) return;

		const url = `${baseUrl}/.netlify/functions/stats`;
		lastFetchTime = Date.now();

		try {
			const response = await fetch(url);
			if (!response.ok) throw new Error('Network response was not ok');
			const data = await response.json();

			battery.set(data.gps.batt);
			listening.set(data.songs);
			online.set(data.online);

			retryCount = 0; // reset retry count on success
		} catch (error) {
			console.error('Failed to fetch stats:', error);
			if (retryCount < maxRetries) {
				setTimeout(fetchStats, retryDelay);
				retryCount++;
			} else {
				// Reset retry count after max retries reached
				retryCount = 0;
			}
		}
	};

	onMount(() => {
		fetchStats();
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
