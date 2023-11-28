<script>
	import { page } from '$app/stores';
	import Logo from '$lib/assets/svg/Logo.svelte';
	import Menu from './Menu.svelte';

	$: isHome = $page.url.pathname === '/';

	const headline = "Aman's general mishmash of  design, data & code";
	const subtitle = 'The definite, Illustrated & annotated anthology of my varied pastimes';
</script>

<header class="flex max-w-[85rem] flex-col justify-center items-center mt-4">
	<div class="divide" />

	<div
		class="flex flex-col justify-between items-center text-center w-full px-12"
		class:row={!isHome}
	>
		<p class="uppercase" class:notHome={!isHome}>
			issue dated 28 july 2023, <i>Bangalore, India</i>
		</p>
		{#if isHome}
			<h1 class="lg:text-7xl text-5xl uppercase relative text-center font-bold">
				{@html headline}
			</h1>
		{:else}
			<Logo />
		{/if}
		<p class="uppercase" class:notHome={!isHome}>
			{subtitle}
		</p>
	</div>

	<div class="divide" />
</header>
<Menu />
<div class="divide" />

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
