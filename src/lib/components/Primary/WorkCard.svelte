<script>
	export let data;
	export let showMeta = false;
	export let height = 600;
</script>

<a href="/work/{data.slug}">
	<div
		class="card-cover w-fit border-neutral border-2 hover:outline-dashed outline-3 outline-offset-4 outline-neutral rounded-3xl"
	>
		<figure>
			<img width={450} src={data.thumbnail} alt={data.title} class="object-contain" />
		</figure>
	</div>
</a>
