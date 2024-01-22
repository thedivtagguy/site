<script>
	export let weeksCompleted = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
	export let longestStreakThisYear = 0;

	const cellSize = 15;
	const cellSpacing = 5;
	const numRows = 3;
	const numCols = Math.ceil(52 / numRows);

	function getColor(weekIndex) {
		return weeksCompleted.includes(weekIndex) ? '#E8845A' : '#A3A3A2';
	}

	function calcX(index) {
		return (index % numCols) * (cellSize + cellSpacing);
	}

	function calcY(index) {
		return Math.floor(index / numCols) * (cellSize + cellSpacing);
	}
</script>

<div class="flex flex-col justify-between w-full gap-4 mt-4 md:flex-row">
	<div class="calendar">
		<h3 class="pb-2 text-sm font-bold uppercase font-roboto">
			<a
				class="underline decoration-dashed underline-offset-4"
				href="https://tidytues.day/"
				target="_blank">Tidytuesday</a
			> | Year progress
		</h3>
		<svg
			height={numRows * (cellSize + cellSpacing)}
			width="100%"
			viewBox={`0 0 ${numCols * (cellSize + cellSpacing)} ${numRows * (cellSize + cellSpacing)}`}
		>
			{#each Array(52) as _, i}
				<rect x={calcX(i)} y={calcY(i)} width={cellSize} height={cellSize} fill={getColor(i + 1)} />
			{/each}
		</svg>
	</div>
	<div class="streak">
		<h3 class="w-2/3 text-sm font-bold uppercase font-roboto">LONGEST STREAK this year</h3>
		<p class="text-2xl font-bold uppercase font-roboto">
			{longestStreakThisYear}
			{longestStreakThisYear >= 1 ? 'week' : 'weeks'}
		</p>
	</div>
</div>

<style>
	svg {
		display: block;
		width: 100%;
		height: auto;
	}
</style>
