<script lang="ts">
	import { createTagsInput, melt } from '@melt-ui/svelte';
	import { X } from 'lucide-svelte';

	const {
		elements: { root, tag, deleteTrigger },
		states: { tags }
	} = createTagsInput({
		unique: true,
		maxTags: 4,
		add(tag) {
			return { id: tag, value: tag };
		}
	});
</script>

<div class="flex font-fira text-sm flex-col min-h-6 h-5 items-start justify-center gap-2">
	<div
		use:melt={$root}
		class="flex min-w-[280px] flex-row flex-wrap gap-2.5 rounded-md px-3 text-magnum-700
      focus-within:ring focus-within:ring-magnum-400"
	>
		{#each $tags as t}
			<div
				use:melt={$tag(t)}
				class="flex items-center overflow-hidden bg-base-200 rounded-md text-neutral font-medium [word-break:break-word]
         data-[disabled]:hover:cursor-default
          data-[disabled]:focus:!outline-none data-[disabled]:focus:!ring-0"
			>
				<span class="flex items-center border-r text-sm px-2 border-neutral/10">{t.value}</span>
				<button
					use:melt={$deleteTrigger(t)}
					class="flex h-full items-center enabled:hover:bg-red enabled:hover:text-white"
				>
					<X class="square-3 h-4" />
				</button>
			</div>
		{/each}
	</div>
</div>
