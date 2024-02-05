<script>
	import BlogNote from './BlogNote.svelte';
	import Eymen from './Eymen.svelte';
	import TLDR from './TLDR.svelte';

	export let liveData = {};
</script>

<div class="justify-center hidden grid-cols-1 gap-4 my-4 ml-2 md:grid lg:grid-cols-8">
	<TLDR />
	<Eymen />
	<BlogNote latest={liveData} />
</div>

<div class="grid justify-center grid-cols-1 gap-4 my-4 ml-2 md:hidden lg:grid-cols-8">
	<Eymen />
	<TLDR />

	<BlogNote latest={liveData} />
</div>
