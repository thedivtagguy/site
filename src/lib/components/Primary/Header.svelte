<script>
	import { page } from '$app/stores';
	import BatteryPercentage from '$lib/assets/svg/BatteryPercentage.svelte';
	import Logo from '$lib/assets/svg/Logo.svelte';
	import Menu from './Menu.svelte';
	import MobileMenu from './MobileMenu.svelte';
	const issueTime = process.env.BUILD_TIME;
	export let gpsInfo;

	$: isHome = $page.url.pathname === '/';

	const headline = "Aman's general mishmash of  design, data & code";
	const subtitle = 'The definite, Illustrated & annotated anthology of my varied pastimes';
</script>

<header
	class="flex selection:bg-yellow max-w-[85rem] w-full px-4 flex-col justify-center items-center mt-4"
>
	<hr class="divide" />

	<div class="flex flex-col justify-start my-2 items-center text-center w-full" class:row={!isHome}>
		{#if !isHome}
			<p class="uppercase flex justify-end items-center w-full" class:notHome={!isHome}>
				<span>issue dated {issueTime} <i class="block">Bangalore, India</i></span>
			</p>
		{/if}
		{#if isHome}
			<p class="uppercase flex justify-between items-center w-full" class:notHome={!isHome}>
				<span class="text-xs">&nbsp;</span>
				<span>issue dated {issueTime} <i>Bangalore, India</i></span>
				<BatteryPercentage percentage={gpsInfo?.batt} width="1.3em" class="hover:cursor-pointer" />
			</p>
			<h1 class="lg:text-7xl text-5xl uppercase relative text-center font-bold">
				{@html headline}
			</h1>
		{:else}
			<!-- <MobileMenu /> -->

			<a href="/">
				<Logo />
			</a>
		{/if}
		<p class="uppercase w-full" class:notHome={!isHome}>
			{subtitle}
		</p>
	</div>

	<hr class="divide" />
</header>
<MobileMenu />
<div class="px-4 w-full">
	<hr class="divide" />
</div>

<style>
	p {
		@apply text-sm font-bold font-fira my-2;
	}

	.row {
		@apply w-full px-0 justify-between flex-row-reverse;
	}

	p.notHome {
		@apply text-xs;
		width: 24%;
	}

	p.notHome:first-child {
		text-align: right;
		hanging-punctuation: first;
	}

	p.notHome:last-child {
		text-align: left;
	}

	.notHome > i {
		display: block;
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
