<script>
	import BlogImage from '$lib/assets/images/disjoined.webp';
	import TypeWriter from '$lib/assets/images/blog/typewriter.webp';
	import { RssIcon, LinkIcon } from 'lucide-svelte';
	import { formatDate } from '$lib/utils.ts';
	import SEO from '$lib/components/Primary/SEO.svelte';
	export let data;

	let posts = data.data;
</script>

<SEO
	title="Blog | Aman Bhargava"
	description="A home of Aman's multiple interests, all disjointed and poorly run"
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

<div
	class="grid items-center justify-center w-full grid-cols-1 gap-0 lg:grid-cols-5 border-base-300"
>
	<header class="col-span-5 w-full grid grid-cols-1 md:grid-cols-5 border-b-[1px] border-base-300">
		<div class="flex items-center justify-center h-full col-span-4 py-6 border-base-300">
			<h1 class="text-5xl leading-tight text-center lg:text-6xl text-neutral">
				<span class="hidden md:inline-block">════╡</span>
				<span class="inline-block md:hidden"> ✱ </span>
				<span class="inline-block highlight md:px-8"> Blog</span>
				<span class="inline-block md:hidden"> ✱ </span>
				<span class="hidden md:inline-block">╞════</span>
			</h1>
		</div>

		<figure class="hidden lg:block lg:border-l-[1px] border-base-300 p-2">
			<img
				width="220"
				height="250"
				class="rounded-xl"
				src={BlogImage}
				alt="Multiple interests, all disjointed and poorly run"
			/>
		</figure>
	</header>
	<main class="min-h-screen col-span-4 listing md:border-r-[1px] -mr-[0.06rem] border-base-300">
		<ul class="divide-y-[1px] w-full divide-neutral/40 divide-dashed flex flex-col">
			{#each posts as post (post)}
				{@const year = new Date(post.date).getFullYear()}

				<li
					class="w-full px-0 py-4 sm:py-8 sm:px-8 outline-2 hover:outline-dashed outline-neutral/30 -outline-offset-8 group"
				>
					<a
						href="/blog/{year}/{post.slug}"
						class="flex flex-col items-center justify-between sm:flex-row focus:outline-none focus:border-none"
					>
						<article>
							<h3
								class="pb-2 text-2xl max-w-xl font-bold tracking-wide leading-royal font-libre-caslon sm:text-3xl text-neutral"
							>
								{post.title}
							</h3>
							<p
								class="font-normal text-wrap leading-relaxed text-gray-600 saturate-0 text-sm sm:text-md"
							>
								{post.excerpt}
							</p>
						</article>
						<aside class="flex flex-col items-end justify-end w-full sm:w-40">
							<p
								class="w-full text-xs font-semibold text-right sm:pt-0 pt-4 text-neutral/80 font-fira"
							>
								{formatDate(post.date)}
							</p>
						</aside>
					</a>
				</li>
			{/each}
		</ul>
	</main>
	<aside
		class="flex-col isolate items-center justify-start hidden min-h-screen col-span-1 md:flex listing"
	>
		<div
			class="flex flex-col gap-4 divide-y-[1px] divide-neutral/40 mb-4 mx-auto w-full py-2 border-b border-base-300 [&>*:not(:first-child)]:pt-4 [&>*:not(:first-child)]:pb-3 [&>*:first-child]:pt-4"
		>
			<a
				href="/blog/atom.xml"
				class="flex items-center gap-2 px-4 text-sm text-center border-t border-base-300 w-full text-base-content/60 hover:text-base-content"
				title="RSS Feed"
			>
				<RssIcon class="w-4 h-4" />
				RSS Feed
			</a>
			<a
				href="/links"
				class="flex items-center gap-2 px-4 text-sm text-center w-full text-base-content/60 hover:text-base-content"
				title="Links and finds"
			>
				<LinkIcon class="w-4 h-4" />
				Links and finds
			</a>
		</div>
		<div class="w-[56%] leading-3 border-[1px] border-base-300 border-b-0 px-3 pt-4 text-gray-700">
			<p class="pb-2 text-lg font-bold text-center uppercase font-libre-caslon">
				This is a sidebar
			</p>
			<p class="mx-auto font-mono text-xs font-bold tracking-tighter text-left">
				Normally, this has a bunch of links that help you sort through all the many posts that the
				blog has. But as you can see I don't have that many things here right now. I will soon. And
				then this sidebar will be nice and packed with clicky stuff. Soon. You'll see.
			</p>
		</div>
		<img
			width="420"
			height="250"
			class="opacity-90 mix-blend-multiply rounded-xl saturate-0"
			src={TypeWriter}
			alt="Multiple interests, all disjointed and poorly run"
		/>
	</aside>
</div>

<style>
	article > p {
		max-width: 80ch;
	}

	article {
		word-wrap: break-word;
		overflow-wrap: break-word;
	}

	article > h3,
	article > p {
		word-break: break-word;
	}
</style>
