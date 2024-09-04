<script>
	import {
		Chart,
		Svg,
		Axis,
		Spline,
		Text,
		Highlight,
		Tooltip,
		TooltipItem,
		Points
	} from 'layerchart';
	import { scaleOrdinal, scaleTime, flatGroup, curveCatmullRom, randomNormal } from 'd3';
	import { regressionLoess } from 'd3-regression';

	export let data;
	export let gameType;
	export let yDomain = [0, null];
	export let logo;

	const playerColors = { Rhea: '#949B80', Aman: '#4F4E8D' };

	$: processedData = processData(data, gameType);
	$: regressionLines = calculateRegressionLines(processedData.dataByPlayer);

	function processData(rawData, type) {
		const jitter = randomNormal(0, 0.05);
		const filteredData = rawData.filter(
			(d) => ['Rhea', 'Aman'].includes(d.winner) && d.winner !== 'Tie'
		);

		const jitteredData = filteredData.map((d) => ({
			...d,
			date: new Date(d.date),
			jitteredMargin: d.margin + jitter()
		}));

		const dataByPlayer = flatGroup(jitteredData, (d) => d.winner);

		return { jitteredData, dataByPlayer };
	}

	function calculateRegressionLines(dataByPlayer) {
		return dataByPlayer.map(([player, playerData]) => {
			const regression = regressionLoess()
				.x((d) => d.date.getTime())
				.y((d) => d.margin)
				.bandwidth(0.2);
			const regressionData = regression(playerData);
			return {
				player,
				data: regressionData.map(([x, y]) => ({ date: new Date(x), margin: y }))
			};
		});
	}

	function formatValue(value) {
		if (gameType === 'Mini') {
			if (value < 60) {
				return `${value.toFixed(0)} secs`;
			} else {
				const minutes = value / 60;
				return `${minutes.toFixed(1)} mins`;
			}
		} else {
			return value.toFixed(0);
		}
	}

	function formatAxisLabel(value, isLast) {
		if (gameType === 'Mini') {
			if (value < 60) {
				return `${value}s${isLast ? ' (secs)' : ''}`;
			} else {
				const minutes = value / 60;
				return `${minutes.toFixed(1)}${isLast ? ' (mins)' : ''}`;
			}
		} else {
			return `${value}${isLast ? ' (moves)' : ''}`;
		}
	}
</script>

<div class="h-[330px] w-full">
	<h3
		class="flex items-center justify-center gap-2 mb-6 text-2xl font-bold text-center font-libre-caslon"
	>
		<span class="inline-block size-5">
			<img src={logo} alt={gameType} />
		</span>
		{gameType}
	</h3>
	<Chart
		data={processedData.jitteredData}
		x="date"
		xScale={scaleTime()}
		y="jitteredMargin"
		{yDomain}
		r="winner"
		yTicks={10}
		rScale={scaleOrdinal()}
		rDomain={Object.keys(playerColors)}
		rRange={Object.values(playerColors)}
		padding={{ left: 16, bottom: 80, right: 20 }}
		tooltip={{ mode: 'bisect-x' }}
		let:rScale
	>
		<Svg>
			<Axis
				placement="left"
				tickLabelProps={{ class: 'font-bold font-mono', dx: -10 }}
				grid={{ class: 'stroke-neutral/10' }}
				rule={{ class: 'stroke-neutral/10' }}
				tickLength={4}
				format={(value) => formatAxisLabel(value)}
			/>
			<Axis
				placement="bottom"
				grid={{ class: 'stroke-neutral/10' }}
				tickLabelProps={{ class: 'font-semi font-mono', dy: 10 }}
				format={(d) => d.toLocaleDateString('en-US', { month: 'short' })}
			/>
			{#each processedData.dataByPlayer as [player, playerData]}
				{@const color = rScale(player)}
				<Points r={2} fill-opacity={0.4} stroke-width={0.2} stroke={color} stroke-opacity={0.5} />
				<Spline
					data={regressionLines.find((line) => line.player === player).data}
					x="date"
					y="margin"
					curve={curveCatmullRom}
					class="stroke-2"
					stroke={color}
				>
					<svelte:fragment slot="end">
						{#if gameType === 'Connections'}
							<circle r={4} fill={color} />
							<Text
								value={player}
								verticalAnchor="middle"
								dx={6}
								dy={-2}
								class="text-sm font-semibold text-neutral drop-shadow-sm"
								fill={color}
							/>
						{/if}
					</svelte:fragment>
				</Spline>
			{/each}
			<Highlight points lines={{ class: 'stroke-neutral stroke-1' }} />
			{#each regressionLines as line}
				<Highlight data={line.data} y="margin" />
			{/each}
		</Svg>
		<Tooltip
			y={100}
			xOffset={10}
			classes={{
				root: 'bg-white rounded-md border border-neutral/10'
			}}
			let:data
			header={data.date}
		>
			<TooltipItem
				label="Date"
				value={data.date.toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric',
					...(gameType === 'Mini' && { weekday: 'short' })
				})}
			/>
			<TooltipItem label="Winner" value={data.winner} />
			<TooltipItem
				label="Won by"
				value={formatValue(data.margin) + ' ' + (gameType === 'Mini' ? '' : 'moves')}
			/>
		</Tooltip>
	</Chart>
</div>
