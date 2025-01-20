<script>
	import { page } from '$app/stores';

	$: error = $page.error;
	$: hasNearestWeeks =
		error?.nearestWeeks && (error.nearestWeeks.previous || error.nearestWeeks.next);
</script>

{#if $page.status === 404}
	<div class="error-container">
		<h1>Weekly Link Not Found</h1>
		<p>{error.message}</p>

		{#if error.suggestion}
			<div class="suggestion">
				<p>💡 {error.suggestion}</p>
			</div>
		{/if}

		{#if hasNearestWeeks}
			<div class="nearest-weeks">
				<h2>Available Weeks</h2>
				<div class="week-links">
					{#if error.nearestWeeks.previous}
						<a href="/links/week/{error.nearestWeeks.previous}" class="week-link">
							← Week {error.nearestWeeks.previous}
						</a>
					{/if}

					{#if error.nearestWeeks.next}
						<a href="/links/week/{error.nearestWeeks.next}" class="week-link">
							Week {error.nearestWeeks.next} →
						</a>
					{/if}
				</div>
			</div>
		{/if}

		<a href="/links" class="browse-all">Browse all weekly links</a>
	</div>
{:else}
	<div class="error-container">
		<h1>Error {$page.status}</h1>
		<p>{error.message}</p>
	</div>
{/if}

<style>
	.error-container {
		max-width: 600px;
		margin: 2rem auto;
		padding: 2rem;
		text-align: center;
	}

	h1 {
		color: #e74c3c;
		font-size: 2rem;
		margin-bottom: 1rem;
	}

	h2 {
		font-size: 1.5rem;
		margin: 1.5rem 0 1rem;
		color: #2c3e50;
	}

	.suggestion {
		background-color: #f7f9fc;
		padding: 1rem;
		border-radius: 8px;
		margin: 1rem 0;
	}

	.nearest-weeks {
		margin: 2rem 0;
	}

	.week-links {
		display: flex;
		gap: 1rem;
		justify-content: center;
		margin: 1rem 0;
	}

	.week-link {
		padding: 0.5rem 1rem;
		color: #2c3e50;
		text-decoration: none;
		border: 1px solid #3498db;
		border-radius: 4px;
		transition: all 0.2s ease;
	}

	.week-link:hover {
		background-color: #3498db;
		color: white;
	}

	.browse-all {
		display: inline-block;
		margin-top: 1rem;
		padding: 0.5rem 1rem;
		color: #fff;
		background-color: #3498db;
		text-decoration: none;
		border-radius: 4px;
	}

	.browse-all:hover {
		background-color: #2980b9;
	}
</style>
