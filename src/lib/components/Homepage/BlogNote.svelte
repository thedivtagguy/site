<script>
	import note from '$lib/assets/images/common/orange-note.webp';
	import { formatDate } from '$lib/utils';
	import { onMount } from 'svelte';
	import { ArrowRight } from 'lucide-svelte';
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

	let emails = [
		'coconuts@migratorybirdscience.org',
		'doriangray@portrait.art',
		'bilbo.baggins@shire.org',
		'gandalf@middleearth.com',
		'frodo@shire.org',
		'samwise@shire.org',
		'heathcliff@wuthering.com',
		'doc@canneryrowsardines.fish',
		'deerstalker@whodunit.com',
		'vogon@poetrycritique.agency',
		'fordprefect@galactictravelguides.org'
	];
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

	<div
		class="flex flex-col gap-1 outline my-2 outline-1 outline-base-300/50 outline-offset-4 bg-base-200 py-2 px-2 rounded-2xl"
	>
		<h3
			class="text-sm text-neutral/80 font-roboto inline-flex items-center justify-center font-bold"
		>
			<a
				href="/blog/2025/keeping-in-touch#email"
				class="underline underline-offset-4 decoration-dashed hover:text-neutral"
				>My newsletter on dataviz and more <ArrowRight class="inline size-4" /></a
			>
		</h3>
		<form
			action="https://buttondown.com/api/emails/embed-subscribe/amanbh"
			method="post"
			target="popupwindow"
			onSubmit={() => {
				window.open('https://buttondown.com/amanbh', 'popupwindow');
			}}
			class="flex flex-col gap-2"
		>
			<div class="flex flex-col md:items-center gap-3">
				<input
					type="email"
					name="email"
					id="bd-email"
					placeholder={emails[Math.floor(Math.random() * emails.length)]}
					required
					class="flex-1 w-full px-3 py-2 placeholder:text-neutral/70 placeholder:text-xs bg-white rounded border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<div class="flex justify-between">
				<label class="flex items-center gap-2 text-xs text-neutral/80">
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
							class="underline block"
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
