<script>
	import BlogNote from './BlogNote.svelte';
	import Eymen from './Eymen.svelte';
	import TLDR from './TLDR.svelte';

	export let liveData = {};
</script>

<div class="grid justify-center grid-cols-1 gap-4 my-4 md:grid-cols-1 lg:grid-cols-8">
	<TLDR />
	<Eymen />
	<BlogNote latest={liveData} />
</div>
