<script>
	import note from '$lib/assets/images/common/orange-note.webp';
	import { formatDate } from '$lib/utils';
	import { onMount } from 'svelte';
	import { timeFormat } from 'd3';
	export let latest = {};

	const formatMonthYear = timeFormat('%B, %Y');
	const FREELANCE_API = '/api/common?file=now/now.mdx&keys=takingFreelanceFrom';
	let freelance = 'August 2024';
	onMount(async () => {
		const res = await fetch(FREELANCE_API);
		const data = await res.json();
		freelance = formatMonthYear(new Date(data.takingFreelanceFrom));
	});

	let year = new Date(latest.date).getFullYear();
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
		<a
			href="/contact"
			class="flex flex-col justify-center w-1/2 gap-2 text-sm h-[13.5rem] black-bento"
		>
			<div class="py-2">
				<p class="text-sm font-bold uppercase text-base-200 normal font-roboto">Web dev?</p>
				<p class="text-sm font-bold uppercase text-base-200 normal font-roboto">Data viz?</p>
				<p class="text-sm font-bold uppercase text-base-200 normal font-roboto">Pen pal?</p>
			</div>
			<div class="flex items-start justify-between">
				<p class="text-xs font-bold uppercase text-green green-glow-100 font-fira">
					<span class="block m-2 ml-[0.1rem] -mt-2 text-green green-glow-200 animate-pulse">⬤</span
					>Available for freelance work from {freelance}
				</p>
			</div>
		</a>
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
