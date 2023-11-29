<div
	class="relative basis-1/4 text-left outline outline-1 outline-base-300 outline-offset-8 bg-base-200 p-12 rounded-xl border-[1px] border-base-300"
>
	<h3 class="text-7xl text-center font-libre-caslon font-black">tl;dr</h3>
	<article class="text-effect text-left">
		<p class="line">Nifty clicky-click stuff,</p>
		<p class="line">map-alicious eye-candy stuff,</p>
		<p class="line">snazzy chart-y-chart doodads,</p>
		<p class="line">arty schmarty stuff,</p>
		<p class="line">code-y code stuff</p>
		<p class="line">and if-i-don't-know-it-i'll-learn-it stuff.</p>
	</article>
</div>

<style>
	:root {
		--multiplier: 1.2;
	}

	h3 {
		position: relative;
		z-index: 1;
	}
	h3::before {
		content: '';
		display: block;
		width: 30%;
		height: 40px;
		position: absolute;
		transform: translate(-50%, -50%) rotate(-2deg);
		top: 50%;
		left: 50%;
		z-index: -1;
		@apply bg-yellow;
	}

	.line {
		font-family: 'Open Sans Variable', sans-serif;
		font-weight: 700;
		font-stretch: 20%;
		text-align: left;
	}
	.text-effect .line {
		display: block;
	}

	.text-effect .line:nth-child(1) {
		font-size: calc(1.8em * var(--multiplier));
	}
	.text-effect .line:nth-child(2) {
		font-size: calc(1.6em * var(--multiplier));
	}
	.text-effect .line:nth-child(3) {
		font-size: calc(1.4em * var(--multiplier));
	}
	.text-effect .line:nth-child(4) {
		font-size: calc(1.2em * var(--multiplier));
	}
	.text-effect .line:nth-child(5) {
		font-size: calc(1em * var(--multiplier));
	}
	.text-effect .line:nth-child(6) {
		width: 80%;
		font-size: calc(0.8em * var(--multiplier));
	}
</style>
