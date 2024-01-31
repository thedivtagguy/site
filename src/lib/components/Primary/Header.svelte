<script>
	import { page } from '$app/stores';
	import BatteryPercentage from '$lib/assets/svg/BatteryPercentage.svelte';
	import Logo from '$lib/assets/svg/Logo.svelte';
	import Menu from './Menu.svelte';
	const issueTime = process.env.BUILD_TIME;
	import { batteryLevel } from '$lib/stores';
	$: console.log($batteryLevel);
	$: isHome = $page.url.pathname === '/';

	const headline = "Aman's general mishmash of  design, data & code";
	const subtitle = 'The definite, Illustrated & annotated anthology of my varied pastimes';
</script>

<header
	class="flex selection:bg-yellow max-w-[85rem] mx-auto w-full px-4 flex-col justify-center items-center mt-1"
>
	<div
		class="flex border-b-[1px] border-t-[1px] border-base-300 flex-col items-center justify-start w-full mt-2 text-center"
		class:row={!isHome}
	>
		{#if !isHome}
			<p class="w-full max-w-md text-[0.7rem] uppercase" class:notHome={!isHome}>
				issue dated <span class="inline-block">{issueTime}</span>
				<i class="block">Bangalore, India</i>
			</p>
		{/if}
		{#if isHome}
			<p class="flex items-center justify-between w-full text-xs uppercase" class:notHome={!isHome}>
				<span class="text-xs">&nbsp;</span>
				<span>issue dated {issueTime} <i>Bangalore, India</i></span>
				<BatteryPercentage percentage={$batteryLevel} width="1.3em" />
			</p>
			<h1 class="relative text-5xl font-bold text-center uppercase lg:text-7xl">
				{@html headline}
			</h1>
		{:else}
			<div class="w-full">
				<Menu showBorders={false} />
			</div>
		{/if}

		<p
			class="md:w-full w-2/3 {isHome ? 'text-center text-xs' : 'text-left text-[0.7rem]'} uppercase"
			class:notHome={!isHome}
		>
			{subtitle}
		</p>
		{#if !isHome}
			<Logo class="hidden mx-4 size-12 md:block" />
		{/if}
	</div>
	{#if isHome}
		<div class="w-full -mt-2">
			<Menu />
		</div>
	{/if}
</header>

<style>
	p {
		@apply font-bold text-neutral font-fira my-1;
	}

	.row {
		@apply w-full px-0 justify-between flex-row-reverse;
	}

	p.notHome {
		width: 34%;
	}

	p.notHome:first-child {
		text-align: right;
		hanging-punctuation: first;
	}

	p.notHome:last-child {
		text-align: left;
	}

	@media (max-width: 968px) {
		p.notHome {
			display: none;
		}

		.row {
			justify-content: center;
		}
	}
</style>
