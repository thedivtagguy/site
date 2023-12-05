<script>
	import note from '$lib/assets/images/common/orange-note.png';
</script>

<div class="flex flex-col gap-4">
	<div class="note -mt-2 basis-1/4">
		<figure class="relative">
			<div
				class="absolute top-20 flex flex-col justify-between left-11 -rotate-[16deg] w-3/4 max-w-xs"
			>
				<p class="my-2 uppercase font-fira tracking-tighter">Blog / Tutorials</p>
				<h3 class="font-libre-caslon text-2xl uppercase break-words">
					Visualizing the microsoft building footprint data with qgis
				</h3>
				<p class="m-2 uppercase font-fira tracking-tighter text-left">13 nov, 2023</p>
			</div>
			<img
				src={note}
				style="width: 100%; max-width: 400px;"
				alt="background"
				class=" pointer-events-none"
			/>
		</figure>
	</div>

	<div class="flex">
		<div class="black-bento text-sm flex flex-col gap-4 w-full justify-center">
			<div class="text-white font-bold uppercase">
				<p>Web dev?</p>
				<p>Data viz?</p>
				<p>Pen pal?</p>
			</div>
			<div class="flex justify-between items-center">
				<p class="text-green green-glow-100 work font-bold uppercase basis-3/5 font-fira">
					I am Available for freelance work
				</p>
				<div class="text-green green-glow-200 animate-pulse text-xs">⬤</div>
			</div>
		</div>
	</div>
</div>
