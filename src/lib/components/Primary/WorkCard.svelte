<script>
	export let data;

	$: cardType = data.hasCover ? 'cover' : 'card';
</script>

{#if cardType === 'cover'}
	<a href="/work/{data.slug}">
		<div
			class="card-cover w-fit border-neutral border-2 hover:outline-dashed outline-3 outline-offset-4 outline-neutral rounded-3xl"
		>
			<figure class="self-stretch">
				<img width={450} src={data.thumbnail} alt={data.title} class="object-contain" />
			</figure>
		</div>
	</a>
{/if}
