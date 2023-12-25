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
		<div class="flex items-center justify-center col-span-4 h-full border-base-300">
			<h1 class="text-2xl md:text-4xl lg:text-6xl text-center text-neutral leading-tight">
				════╡<span class="highlight inline-block md:px-8"> Blog</span>╞════
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
	<main class="listing col-span-full min-h-screen">
		<ul class="divide-y-[1px] divide-neutral/40 divide-dashed flex flex-col">
			{#each posts as post (post)}
				{@const year = new Date(post.date).getFullYear()}

				<li
					class="py-4 px-4 sm:py-8 sm:px-8 outline-2 hover:outline-dashed outline-neutral/30 -outline-offset-8 even:bg-gray-200 group"
				>
					<a
						href="/blog/{year}/{post.slug}"
						class="flex flex-col sm:flex-row justify-between items-center focus:outline-none focus:border-none"
					>
						<article>
							<h3
								class="font-libre-caslon font-bold pb-2 text-xl sm:text-3xl text-neutral tracking-wide"
							>
								{post.title}
							</h3>
							<p class=" font-roboto font-normal text-md">{post.excerpt}</p>
						</article>
						<aside class="flex w-full sm:w-40 flex-col justify-end items-end">
							<p class="w-full sm:w-3/5 text-left text-neutral/80 font-semibold font-fira text-xs">
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
