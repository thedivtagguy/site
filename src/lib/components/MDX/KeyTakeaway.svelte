<script>
	import { TinaMarkdown } from 'tinacms/dist/rich-text';

	export let children;
</script>

<div class="p-4 my-4 border-2 border-primary rounded-lg">
	<h4 class="mb-2 font-bold">Key Takeaway</h4>
	<TinaMarkdown content={children} />
</div>
