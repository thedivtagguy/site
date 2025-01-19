<script>
	import { TinaMarkdown } from 'tinacms/dist/rich-text';

	export let children;
</script>

<blockquote class="p-4 my-4 border-l-4 border-primary bg-base-200">
	<TinaMarkdown content={children} />
</blockquote>
