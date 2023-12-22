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

<article class="flex w-full flex-col md:flex-row justify-center gap-4 items-center py-4">
	<div class="image-container hidden md:block basis-1/6 self-end">
		<img src={Label} alt="Viz of the Week" width="150" height="320" />
	</div>
	<figure class="image-container w-full h-full items-stretch basis-3/6">
		<img
			src={thumbnail}
			alt="Thumbnail which shows my Viz of the Week, this week is on {title}"
			class="object-cover w-full h-full"
		/>
	</figure>
	<div class="content">
		<main class="flex flex-col m-0 prose justify-start h-full items-start basis-2/6">
			<h2 class="text-4xl m-0 p-0 font-roboto uppercase">{title}</h2>
			<p class="text-neutral text-md p-0 m-0">{@html marked.parse(description)}</p>
		</main>
		<aside class="flex flex-col md:flex-row justify-start gap-4 pb-2">
			<a
				style="box-shadow: 0px 2px 0px 0px #2b2b2b;"
				href={githubLink}
				target="_blank"
				class="text-x font-bold bg-base-200 font-fira tracking-normal uppercase px-8 py-2 rounded-md text-neutral border-2 border-neutral"
			>
				Github
			</a>
			<a
				style="box-shadow: 0px 2px 0px 0px #2b2b2b;"
				href={projectLink}
				target="_blank"
				class="text-x font-bold bg-purple font-fira tracking-normal uppercase px-8 py-2 rounded-md text-white border-2 border-neutral"
			>
				Project
			</a>
			<div class="social-links flex justify-start items-center gap-4">
				<span class="font-fira tracking-tighter text-xs font-bold">Also shared on</span>
				{#each Object.entries(social) as [type, link]}
					<SocialIcons {type} {link} class="w-6 h-6 text-neutral hover:text-purple" />
				{/each}
			</div>
		</aside>

		<hr class="divide py-1" />
		<footer class="meta">
			<TidyTuesdayCalendar longestStreakThisYear={longestStreak} weeksCompleted={weeksDone} />
		</footer>
	</div>
</article>

<style>
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
