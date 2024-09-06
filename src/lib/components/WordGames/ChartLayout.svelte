<script>
	import WordleLogo from '$lib/assets/images/wordle-logo.png';
	import ConnectionsLogo from '$lib/assets/images/connections-logo.png';
	import MiniLogo from '$lib/assets/images/nyt-logo.png';
	import Chart from './Chart.svelte';
	import gameData from '../../../data/game-results.json';
	import { slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { Info } from 'lucide-svelte';

	$: wordleData = gameData.filter((game) => game.game === 'Wordle');
	$: connectionsData = gameData.filter((game) => game.game === 'Connections');
	$: miniData = gameData.filter((game) => game.game === 'Crossword');

	let selectedGame = 'Connections';

	function handleSelect(game) {
		selectedGame = game;
	}
</script>

<section class="flex flex-col my-8 gap-4 p-4 bg-white border rounded">
	<div class="flex flex-col items-center justify-center gap-4">
		<h2 class="p-0 text-4xl font-bold text-center capitalize font-libre-caslon">
			Who's ahead in the word games?
		</h2>
		<p class="py-2 text-center md:w-2/5 text-neutral week-description text-md">
			<span class="px-1 text-lg font-bold text-white rounded-md font-libre-caslon bg-sage"
				>Rhea</span
			>
			and
			<span class="px-1 text-lg font-bold text-white rounded-md font-libre-caslon bg-purple">I</span
			>
			have been tracking our NYT word games and we're pretty competitive about it. Who's winning and
			<span class="font-bold">by what margin?</span>
		</p>
	</div>

	<div class="flex-col py-4 px-2 hidden gap-12 md:flex md:flex-row">
		<Chart data={wordleData} gameType="Wordle" logo={WordleLogo} />
		<Chart data={connectionsData} yDomain={[0, 4]} gameType="Connections" logo={ConnectionsLogo} />
		<Chart data={miniData} gameType="Mini" logo={MiniLogo} />
	</div>

	<div class="md:hidden">
		{#each ['Wordle', 'Connections', 'Mini'] as game}
			{#if selectedGame === game}
				<div>
					<Chart
						data={game === 'Wordle'
							? wordleData
							: game === 'Connections'
							? connectionsData
							: miniData}
						gameType={game}
						logo={game === 'Wordle'
							? WordleLogo
							: game === 'Connections'
							? ConnectionsLogo
							: MiniLogo}
						yDomain={game === 'Connections' ? [0, 4] : undefined}
					/>
				</div>
			{/if}
		{/each}
	</div>
	<div class="flex justify-center gap-4 mt-6 md:hidden">
		{#each ['Wordle', 'Connections', 'Mini'] as game}
			<button
				class="flex items-center pointer-events-auto gap-2 p-2 rounded-md w-fit {game ===
				selectedGame
					? 'text-white bg-neutral/50'
					: 'bg-base-200'}"
				on:click={() => handleSelect(game)}
			>
				<img
					class="p size-8"
					src={game === 'Wordle' ? WordleLogo : game === 'Connections' ? ConnectionsLogo : MiniLogo}
					alt={game}
				/>
			</button>
		{/each}

		{#key selectedGame}
			<div
				class="absolute top-0 left-0 h-full transition-all duration-300 ease-out rounded-md bg-neutral"
				transition:slide={{ duration: 300, easing: cubicOut }}
			></div>
		{/key}
	</div>

	<a
		href="/colophon/#word-games"
		class="mt-2 z-10 w-fit mx-auto hover:underline underline-offset-4 decoration-dashed text-neutral/50 transition-all duration-100 ease-out hover:text-neutral"
	>
		<p class="text-center flex justify-center items-center gap-1 text-xs">
			<Info class="inline-block size-3" />
			Last updated on {process.env.BUILD_TIME}
		</p>
	</a>
</section>
