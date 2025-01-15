<script>
	import NewsImage from '$lib/assets/images/news.webp';
	import ExternalLinkIcon from '$lib/assets/svg/External.svelte';
	export let data;

	console.log(data);
	function groupByClient(posts) {
		// Sort posts by date first
		const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

		// Get unique clients maintaining sort order
		const uniqueClients = [];
		const seenClients = new Set();

		const grouped = sortedPosts.reduce((acc, post) => {
			if (post.featured) {
				const clientTitle = post.client.title;
				if (!seenClients.has(clientTitle)) {
					seenClients.add(clientTitle);
					uniqueClients.push(clientTitle);
				}
				if (!acc[clientTitle]) {
					acc[clientTitle] = { posts: [], logo: post.client.logo };
				}
				acc[clientTitle].posts.push(post);
			}
			return acc;
		}, {});

		// Take only the 3 most recent clients
		const limitedGrouped = {};
		uniqueClients.slice(0, 3).forEach((client) => {
			limitedGrouped[client] = grouped[client];
		});

		return limitedGrouped;
	}

	const groupedPosts = groupByClient(data);
</script>

<section class="grid grid-cols-1 md:grid-cols-7 mb-4 w-full gap-4">
	<div class="md:col-span-1 order-first md:order-last">
		<img src={NewsImage} alt="I've made stuff for the news" class="w-[180px] h-auto mx-auto" />
		<aside class="font-libre-caslon text-sm text-center italic text-neutral">
			(and I'd do it for you too)
		</aside>
	</div>
	{#each Object.entries(groupedPosts) as [clientName, { posts, logo }]}
		<article class="md:col-span-2 flex flex-col gap-4">
			<div class="h-10">
				<img
					src={logo}
					alt={`Logo of ${clientName}`}
					height={30}
					class="h-[35px] w-auto object-contain"
				/>
			</div>
			<ul class="w-full flex flex-col gap-2 flex-1">
				{#each posts as post, index}
					<li
						class="hover:outline-2 group/item outline-offset-4 outline-neutral focus:outline-dashed hover:outline-dashed hover:cursor-pointer rounded-2xl h-full max-h-[300px]"
					>
						<a
							href={post.projectLink}
							target="_blank"
							rel="noopener noreferrer"
							class="font-libre-caslon text-neutral w-full h-full {index % 2 === 0
								? 'bg-base-200'
								: 'bg-transparent'} flex flex-col rounded-xl"
						>
							{#if posts.length <= 1 && index === 0}
								<figure class="flex justify-center w-full flex-[0_0_180px]">
									<img
										src={post.thumbnail}
										alt={post.title}
										class="rounded-tr-xl rounded-tl-xl w-full max-h-[200px] object-cover h-full"
									/>
									<figcaption class="hidden">{`Thumbnail for ${post.title}`}</figcaption>
								</figure>
							{/if}
							<span
								class="px-6 py-6 font-bold text-2xl flex justify-between gap-4 items-center flex-1"
							>
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
</section>

<style>
	.flex-container {
		display: flex;
		flex-direction: column;
		height: 100%;
		gap: 12px;
	}
</style>
