<!-- src/components/HitCounter.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	let hits = 0;
	let loading = true;
	let error: string | null = null;

	async function fetchHits() {
		// Skip API call in development mode to avoid 404 errors
		if (process.env.NODE_ENV === 'development') {
			hits = 42; // Placeholder value for development
			loading = false;
			return;
		}

		try {
			const response = await fetch('/.netlify/functions/hit-counter');
			if (!response.ok) throw new Error('Failed to fetch hits');
			const data = await response.json();
			hits = data.hits;
		} catch (e: unknown) {
			if (e instanceof Error) {
				error = e.message;
			} else {
				error = 'An unknown error occurred';
			}
		} finally {
			loading = false;
		}
	}
	onMount(() => {
		fetchHits();
	});
</script>

<div class="py-4 text-base-100 text-xs font-mono">
	{#if loading}
		<div class="">Loading...</div>
	{:else if error}
		<div class="error text-red-500">{error}</div>
	{:else}
		<div class="hit-counter text-white whitespace-nowrap">
			👁️‍🗨️ {hits} views
		</div>
	{/if}
</div>

<style>
	.hit-counter {
		display: flex;
		align-items: center;
		gap: 0.25rem;
	}

	.error {
		color: #e74c3c;
	}
</style>
