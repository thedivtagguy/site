<script>
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';

	let hits = 0;
	let prevHits = 0;
	let isAnimating = false;
	let loading = dev ? false : true;
	let error = null;
	let counterElement;
	let isVisible = false;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const wasVisible = isVisible;
				isVisible = entries[0].isIntersecting;

				// Trigger initial animation when component comes into view
				if (!wasVisible && isVisible) {
					animateToCurrentValue();
				}
			},
			{ threshold: 0.1 }
		);

		if (counterElement) {
			observer.observe(counterElement);
		}

		return () => observer.disconnect();
	});

	function animateToCurrentValue() {
		if (hits !== prevHits) {
			isAnimating = true;
			setTimeout(() => {
				isAnimating = false;
			}, 1000);
		}
	}

	async function fetchHits() {
		try {
			if (dev) {
				const mockHits = Math.floor(Math.random() * 100000);
				if (isVisible && mockHits !== hits) {
					prevHits = hits;
					hits = mockHits;
					animateToCurrentValue();
				}
				return;
			}

			const response = await fetch('/.netlify/functions/hit-counter');
			if (!response.ok) throw new Error('Failed to fetch hits');
			const data = await response.json();

			if (isVisible && data.hits !== hits) {
				prevHits = hits;
				hits = data.hits;
				animateToCurrentValue();
			}
		} catch (e) {
			error = e.message;
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		// Initial fetch
		fetchHits();

		const interval = setInterval(() => {
			fetchHits();
		}, 3000);

		return () => clearInterval(interval);
	});

	function padNumber(num) {
		return num.toString().padStart(5, '0');
	}

	function formatDate(daysFromNow = 7) {
		const date = new Date();
		date.setDate(date.getDate() + daysFromNow);
		return date.toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	}

	$: digits = padNumber(hits).split('');
	$: prevDigits = padNumber(prevHits).split('');
	$: visitorText = `${hits.toLocaleString()} visitors till ${formatDate()}`;
</script>

{#if loading}
	<div class="text-gray-600">Loading...</div>
{:else if error}
	<div class="text-red-500 text-sm">{error}</div>
{:else}
	<div
		bind:this={counterElement}
		class="flex flex-col py-5 items-center text-neutral select-none gap-2"
		aria-label={visitorText}
		title={visitorText}
	>
		<div class="flex gap-[1px]">
			{#each digits as digit, i}
				<div class="relative h-5 w-5 overflow-hidden bg-base-100 rounded-sm">
					<!-- Previous number (for transition) -->
					{#if isAnimating && prevDigits[i] !== digit}
						<div
							class="absolute w-full h-5 transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]"
							style="transform: translateY(-100%); opacity: 0;"
						>
							<div
								class="h-5 flex items-center justify-center text-green-400 font-mono text-xl font-bold border-b border-gray-700/50"
								style="background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.4) 100%)"
							>
								{prevDigits[i]}
							</div>
						</div>
					{/if}

					<!-- Current number -->
					<div
						class="absolute w-full transition-all duration-1000"
						class:ease-[cubic-bezier(0.4,0,0.2,1)]={isAnimating}
						style="transform: translateY(-{parseInt(digit) * 100}%)"
					>
						{#each Array(10) as _, num}
							<div
								class="h-5 flex items-center justify-center text-green-400 font-mono text-xl font-bold border-b border-gray-700/50"
								style="background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0.4) 100%)"
							>
								{num}
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</div>
{/if}
