<script>
	import { page } from '$app/stores';
	import BatteryPercentage from '$lib/assets/svg/BatteryPercentage.svelte';
	import Logo from '$lib/assets/svg/Logo.svelte';
	import Menu from './Menu.svelte';
	const issueTime = process.env.BUILD_TIME;
	export let gpsInfo;

	$: isHome = $page.url.pathname === '/';

	const headline = "Aman's general mishmash of  design, data & code";
	const subtitle = 'The definite, Illustrated & annotated anthology of my varied pastimes';
</script>

<header
	class="flex selection:bg-yellow max-w-[85rem] mx-auto w-full px-4 flex-col justify-center items-center mt-4"
>
	<hr class="divide" />

	<div class="flex flex-col items-center justify-start w-full my-2 text-center" class:row={!isHome}>
		{#if !isHome}
			<p class="flex items-center justify-end w-full uppercase" class:notHome={!isHome}>
				<span>issue dated {issueTime} <i class="block">Bangalore, India</i></span>
			</p>
		{/if}
		{#if isHome}
			<p class="flex items-center justify-between w-full uppercase" class:notHome={!isHome}>
				<span class="text-xs">&nbsp;</span>
				<span>issue dated {issueTime} <i>Bangalore, India</i></span>
				<BatteryPercentage percentage={gpsInfo?.batt} width="1.3em" class="hover:cursor-pointer" />
			</p>
			<h1 class="relative text-5xl font-bold text-center uppercase lg:text-7xl">
				{@html headline}
			</h1>
		{:else}
			<!-- <MobileMenu /> -->

			<a href="/">
				<Logo />
			</a>
		{/if}
		<p class="w-full uppercase" class:notHome={!isHome}>
			{subtitle}
		</p>
	</div>

	<hr class="divide" />
</header>
<Menu />
<hr class="divide max-w-[83rem] mx-auto px-4" />

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
