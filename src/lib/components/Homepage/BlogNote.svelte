<script>
	import note from '$lib/assets/images/common/orange-note.webp';
	import { formatDate } from '$lib/utils';
	export let latest = {};

	let year = new Date(latest.date).getFullYear();
	console.log(year);
</script>

<div class="flex flex-row flex-col w-full col-span-1 gap-2 md:col-span-2">
	<div class="note basis-1/2">
		<figure class="relative max-w-sm">
			<div
				class="absolute w-[15rem] lg:max-w-[14rem] lg:w-full top-[15%] lg:top-[16%] flex flex-col justify-between left-[16%] -rotate-[16deg]"
			>
				<a href="/blog/{year}/{latest.slug}">
					<p class="my-2 text-sm tracking-tighter uppercase md:text-md font-fira">Blog /</p>
					<h3 class="text-3xl uppercase break-words font-libre-caslon">
						{latest.title}
					</h3>
					<p class="my-2 text-xs tracking-tighter text-left uppercase md:m-2 md:text-md font-fira">
						{formatDate(latest.date)}
					</p>
				</a>
			</div>
			<img src={note} alt="background" width="355" class="pointer-events-none" />
		</figure>
	</div>

	<div class="flex w-full basis-1/2">
		<div class="flex flex-col justify-center gap-2 text-sm black-bento">
			<div>
				<p class="font-bold text-white uppercase font-roboto">Web dev?</p>
				<p class="font-bold text-white uppercase font-roboto">Data viz?</p>
				<p class="font-bold text-white uppercase font-roboto">Pen pal?</p>
			</div>
			<div class="flex items-center justify-between">
				<p class="font-bold uppercase text-green green-glow-100 font-fira">
					I am Available for freelance work from Jan 2024
				</p>
				<div class="text-xs text-green green-glow-200 animate-pulse">⬤</div>
			</div>
		</div>
	</div>
</div>
