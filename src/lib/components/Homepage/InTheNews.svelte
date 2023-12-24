<script>
	import NewsImage from '$lib/assets/images/news.webp';
	import ExternalLinkIcon from '$lib/assets/svg/External.svelte';
	export let data;

	function groupByClient(posts) {
		return posts.reduce((acc, post) => {
			if (post.featured) {
				const clientTitle = post.client.title;
				if (!acc[clientTitle]) {
					acc[clientTitle] = { posts: [], logo: post.client.logo };
				}
				acc[clientTitle].posts.push(post);
			}
			return acc;
		}, {});
	}

	const groupedPosts = groupByClient(data);
</script>

<section class="flex flex-col-reverse md:flex-row my-4 w-full gap-4 justify-between">
	{#each Object.entries(groupedPosts) as [clientName, { posts, logo }]}
		<article class="basis-2/5 flex-container">
			<div class="h-10 flex justify-start">
				<img src={logo} alt={`Logo of ${clientName}`} height={20} width={150} />
			</div>
			<ul class="w-full basis-2/5 flex flex-col gap-2">
				{#each posts as post, index}
					<li
						class="hover:outline-2 group/item outline-offset-4 outline-neutral focus:outline-dashed hover:outline-dashed hover:cursor-pointer rounded-2xl"
					>
						<a
							href={post.projectLink}
							target="_blank"
							rel="noopener noreferrer"
							class="font-libre-caslon text-neutral w-full {index % 2 === 0
								? 'bg-base-200 '
								: 'bg-transparent'}  flex flex-col justify-start rounded-xl {posts.length === 1
								? ' items-start flex-1'
								: 'items-start'}"
						>
							{#if posts.length <= 1 && index === 0}
								<figure class="flex justify-center w-full">
									<img
										src={post.thumbnail}
										alt={post.title}
										class="rounded-tr-xl rounded-tl-xl w-full object-cover h-[180px]"
									/>
									<figcaption class="hidden">{`Thumbnail for ${post.title}`}</figcaption>
								</figure>
							{/if}
							<span class="px-6 py-6 font-bold text-3xl flex justify-between gap-4 items-center">
								{post.title}
								<span
									class="group/edit invisible group-hover/item:visible group-focus/item:visible"
								>
									<ExternalLinkIcon class="w-6 h-6 mx-auto text-neutral" aria-hidden="true" />
								</span>
							</span>
						</a>
					</li>
				{/each}
			</ul>
		</article>
	{/each}
	<div class="col-span-1 mx-auto">
		<img src={NewsImage} alt="I've made stuff for the news" width="180" height="400" />
		<aside class="font-libre-caslon text-sm text-center italic text-neutral">
			(and I'd do it for you too)
		</aside>
	</div>
</section>

<style>
	.flex-container {
		display: flex;
		flex-direction: column;
		height: 100%;
		gap: 12px;
	}
</style>
