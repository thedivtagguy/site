<script>
	import Plus from '$lib/assets/svg/Plus.svelte';
	import Badge from '../Primary/Badge.svelte';
	import Heart from '$lib/assets/svg/Heart.svelte';
	import { cn } from '$lib/utils';
	import { createAccordion, melt } from '@melt-ui/svelte';
	import { slide } from 'svelte/transition';

	const {
		elements: { content, item, trigger, root },
		helpers: { isSelected }
	} = createAccordion({
		multiple: true
	});

	let className = '';
	export { className as class };
	export let data;
</script>

<div class={cn('mx-auto w-full', className)} {...$root}>
	{#each data as { title, description, type, client, favorite, label, date }, i}
		<div use:melt={$item(title)} class="overflow-hidden transition-colors">
			<h2 class="flex text-2xl">
				<button
					use:melt={$trigger(title)}
					class={cn(
						'flex flex-1 cursor-pointer text-left items-start md:items-center justify-between ',
						`md:px-5 py-5 gap-4 font-medium leading-none`,
						'text-black transition-colors hover:bg-opacity-30 focus:!ring-0',
						'focus-visible:text-magnum-800',
						i !== 0 && 'border-t border-t-neutral-300'
					)}
				>
					<span class="inline-flex gap-2 items-center leading-normal">
						<Plus />
						{title}
					</span>

					{#if type === 'publications'}
						<Badge>
							<img
								class="me-1.5 inline-block w-20 h-5 rounded-full"
								src={client.logo}
								alt="{client.title} logo"
							/>
						</Badge>
					{:else if favorite}
						<Badge class="px-1">
							<Heart class="text-red" />
						</Badge>
					{:else if label}
						<Badge>
							{label}
						</Badge>
					{/if}
				</button>
			</h2>
			{#if $isSelected(title)}
				<div
					class={cn(
						'content',
						'inline-flex w-full justify-between items-center overflow-hidden pl-[1.6rem] pr-6 pb-6 text-sm text-neutral-600'
					)}
					use:melt={$content(title)}
					transition:slide
				>
					{#if description}
						<p class="text-lg max-w-sm font-roboto">{description}</p>
					{:else}
						<p>A nice project</p>
					{/if}
				</div>
			{/if}
		</div>
	{/each}
</div>
