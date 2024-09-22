<script>
	import Label from '$lib/assets/images/viz.avif';
	import SocialIcons from '$lib/assets/svg/Socials.svelte';
	import { marked } from 'marked';
	import TidyTuesdayCalendar from './TidyTuesdayCalendar.svelte';
	export let data;
	export let year = new Date().getFullYear();

	const yearData = data[year] || { content: [], meta: {} };
	const { content, meta } = yearData;
	const { thumbnail, title, description, githubLink, projectLink, social } =
		content.length > 0 ? content[0] : {};
	const { longestStreak, weeksDone } = meta;
</script>

<article class="flex flex-col items-center justify-center w-full gap-4 py-4 md:flex-row">
	<div class="self-end hidden image-container md:block basis-1/7">
		<img src={Label} alt="Viz of the Week label" width="150" height="320" />
	</div>
	<figure
		class="items-stretch p-2 border border-base-300 bg-white rounded-lg w-full h-full image-container basis-4/6"
	>
		<img
			src={thumbnail}
			alt={`Thumbnail for Viz of the Week: ${title}`}
			class="object-cover w-full h-full"
		/>
	</figure>
	<div class="flex flex-col justify-between h-full content">
		<main class="flex flex-col items-start justify-start h-full m-0 prose basis-2/6">
			<h2 class="p-0 m-0 text-4xl font-bold capitalize font-libre-caslon">{title}</h2>
			<p class="p-0 m-0 text-neutral week-description text-md">
				{@html marked.parse(description)}
			</p>
		</main>
		<aside class="flex flex-col justify-start gap-4 pb-4 md:pb-8 md:flex-row">
			<a
				style="box-shadow: 0px 2px 0px 0px #2b2b2b;"
				href={githubLink}
				target="_blank"
				rel="noopener noreferrer"
				class="px-8 py-2 font-bold tracking-normal uppercase border-2 rounded-md text-x bg-base-200 font-fira text-neutral border-neutral"
			>
				Github
			</a>
			<a
				style="box-shadow: 0px 2px 0px 0px #2b2b2b;"
				href={projectLink}
				target="_blank"
				rel="noopener noreferrer"
				class="px-8 py-2 font-bold tracking-normal text-white uppercase border-2 rounded-md text-x bg-purple font-fira border-neutral"
			>
				Project
			</a>
			<div class="flex items-center justify-start gap-4 social-links">
				<span class="text-xs font-bold tracking-tighter font-fira">Also shared on</span>
				{#each Object.entries(social) as [type, link]}
					<SocialIcons {type} {link} class="w-6 h-6 text-neutral hover:text-purple" />
				{/each}
			</div>
		</aside>
		<hr class="py-1 divide" />
		<footer class="meta">
			<TidyTuesdayCalendar longestStreakThisYear={longestStreak} weeksCompleted={weeksDone} />
		</footer>
	</div>
</article>
<div class="relative w-full md:py-4">
	<div class="absolute inset-0 flex items-center">
		<div class="w-full h-2 border-b-[1px] border-double border-base-300"></div>
	</div>
	<div class="relative flex justify-center">
		<a href="/tidytuesday" class="btn-primary bg-red"> Browse all </a>
	</div>
</div>

<style>
	:global(.week-description > p:first-child::before) {
		content: 'This week // ';
		font-style: normal;
		font-weight: 600;
		font-family: 'Roboto Condensed', sans-serif;
	}

	.image-container {
		position: relative;
	}

	img {
		filter: saturate(0.7);
	}

	.image-container::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: url("data:image/svg+xml,%3Csvg viewBox='0 0 245 245' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='8.51' numOctaves='10' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
		mix-blend-mode: overlay;
		opacity: 1;
	}
</style>
