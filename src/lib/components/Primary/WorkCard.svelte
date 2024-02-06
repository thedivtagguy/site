<script>
	export let data;
	export let showMeta = false;
	export let height = 600;
</script>

<a href="/work#{data.slug}">
	<div
		class="border-2 card-cover w-fit border-neutral hover:outline-dashed outline-3 outline-offset-4 outline-neutral rounded-3xl"
	>
		<figure>
			<img
				width={450}
				height={500}
				src={data.thumbnail}
				alt={data.title}
				class="object-contain rounded-2xl"
			/>
		</figure>
	</div>
</a>
