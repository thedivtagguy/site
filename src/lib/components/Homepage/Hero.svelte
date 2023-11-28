<script>
	import Eymen from './Eymen.svelte';
	import TLDR from './TLDR.svelte';
	import note from '$lib/assets/images/common/orange-note.png';
</script>

<div class="flex gap-4 flex-col md:flex-row">
	<TLDR />
	<Eymen />
	<div class="flex flex-col">
		<figure class="relative">
			<div class="absolute top-20 flex flex-col justify-between left-11 -rotate-[16deg] w-3/4">
				<p class="my-2">Blog / Tutorials</p>
				<h3 class="font-libre-caslon text-2xl uppercase">
					Visualizing the microsoft building footprint data with qgis
				</h3>
				<p class="my-2">13 nov, 2023</p>
			</div>
			<img src={note} alt="background" class=" pointer-events-none" />
		</figure>
	</div>
</div>
