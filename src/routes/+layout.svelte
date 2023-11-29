<script>
	import '$lib/styles.css';
	import Header from '$lib/components/Primary/Header.svelte';

	import { onNavigate } from '$app/navigation';

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

<body class="mx-auto flex flex-col max-w-[85rem] justify-center items-center">
	<slot />
</body>
