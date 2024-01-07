<script>
	import { cn } from '$lib/utils';
	let className = '';
	export { className as class };
</script>

<header
	class={cn(
		'col-span-5 w-full grid max-h-md min-h-40 grid-cols-1 md:grid-cols-5 border-b-[1px] border-base-300',
		className
	)}
>
	<figure class="hidden col-span-1 lg:block h-full lg:border-r-[1px] border-base-300 p-1">
		<slot name="left-image" />
	</figure>
	<div class="flex items-center justify-center h-full col-span-3 border-base-300">
		<slot />
	</div>

	<figure class="hidden lg:block col-span-1 lg:border-l-[1px] border-base-300 p-1 mr-8">
		<slot name="right-image" />
	</figure>
</header>
