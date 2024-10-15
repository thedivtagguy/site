<script>
	import TabListing from '$lib/components/TidyTuesday/TabListing.svelte';
	// import headerImage from '$lib/components/TidyTuesday/traveller.webp';
	import hits from '$lib/assets/images/tidytuesday/working.webp';
	import handle from '$lib/assets/images/tidytuesday/handle.png';
	export let data;
	const tidytuesday = data.data;
	import SEO from '$lib/components/Primary/SEO.svelte';
</script>

<SEO
	title="Tidytuesday | Aman Bhargava"
	description="All of my public tidytuesday projects"
	url="https://aman.bh"
	ogImage="sharecard.jpg"
	name="Aman Bhargava"
	isBlogPost={false}
	jobTitle="Developer and designer"
	skills={['JavaScript', 'Svelte', 'D3.js', 'Data visualization', 'Design']}
	sameAs={[
		'https://www.linkedin.com/in/amnbh/',
		'https://github.com/thedivtagguy',
		'https://www.instagram.com/thedivtagguy',
		'https://bsky.app/profile/aman.bh'
	]}
/>

<header
	class="grid-cols-1 grid w-full justify-center items-center md:px-6 md:grid-cols-1 lg:grid-cols-5 border-b-[1px] border-base-300"
>
	<!-- <figure class="hidden p-1 mr-8 lg:block">
		<img width="400" class="rounded-xl" src={headerImage} alt="" />
	</figure> -->
	<pre class="text-xs">
 _____________________
/ its not much,        \
\ but its honest work /
 ---------------------
	\   ^__^
     \ (oo)\_______
	   (__)\       )\/\
			||----w |
			||     ||
	</pre>
	<div
		class="flex items-center justify-center col-span-3 h-full lg:border-r-[1px] lg:border-l-[1px] border-base-300"
	>
		<h1 class="py-6 text-4xl leading-tight text-center md:text-4xl lg:text-7xl text-neutral">
			Tidytuesday and<span class="inline-block italic highlight"> other stories</span>
		</h1>
	</div>

	<div class="items-center justify-center hidden w-full col-span-1 bg-white lg:flex">
		<figure class="mx-auto font-fira noise-image">
			<img width="100" class="h-full py-4" src={hits} alt="All the hits" />
		</figure>
	</div>
</header>

<main
	class="grid items-start justify-center w-full h-full grid-cols-1 md:grid-cols-1 lg:grid-cols-5"
>
	<aside class="flex-col hidden w-full h-full col-span-1 items-star lg:flex">
		<h3 class="py-2 text-sm font-semibold text-center uppercase font-fira">
			~ What is Tidytuesday? ~
		</h3>
		<hr class="py-2 divide" />
		<p class="text-sm font-archivo text-neutral">
			TidyTuesday is a weekly social data project from the R4DS online learning community where we
			all crunch the same dataset. I'm usually on it every week, sometimes just noodling around,
			sometimes dropping stuff for everyone to see. This is my public catalogue of things I thought
			were good enough to share.
			<br />
		</p>
		<hr class="my-2 divide" />
		<p class="text-xs font-archivo text-neutral">
			Each entry has the code attached to it too, for you to peruse or roast mercilessly.
		</p>
	</aside>

	<section class="col-span-3 min-h-[50dvh] pb-8 border-base-300 lg:mr-[0.9rem] lg:ml-[0.91rem]">
		<div class="px-6 pt-4 border-l-[1px] border-r-[1px] border-base-300">
			<div class="pt-14">
				{#each Object.keys(tidytuesday).reverse() as year}
					<div class="relative -mt-12 tilt">
						<div style="--bg-tab: #2b2b2b; " class="tab bg-neutral max-w-fit">
							<h3 class="font-bold text-md md:text-lg font-fira">{year}</h3>
						</div>
						<div class="border-[1px] h-16 bg-neutral border-neutral/50"></div>
					</div>

					<ul class="list-none">
						{#each tidytuesday[year].content as listing, index}
							<TabListing {listing} />
						{/each}
					</ul>
				{/each}
			</div>
		</div>

		<div class="-mt-12">
			<div class="h-3 scale-[1.072] bg-[#464646]" />
			<div class="flex items-center justify-center h-20 drawer bg-neutral">
				<img
					draggable="false"
					width="100"
					height="200"
					src={handle}
					alt="decorative handle"
					class=" handle"
				/>
			</div>
		</div>
	</section>
	<aside class="hidden h-full col-span-1 lg:block">
		<h3 class="py-2 text-sm font-semibold text-center uppercase font-fira">~ Highlights ~</h3>
		<hr class="py-2 divide" />
		<ul class="px-3 flex flex-col gap-2 list-disc font-archivo">
			<li>
				<a
					class="underline text-purple"
					href="https://blog.datawrapper.de/data-vis-dispatch-october-24-2023/"
					>My Taylor Swift viz was featured in DataWrapper's Data Viz Dispatch! (Oct 2023)</a
				>
			</li>
			<li>
				<a
					class="underline text-purple"
					href="https://blog.datawrapper.de/data-vis-dispatch-october-1-2024/"
					>Math Olympiads visualization in Datawrapper's Data Viz Dispatch (Oct 2024)</a
				>
			</li>
		</ul>
	</aside>
</main>

<style>
	.handle {
		z-index: 10;
		-webkit-filter: drop-shadow(0px -5px 5px #000000);
		filter: drop-shadow(0px -5px 5px #000000);
	}
	.drawer {
		position: relative;
		transform: perspective(100px) rotateX(-10deg);
		transform-style: preserve-3d;
		-webkit-transform: perspective(100px) rotateX(-10deg);
		-webkit-transform-style: preserve-3d;
	}

	.drawer::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(to top, black, transparent);
		z-index: 2;
	}
	.tilt {
		transform: perspective(250px) rotateX(-8deg);
		transform-style: preserve-3d;
		-webkit-transform: perspective(250px) rotateX(-8deg);
		-webkit-transform-style: preserve-3d;
	}

	.tab,
	.tab:after,
	.tab:before {
		background-color: var(--bg-tab);
		color: #fff;
		display: block;
		transition: all 250ms;
	}

	.tab {
		border-radius: 8px 8px 0 0;

		padding: 10px 24px 8px;
		position: absolute;
		top: -46%;
		left: 10%;
		z-index: 3;
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

	@media only screen and (max-width: 600px) {
		.tab {
			border-radius: 8px 8px 0 0;
			cursor: pointer;
			padding: 2px 20px 8px;
			position: absolute;
			top: -52%;
			left: 11%;
			z-index: 3;
		}
	}
</style>
