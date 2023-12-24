<script>
	import { cn } from '$lib/utils';
	let className = '';
	export { className as class };
</script>

<span
	class={cn(
		'inline-flex flex-nowrap  h-8 justify-center font-roboto text-xs gap-1 items-center bg-white border border-gray-200 rounded-full px-2 py-1 ',
		className
	)}
>
	<slot />
</span>
