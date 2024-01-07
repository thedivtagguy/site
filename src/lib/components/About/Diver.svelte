<script>
	import Diver from '$lib/assets/images/about/diver.webp';
</script>

<div class="relative w-full">
	<ul class="absolute top-0 flex w-full h-full opacity-50">
		<li class="h-full bg-red" />
		<li class="h-full bg-blue" />
		<li class="h-full bg-green" />
		<li class="h-full bg-yellow" />
	</ul>
	<img src={Diver} alt="me" class="mx-auto noise-image" />
</div>

<style>
	.relative ul li {
		/* Default basis for all list items */
		flex-basis: 3/12;

		/* Override basis for hovered item */
		&:hover {
			flex-basis: 9/12;
		}

		/* Override basis for non-hovered siblings of hovered item */
		&:hover ~ li {
			flex-basis: 1/12;
		}
	}
</style>
