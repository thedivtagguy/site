<script>
	import BlogNote from './BlogNote.svelte';
	import Eymen from './Eymen.svelte';
	import TLDR from './TLDR.svelte';
</script>

<div class="grid grid-cols-1 my-4 justify-center md:grid-cols-1 lg:grid-cols-8 gap-4">
	<TLDR />
	<Eymen />
	<BlogNote />
</div>
