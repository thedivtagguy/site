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
</script>

<Header />

<body class="mx-auto flex px-4 flex-col max-w-[85rem] justify-center items-center">
	<slot />
</body>

<footer class="px-4 w-full">
	<Footer />
</footer>
