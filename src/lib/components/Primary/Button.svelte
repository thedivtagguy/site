<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let text: string = 'Default Text';
	export let type: 'button' | 'link' = 'button';
	export let link: string = '#';

	const dispatch = createEventDispatcher();

	function handleClick(event: MouseEvent) {
		dispatch('click', event);
	}

	export let color: string = 'hsl(345deg, 100%, 47%)'; // Default color

	let colorLight: string;
	let colorDark: string;

	$: {
		colorLight = adjustHSL(color, -20, 15, 15);
		colorDark = adjustHSL(color, -20, -15, -15);
	}

	function adjustHSL(hsl: string, h: number, s: number, l: number) {
		const [hue, saturation, lightness] = hsl.match(/\d+/g).map(Number);
		return `hsl(${hue + h}deg, ${saturation + s}%, ${lightness + l}%)`;
	}
</script>

{#if type === 'link'}
	<a
		href={link}
		class=" button-pushable"
		role="button"
		style="--button-color: {color}; --button-color-light: {colorLight}; --button-color-dark: {colorDark};"
	>
		<span class="button-shadow"></span>
		<span class="button-edge"></span>
		<span class="button-front">{text}</span>
	</a>
{:else}
	<button
		class="button-pushable"
		style="--button-color: {color}; --button-color-light: {colorLight}; --button-color-dark: {colorDark};"
		on:click={handleClick}
	>
		<span class="button-shadow"></span>
		<span class="button-edge"></span>
		<span class="button-front">{text}</span>
	</button>
{/if}

<style>
	/* CSS */
	.button-pushable {
		position: relative;
		border: none;
		background: transparent;
		padding: 0;
		cursor: pointer;
		outline-offset: 4px;
		transition: filter 250ms;
		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;
	}

	.button-shadow {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 12px;
		background: hsl(0deg 0% 0% / 0.25);
		will-change: transform;
		transform: translateY(2px);
		transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
	}

	.button-edge {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border-radius: 12px;
		background: linear-gradient(
			to left,
			var(--button-color-dark) 0%,
			var(--button-color-light) 8%,
			var(--button-color-light) 92%,
			var(--button-color-dark) 100%
		);
	}

	.button-front {
		display: block;
		position: relative;
		padding: 12px 27px;
		border-radius: 12px;
		font-size: 1.1rem;
		color: white;
		background: var(--button-color);
		will-change: transform;
		transform: translateY(-4px);
		transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1);
	}

	@media (min-width: 768px) {
		.button-front {
			font-size: 1.25rem;
			padding: 12px 42px;
		}
	}

	.button-pushable:hover {
		filter: brightness(110%);
		-webkit-filter: brightness(110%);
	}

	.button-pushable:hover .button-front {
		transform: translateY(-6px);
		transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
	}

	.button-pushable:active .button-front {
		transform: translateY(-2px);
		transition: transform 34ms;
	}

	.button-pushable:hover .button-shadow {
		transform: translateY(4px);
		transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5);
	}

	.button-pushable:active .button-shadow {
		transform: translateY(1px);
		transition: transform 34ms;
	}

	.button-pushable:focus:not(:focus-visible) {
		outline: none;
	}
</style>
