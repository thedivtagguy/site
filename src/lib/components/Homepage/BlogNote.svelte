<script>
	import note from '$lib/assets/images/common/orange-note.webp';
	import { formatDate } from '$lib/utils';
	export let latest = {};

	let year = new Date(latest.date).getFullYear();
	console.log(year);
</script>

<div class="flex flex-row w-full col-span-4 gap-2 lg:flex-col md:col-span-2">
	<div class="note basis-1/2">
		<figure class="relative max-w-sm">
			<div
				class="absolute max-w-[10rem] md:max-w-[12rem] top-8 md:top-20 flex flex-col justify-between left-8 md:left-16 -rotate-[16deg] w-full"
			>
				<a href="/blog/{year}/{latest.slug}">
					<p class="my-2 text-sm tracking-tighter uppercase md:text-md font-fira">Blog /</p>
					<h3 class="font-libre-caslon text-[16px] md:text-2xl uppercase break-words">
						{latest.title}
					</h3>
					<p class="my-2 text-sm tracking-tighter text-left uppercase md:m-2 md:text-md font-fira">
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
