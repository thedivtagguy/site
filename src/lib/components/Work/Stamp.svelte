<script>
	export let background = '';
	export let text = '';
	export let number = 0;
	export let active = false;
	export let isAnythingSelected = false;

	$: console.log(active, text);
</script>

<button
	class="stamp h-full {isAnythingSelected
		? active
			? 'active-outline'
			: 'inactive'
		: 'default-state'}"
	on:click
	on:focus
	on:mouseover
	on:mouseout
	on:blur
	on:keydown
>
	<div
		style="background-image: url({background});"
		class="stamp-container relative border-[1px] noise-image flex justify-center items-end font-libre-caslon capitalize mx-2 my-1 border-base-300 w-full h-28"
	>
		<p class="absolute italic top-0 left-2 text-3xl font-bold text-rose-900">
			{number} <sup class="lowercase italic text-sm p-0 m-0">no.</sup>
		</p>
		<p class="text-neutral font-bold absolute bottom-0">{text}</p>
	</div>
</button>

<style>
	:root {
		--stamp-cut-scale: 0.4;
		--stamp-min-height: 100px;
		--stamp-background-color: #ededed;
		--rotation: 0;
	}

	.stamp-container {
		background-size: contain;

		background-position: 50% -50%;
	}

	.stamp:hover {
		transform: scale(1.05);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	}

	.active-outline {
		outline: 2px dashed;
		outline-offset: 8px;
		border-radius: 4px;
	}

	.default-state {
		opacity: 1;
	}

	.inactive {
		filter: saturate(0);
		opacity: 0.5;
	}

	.stamp {
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: 'Libre Caslon Text', serif;
		width: 100%;
		max-width: 225px;

		margin-bottom: 30px;
		position: relative;
		transition: all 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		min-height: var(--stamp-min-height);
		background: var(--stamp-background-color);
		transform: rotate(calc(var(--rotation) * 1deg));
	}

	.stamp:before,
	.stamp:after {
		position: absolute;
		content: '';
		display: block;
		background: radial-gradient(
			circle,
			transparent calc(15px * var(--stamp-cut-scale)),
			var(--stamp-background-color) calc(16px * var(--stamp-cut-scale))
		);
		background-size: calc(50px * var(--stamp-cut-scale)) calc(40px * var(--stamp-cut-scale));
		background-position: calc(-20px * var(--stamp-cut-scale)) calc(-20px * var(--stamp-cut-scale));
		width: 100%;
		height: calc(40px * var(--stamp-cut-scale));
		z-index: -1;
	}

	.stamp:before {
		top: calc(-20px * var(--stamp-cut-scale));
	}

	.stamp:after {
		bottom: calc(-20px * var(--stamp-cut-scale));
	}
</style>
