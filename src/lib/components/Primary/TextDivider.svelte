<script>
	import { slugify } from '$lib/utils';

	export let text = '';
	export let trim = true;
	export let slugLength = 3;
</script>

<div
	id={slugify(text, trim, slugLength)}
	class="w-full bg-neutral text-3xl text-white text-center my-4 rounded-md font-roboto capitalize italic px-4 py-2"
>
	<h2 class="text-white text-2xl font-roboto tracking-wide font-semibold">
		{text}
	</h2>
</div>
