<script>
	import { formatDate } from '$lib/utils';

	export let data;
	export let showMeta = false;
	export let height = 600;

	$: cardType = data.hasCover ? 'cover' : 'card';
</script>

{#if cardType === 'cover'}
	<a href="/work/{data.slug}">
		<div
			class="card-cover w-fit border-neutral border-2 hover:outline-dashed outline-3 outline-offset-4 outline-neutral rounded-3xl"
		>
			<figure>
				<img width={450} src={data.thumbnail} alt={data.title} class="object-contain" />
			</figure>
		</div>
	</a>
	<!-- {:else}
	<a href="/work/{data.slug}">
		<div class="card-cover w-full h-full">
			<hr class="w-full border-[1px] border-neutral" />
			<p class="uppercase font-roboto">
				<span class="font-bold">{data.category}</span> / {data.tags[0]}
			</p>
			<hr class="w-full border-1 border-neutral" />
			<p class="italic py-1 font-roboto font-normal leading-royal">
				{data.description}
			</p>
			<hr class="w-full border-1 border-neutral" />
			<h3 class="font-libre-caslon text-3xl py-2 leading-tight">{data.title}</h3>

			<img height={800} class="object-contain" src={data.thumbnail} alt={data.title} />
		</div>
	</a> -->
{/if}
