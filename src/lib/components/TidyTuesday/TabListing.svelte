<script>
	//@ts-nocheck
	import { marked } from 'marked';
	import SocialIcons from '$lib/assets/svg/Socials.svelte';
	import { mediaQuery } from 'svelte-legos';
	import { extractDateTimeComponents } from './date';
	import { unlink } from './removeLinks';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { flyAndScale } from './transitions';
	import { X } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { slugify } from '$lib/utils';
	import { page } from '$app/stores';
	export let listing = {};

	const handleOpen = (id) => () => {
		if (browser) goto(`/tidytuesday/?tt=${slugify(id)}`, { noScroll: true });
	};

	const { month, date, day } = extractDateTimeComponents(listing.date);

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true
	});

	$: if ($page.url.searchParams.get('tt') === listing.slug) {
		open.set(true);
	}

	$: isMobile = mediaQuery('(max-width: 600px)');
</script>

<li class="-mt-12 group hover:cursor-pointer tilt">
	<div class="relative my-10 transition-all group-hover:active-card group-hover:-translate-y-2">
		<button
			use:melt={$trigger}
			on:m-click={handleOpen(listing.slug)}
			style="--bg-tab: {listing?.thumbnailColors?.dark ? listing.thumbnailColors.dark : '#2B2B2B'};
                {$isMobile ? 'left: 14%;' : listing.tabStyle};"
			class="tab max-w-fit"
		>
			<span class="text-sm font-bold md:text-lg font-libre-caslon">{listing.title}</span>
		</button>
		<div
			use:melt={$trigger}
			on:m-click={handleOpen(listing.slug)}
			class="border-[1px] h-20 tab-container px-8 py-4 bg-white border-base-300"
		>
			<p
				use:unlink
				class="text-sm leading-loose transition-all text-neutral/50 group-hover:text-neutral line-clamp-2"
			>
				{@html marked(listing.description)}
			</p>
		</div>
	</div>
</li>

<div
	style="--bg-tab: {listing?.thumbnailColors?.dark ? listing.thumbnailColors.dark : '#2B2B2B'};"
	class=""
	use:melt={$portalled}
>
	{#if $open}
		<div
			use:melt={$overlay}
			class="fixed inset-0 z-[100] bg-neutral/40"
			transition:fade={{ duration: 150 }}
		/>
		<div
			class="fixed left-[50%] top-[50%] z-[101] max-h-[85vh] w-[90vw]
			  max-w-[650px] translate-x-[-50%] translate-y-[-50%] overflow-y-scroll rounded-md bg-white
			  p-6 shadow-lg"
			transition:flyAndScale={{
				duration: 300,
				y: 8,
				start: 0.96
			}}
			use:melt={$content}
		>
			<div class="flex items-center justify-start gap-5 py-2">
				<time datetime={listing.date} class="icon">
					<em>{day}</em>
					<strong>{month}</strong>
					<span>{date}</span>
				</time>
				<h2
					use:melt={$title}
					class="p-0 m-0 text-2xl md:text-[2.8rem] font-bold leading-tight capitalize font-libre-caslon"
				>
					{listing.title}
				</h2>
			</div>
			<p
				tabindex="-1"
				use:melt={$description}
				class="mt-2 mb-5 leading-normal font-archivo text-zinc-600"
			>
				{@html marked(listing.description)}
			</p>
			<figure class="items-stretch w-full h-full image-container basis-3/6">
				<img
					src={listing.thumbnail}
					alt={`Thumbnail for Viz of the Week: ${listing.title}`}
					class="object-cover h-[18rem] md:max-h-[20rem] w-full"
				/>
			</figure>
			{#if listing.social}
				<div class="flex items-center justify-start gap-4 my-4 social-links">
					<span class="text-xs font-bold tracking-tighter font-fira">Also shared on</span>
					{#each Object.entries(listing.social) as [type, link]}
						<SocialIcons {type} {link} class="w-6 h-6 text-neutral hover:text-purple" />
					{/each}
				</div>
			{/if}
			<div class="flex justify-start gap-4">
				<aside class="flex flex-row justify-start gap-4">
					<a
						style="box-shadow: 0px 2px 0px 0px #2b2b2b;"
						href={listing.githubLink}
						target="_blank"
						rel="noopener noreferrer"
						class="px-8 py-2 font-bold tracking-normal uppercase border-2 rounded-md text-x bg-base-200 font-fira text-neutral border-neutral"
					>
						Github
					</a>
					<a
						style="box-shadow: 0px 2px 0px 0px #2b2b2b;"
						href={listing.projectLink}
						target="_blank"
						rel="noopener noreferrer"
						class="px-8 py-2 font-bold tracking-normal text-white uppercase border-2 rounded-md text-x bg-purple font-fira border-neutral"
					>
						Project
					</a>
				</aside>
			</div>
			<button
				use:melt={$close}
				aria-label="close"
				class="absolute inline-flex items-center justify-center w-6 h-6 p-1 rounded-full appearance-none right-4 top-4 text-magnum-800 hover:bg-magnum-100 focus:shadow-magnum-400"
			>
				<X class="square-4" />
			</button>
		</div>
	{/if}
</div>

<style>
	.bg-overlay {
		background-color: var(--bg-overlay);
	}
	.photo {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}

	.photo {
		display: flex;
		align-items: stretch;
		justify-content: flex-end;
		flex-direction: column;
		will-change: transform;
	}
	.tilt {
		transform: perspective(250px) rotateX(-6deg);
		transform-style: preserve-3d;
		-webkit-transform: perspective(250px) rotateX(-6deg);
		-webkit-transform-style: preserve-3d;
	}

	.tab-container {
		position: relative;
	}

	.tab-container::after {
		content: '';
		pointer-events: none;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(to top, #787878 0%, #787878 0%, transparent 15%, transparent 100%);
		transition: background 10s cubic-bezier(0.075, 0.82, 0.165, 1);
		z-index: 2;
	}
	.tab {
		border-radius: 8px 8px 0 0;
		cursor: pointer;
		padding: 6px 20px 8px;
		position: absolute;
		top: -51%;
		z-index: 3;
	}
	.tab,
	.tab:after,
	.tab:before {
		background-color: var(--bg-tab);
		color: #fff;
		display: block;
		transition: all 250ms;
	}

	.tab:after,
	.tab:before {
		content: ' ';
		height: 100%;
		margin: 0;
		padding: 0;
		position: absolute;
		top: 0;
		width: 40px;
	}

	.tab:after {
		border-radius: 8px 0 0 0;
		left: -24px;
		transform: skew(-30deg);
	}

	.tab:before {
		border-radius: 0 8px 0 0;
		right: -24px;
		transform: skew(30deg);
	}

	time.icon {
		font-size: 0.6em; /* change icon size */
		display: block;
		position: relative;
		width: 6em;
		height: 7em;
		background-color: #fff;

		border-radius: 0.6em;
		box-shadow:
			0 1px 0 #bdbdbd,
			0 2px 0 #fff,
			0 3px 0 #bdbdbd,
			0 4px 0 #fff,
			0 5px 0 #bdbdbd,
			0 0 0 1px #bdbdbd;
		overflow: hidden;
		backface-visibility: hidden;
		transform: rotate(0deg) skewY(0deg);
		-webkit-backface-visibility: hidden;
		-webkit-transform: rotate(0deg) skewY(0deg);
		-webkit-transform-origin: 50% 10%;
		transform-origin: 50% 10%;
	}

	time.icon * {
		display: block;
		width: 100%;
		font-size: 1em;
		font-weight: bold;
		font-style: normal;
		text-align: center;
	}

	time.icon strong {
		position: absolute;
		top: 0;
		padding: 0.4em 0;
		color: #fff;
		background-color: var(--bg-tab);
		/* border-bottom: 1px dashed #f37302; */
		box-shadow: 0 2px 0 var(--bg-tab);
	}

	time.icon em {
		position: absolute;
		bottom: 0em;
		color: var(--bg-tab);
	}

	time.icon span {
		width: 100%;
		font-size: 2.8em;
		letter-spacing: -0.05em;
		padding-top: 0.8em;
		color: #2f2f2f;
	}

	.group:hover .tab-container::after {
		transition: all 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
		background: linear-gradient(to top, #dbdbdb 0%, #dbdbdb 0%, transparent 15%, transparent 100%);
		transition: background 10s cubic-bezier(0.075, 0.82, 0.165, 1);
		-webkit-box-shadow: 0px -20px 23px -17px rgba(0, 0, 0, 0.75);
		-moz-box-shadow: 0px -20px 23px -17px rgba(0, 0, 0, 0.75);
		box-shadow: 0px -20px 23px -17px rgba(0, 0, 0, 0.75);
	}
</style>
