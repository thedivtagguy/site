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
			<img src={note} alt="background" height="355" class="w-full pointer-events-none" />
		</figure>
	</div>

	<div class="flex w-full gap-2 basis-1/2">
		<div class="flex flex-col justify-center w-1/2 gap-2 text-sm h-[13.5rem] black-bento">
			<div class="py-2">
				<p class="italic text-white normal font-roboto">Web dev?</p>
				<p class="italic text-white normal font-roboto">Data viz?</p>
				<p class="italic text-white normal font-roboto">Pen pal?</p>
			</div>
			<div class="flex items-start justify-between">
				<p class="font-bold uppercase text-green green-glow-100 font-fira">
					Available for freelance work from June 2024
					<span class="inline ml-[0.1rem] -mt-2 text-xs text-green green-glow-200 animate-pulse"
						>⬤</span
					>
				</p>
			</div>
		</div>
		<div
			class="flex flex-col items-center justify-center w-1/2 gap-2 text-sm h-[13.5rem] bg-base-200 border-[1px] border-base-300/50 rounded-xl"
		>
			<div>
				<p class="text-center text-neutral/40">⏠</p>
				<p class="w-2/3 py-2 mx-auto font-bold text-center uppercase text-neutral/40 font-roboto">
					Print store coming soon
				</p>
				<p class="text-center text-neutral/40">⏡</p>
			</div>

			<span class="text-base-300 italic text-center w-2/3 text-[0.75rem]"
				>Maps and fine-art photography</span
			>
		</div>
	</div>
</div>
