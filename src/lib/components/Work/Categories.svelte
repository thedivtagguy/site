<script>
	import Stamp from './Stamp.svelte';
</script>

<div class="categories">
	<Stamp --rotation={5}>hi</Stamp>
	<Stamp>hi</Stamp>
	<Stamp>hi</Stamp>
</div>

<style>
	:root {
		--categories-shadow-color: #b2b2b2;
		--categories-shadow-blur: 2px;
	}
	.categories {
		-webkit-filter: drop-shadow(3px 3px 1px var(--categories-shadow-color));
		filter: drop-shadow(0px 0px var(--categories-shadow-blur) var(--categories-shadow-color));
	}
</style>
