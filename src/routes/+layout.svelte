<script>
	import '$lib/styles.css';
	import Header from '$lib/components/Primary/Header.svelte';

	import { onNavigate } from '$app/navigation';
	import Footer from '$lib/components/Primary/Footer.svelte';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	export let data;
	let gpsInfo = data.data;
</script>

<Header {gpsInfo} />

<main
	class="mx-auto scroll-smooth selection:bg-yellow flex px-4 flex-col max-w-[85rem] justify-center items-center"
>
	<slot />
</main>

<footer class="w-full px-4">
	<Footer />
</footer>
