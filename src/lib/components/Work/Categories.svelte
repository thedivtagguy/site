<script>
	import Stamp from './Stamp.svelte';
	import cards from '$lib/assets/images/stamps/cards.webp';
	import trumpet from '$lib/assets/images/stamps/trumpet.webp';
	import hat from '$lib/assets/images/stamps/hat.webp';
	import book from '$lib/assets/images/stamps/book.webp';

	export let types;
	const categories = Object.entries(types).sort((a, b) => b[1] - a[1]);
</script>

<div class="categories mt-4">
	<!-- bylines -->
	<Stamp
		--rotation={2}
		--stamp-cut-scale={0.3}
		background={book}
		text={categories[0][0]}
		number={categories[0][1]}
	/>
	<!-- personal -->
	<Stamp --rotation={-2} background={trumpet} text={categories[1][0]} number={categories[1][1]} />
	<!-- random -->
	<Stamp
		--rotation={1}
		--stamp-cut-scale={0.2}
		background={cards}
		text={categories[2][0]}
		number={categories[2][1]}
	/>
	<!-- client -->
	<Stamp --rotation={-4} background={hat} text={categories[3][0]} number={categories[3][1]} />
</div>

<style>
	:root {
		--categories-shadow-color: #a7a4a4;
		--categories-shadow-blur: 3px;
	}
	.categories {
		-webkit-filter: drop-shadow(3px 3px 1px var(--categories-shadow-color));
		filter: drop-shadow(0px 0px var(--categories-shadow-blur) var(--categories-shadow-color));
	}
</style>
