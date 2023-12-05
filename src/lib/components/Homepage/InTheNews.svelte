<script>
	import NewsImage from '$lib/assets/images/news.webp';
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

<section class="grid grid-cols-5 my-8 w-full gap-4 justify-between">
	{#each Object.entries(groupedPosts) as [clientName, { posts, logo }]}
		<div class="col-span-2 flex-container">
			<ul class="w-full flex flex-col gap-2">
				{#each posts as post, index}
					<li
						class="font-libre-caslon font-bold text-3xl text-neutral w-full {index % 2 === 0
							? 'bg-base-200'
							: 'bg-transparent'} py-8 flex justify-start items-center px-10 rounded-xl {posts.length <
						3
							? ' flex-1'
							: ''}"
					>
						{post.title}
					</li>
				{/each}
			</ul>
			<img src={logo} alt={clientName} height={20} width={150} class="mt-auto" />
		</div>
	{/each}
	<div class="col-span-1 mx-auto">
		<img src={NewsImage} alt={"I've made stuff for the news"} width="180" height="400" />
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
