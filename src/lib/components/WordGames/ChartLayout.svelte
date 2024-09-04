<script>
	import WordleLogo from '$lib/assets/images/wordle-logo.png';
	import ConnectionsLogo from '$lib/assets/images/connections-logo.png';
	import MiniLogo from '$lib/assets/images/nyt-logo.png';
	import Chart from './Chart.svelte';
	import gameData from '../../../data/game-results.json';
	import { ToggleGroup, ToggleOption } from 'svelte-ux';

	$: wordleData = gameData.filter((game) => game.game === 'Wordle');
	$: connectionsData = gameData.filter((game) => game.game === 'Connections');
	$: miniData = gameData.filter((game) => game.game === 'Crossword');

	let selectedGame = 'Connections';
</script>

<section class="flex flex-col gap-4 p-4 bg-white border rounded">
	<div class="flex flex-col items-center justify-center gap-4">
		<h2 class="p-0 text-4xl font-bold text-center capitalize font-libre-caslon">
			Who's winning the games?
		</h2>
		<p class="p-0 text-center md:w-1/3 text-neutral week-description text-md">
			<span class="px-1 text-lg font-bold text-white rounded-md font-libre-caslon bg-sage"
				>Rhea</span
			>
			and
			<span class="px-1 text-lg font-bold text-white rounded-md font-libre-caslon bg-purple"
				>Aman</span
			> are pretty competitive about their word games, but who's winning and by what margin?
		</p>
	</div>

	<div class="flex flex-col gap-8 md:flex-row">
		<Chart data={wordleData} gameType="Wordle" logo={WordleLogo} />
		<Chart data={connectionsData} yDomain={[0, 4]} gameType="Connections" logo={ConnectionsLogo} />
		<Chart data={miniData} gameType="Mini" logo={MiniLogo} />
	</div>

	<div>
		<ToggleGroup variant="fill" bind:value={selectedGame} gap>
			<ToggleOption value="Wordle">Wordle</ToggleOption>
			<ToggleOption value="Connections">Connections</ToggleOption>
			<ToggleOption value="Mini">Mini</ToggleOption>
		</ToggleGroup>
	</div>
</section>
