<!-- src/components/HitCounter.svelte -->
<script>
	import { onMount } from 'svelte';
	let hits = 0;
	let loading = true;
	let error = null;
	async function fetchHits() {
		try {
			const response = await fetch('/.netlify/functions/hit-counter');
			if (!response.ok) throw new Error('Failed to fetch hits');
			const data = await response.json();
			hits = data.hits;
		} catch (e) {
			error = e.message;
		} finally {
			loading = false;
		}
	}
	onMount(() => {
		fetchHits();
	});
</script>

<div class="py-4 text-base-100 font-mono">
	{#if loading}
		<div class="">Loading...</div>
	{:else if error}
		<div class="error text-red-500">{error}</div>
	{:else}
		<div class="hit-counter">
			👁️‍🗨️ {hits} views
		</div>
	{/if}
</div>

<style>
	.hit-counter {
		font-size: 0.9rem;
		color: #666;
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.error {
		color: #e74c3c;
		font-size: 0.9rem;
	}
</style>
