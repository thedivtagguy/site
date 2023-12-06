<script>
	import note from '$lib/assets/images/common/orange-note.webp';
</script>

<div class="flex lg:flex-col basis-1/4 flex-row gap-2">
	<div class="note basis-1/2">
		<figure class="relative">
			<div
				class="absolute top-8 md:top-20 flex flex-col justify-between left-8 md:left-11 -rotate-[16deg] w-[200px] md:w-[300px]"
			>
				<p class="my-2 md:text-md text-sm uppercase font-fira tracking-tighter">Blog / Tutorials</p>
				<h3 class="font-libre-caslon text-[16px] md:text-2xl uppercase break-words">
					Visualizing the microsoft building footprint data with qgis
				</h3>
				<p class="md:m-2 my-2 md:text-md text-sm uppercase font-fira tracking-tighter text-left">
					13 nov, 2023
				</p>
			</div>
			<img src={note} width="335" alt="background" class=" pointer-events-none" />
		</figure>
	</div>

	<div class="flex basis-1/2">
		<div class="black-bento text-sm flex flex-col gap-2 justify-center">
			<div>
				<p class="font-roboto text-white font-bold uppercase">Web dev?</p>
				<p class="font-roboto text-white font-bold uppercase">Data viz?</p>
				<p class="font-roboto text-white font-bold uppercase">Pen pal?</p>
			</div>
			<div class="flex justify-between items-center">
				<p class="text-green green-glow-100 font-bold uppercase font-fira">
					I am Available for freelance work from Jan 2024
				</p>
				<div class="text-green green-glow-200 animate-pulse text-xs">⬤</div>
			</div>
		</div>
	</div>
</div>
