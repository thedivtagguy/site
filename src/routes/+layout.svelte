<script>
	import '$lib/styles.css';
	import Header from '$lib/components/Primary/Header.svelte';
	// import { batteryLevel } from '$lib/stores';
	export let data;
	// batteryLevel.set(data.props.batt);
	import { onNavigate } from '$app/navigation';
	import Footer from '$lib/components/Primary/Footer.svelte';
	import { recentTracks, batteryLevel, isOnline } from '$lib/stores';
	recentTracks();
	batteryLevel();
	isOnline();
	const listening = recentTracks();
	const battery = batteryLevel();
	const online = isOnline();
	battery.set(data.props.batt);
	listening.set(data.props.songs);
	online.set(data.props.online);
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

<Header />

<main
	class="mx-auto scroll-smooth selection:bg-yellow flex px-4 flex-col max-w-[85rem] justify-center items-center"
>
	<slot />
</main>

<footer class="w-full px-4">
	<Footer />
</footer>
