<script lang="ts">
	import { createToggle, melt } from '@melt-ui/svelte';
	import { RouteOff } from 'lucide-svelte';
	export let onToggle;
	const {
		elements: { root }
	} = createToggle();
</script>

<button
	use:melt={$root}
	aria-label="Toggle displaying filters"
	on:click={onToggle}
	class="grid h-6 w-6 place-items-center items-center justify-center rounded-md
    bg-base-200 text-magnum-800 hover:bg-base-100
      data-[disabled]:cursor-not-allowed data-[state=on]:bg-yellow
      data-[state=on]:text-magnum-900 data-[state=on]:border-[1px] border-neutral"
>
	<RouteOff class="stroke-2 h-4" />
</button>
