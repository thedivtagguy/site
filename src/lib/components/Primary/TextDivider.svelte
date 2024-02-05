<script>
	import { slugify } from '$lib/utils';

	export let text = '';
	export let trim = true;
	export let slugLength = 3;
</script>

<div
	id={slugify(text, trim, slugLength)}
	class="w-full px-4 py-2 my-4 text-3xl italic text-center text-white capitalize rounded-md bg-neutral font-roboto"
>
	<h2 class="text-lg font-semibold tracking-wide text-white md:text-2xl font-roboto">
		{text}
	</h2>
</div>
