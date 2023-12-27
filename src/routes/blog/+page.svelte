<script>
	import BlogImage from '$lib/assets/images/disjoined.webp';
	import Dunce from '$lib/assets/images/dunce.webp';
	import { formatDate } from '$lib/utils.ts';

	export let data;

	let posts = data.data;
</script>

<svelte:head>
	<title>Aman's Blog</title>
	<meta property="og:title" content="Aman's Blog" />
</svelte:head>

<div
	class="grid-cols-1 grid w-full gap-2 justify-center items-center md:grid-cols-1 lg:grid-cols-5 lg:border-l-[1px] border-r-[1px] border-base-300"
>
	<header
		class="col-span-5 w-full grid max-h-md grid-cols-1 md:grid-cols-5 border-b-[1px] border-base-300"
	>
		<div class="flex items-center justify-center h-full col-span-4 border-base-300">
			<h1 class="text-2xl leading-tight text-center md:text-4xl lg:text-6xl text-neutral">
				════╡<span class="inline-block highlight md:px-8"> Blog</span>╞════
			</h1>
		</div>

		<figure class="hidden lg:block lg:border-l-[1px] border-base-300 p-1 mr-8">
			<img
				width="220"
				height="250"
				class="rounded-xl"
				src={BlogImage}
				alt="Multiple interests, all disjointed and poorly run"
			/>
		</figure>
	</header>
	<main class="min-h-screen listing col-span-full">
		<ul class="divide-y-[1px] divide-neutral/40 divide-dashed flex flex-col">
			{#each posts as post (post)}
				{@const year = new Date(post.date).getFullYear()}

				<li
					class="px-4 py-4 sm:py-8 sm:px-8 outline-2 hover:outline-dashed outline-neutral/30 -outline-offset-8 even:bg-gray-200 group"
				>
					<a
						href="/blog/{year}/{post.slug}"
						class="flex flex-col items-center justify-between sm:flex-row focus:outline-none focus:border-none"
					>
						<article>
							<h3
								class="pb-2 text-xl font-bold tracking-wide font-libre-caslon sm:text-3xl text-neutral"
							>
								{post.title}
							</h3>
							<p class="font-normal leading-relaxed text-gray-600 saturate-0 text-md">
								{post.excerpt}
							</p>
						</article>
						<aside class="flex flex-col items-end justify-end w-full sm:w-40">
							<p class="w-full text-xs font-semibold text-left sm:w-3/5 text-neutral/80 font-fira">
								{formatDate(post.date)}
							</p>
						</aside>
					</a>
				</li>
			{/each}
		</ul>
	</main>
</div>

<style>
	article > p {
		max-width: 100ch;
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
