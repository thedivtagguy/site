<script>
	import note from '$lib/assets/images/common/orange-note.webp';
	import { formatDate } from '$lib/utils';
	import { onMount } from 'svelte';
	import { timeFormat } from 'd3';
	export let latest = {};
	let subscribeToDiagramChasing = true;
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

<div class="flex flex-col w-full col-span-1 gap-2 md:col-span-2">
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

	<div class="flex w-full flex-col basis-1/2">
		<a href="/contact" class="flex justify-center items-center text-sm black-bento">
			<div class="py-1 basis-1/2">
				<p class="text-xs font-bold uppercase text-base-200 normal font-roboto">Web dev?</p>
				<p class="text-xs font-bold uppercase text-base-200 normal font-roboto">Data viz?</p>
				<p class="text-xs font-bold uppercase text-base-200 normal font-roboto">Pen pal?</p>
			</div>
			<div class="flex items-center justify-between">
				<span class=" m-2 ml-[0.1rem] text-green green-glow-200 animate-pulse">⬤</span>
				<p class="text-xs font-bold uppercase text-green green-glow-100 font-fira">
					Available for freelance work from {freelance}
				</p>
			</div>
		</a>
	</div>

	<div class="flex flex-col gap-1 bg-base-200 border-2 border-base-200/80 py-2 px-4 rounded-xl">
		<h3 class="text-sm text-neutral font-roboto font-bold">Yet another guy with a newsletter</h3>
		<form
			action="https://buttondown.com/api/emails/embed-subscribe/amanbh"
			method="post"
			target="popupwindow"
			onSubmit={() => {
				window.open('https://buttondown.com/amanbh', 'popupwindow');
			}}
			class="flex flex-col gap-4"
		>
			<div class="flex flex-col md:items-center gap-3">
				<input
					type="email"
					name="email"
					id="bd-email"
					placeholder="Email"
					required
					class="flex-1 w-full px-3 py-2 placeholder:text-base-300 bg-white rounded border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<div class="flex justify-between">
				<label class="flex items-center gap-2 text-sm text-neutral/50">
					<input
						type="checkbox"
						bind:checked={subscribeToDiagramChasing}
						class="w-4 h-4 rounded border-zinc-300 dark:border-zinc-600 text-blue-600 focus:ring-blue-500"
					/>
					<span>
						Also subscribe to
						<a
							href="https://diagramchasing.fun"
							target="_blank"
							class="underline inline"
							rel="noopener noreferrer">Diagram Chasing</a
						>
					</span>
				</label>
				{#if subscribeToDiagramChasing}
					<input type="hidden" name="tag" value="diagramChasing" />
				{/if}
				<button type="submit" class="btn-primary bg-purple"> Subscribe </button>
			</div>
		</form>
	</div>
</div>
