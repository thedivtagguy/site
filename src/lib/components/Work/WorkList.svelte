<script>
	import Plus from '$lib/assets/svg/Plus.svelte';
	import Badge from '../Primary/Badge.svelte';
	import Heart from '$lib/assets/svg/Heart.svelte';
	import { ExternalLink } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { createAccordion, melt } from '@melt-ui/svelte';
	import { slide } from 'svelte/transition';
	import { formatDate } from '$lib/utils';

	let className = '';
	export { className as class };
	export let data;

	const {
		elements: { content, item, trigger, root },
		helpers: { isSelected }
	} = createAccordion({
		defaultValue: data.find((item) => item.favorite)?.title
	});
</script>

<div class={cn('mx-auto w-full', className)} {...$root}>
	{#each data as { title, description, projectLink, type, client, favorite, label, date, thumbnail }, i}
		<div use:melt={$item(title)} class="overflow-hidden transition-colors">
			<h2 class="flex text-2xl">
				<button
					use:melt={$trigger(title)}
					class={cn(
						'flex flex-1 cursor-pointer text-left text-2xl md:text-3xl items-start md:items-center justify-between ',
						`px-5 py-4  gap-4 font-medium leading-none`,
						'text-black transition-colors focus:!ring-0',
						'focus-visible:text-magnum-800',
						i !== 0 && 'border-t border-t-neutral-300',
						$isSelected(title) ? 'bg-base-200' : ''
					)}
				>
					<span class="inline-flex gap-2 items-center leading-normal">
						<Plus
							class={$isSelected(title)
								? 'rotate-45 transition-all duration-600'
								: 'transition-all duration-600'}
						/>
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
					class="content bg-base-200 flex flex-col md:flex-row gap-4 pr-6 pl-12 md:pl-12 pb-6"
					use:melt={$content(title)}
					transition:slide
				>
					{#if thumbnail}
						<figure class="basis-2/6">
							<img
								class="w-[230px] h-[300px] rounded-xl border-neutral border-[1px] object-cover noise-image"
								loading="lazy"
								src={thumbnail}
								alt="cover"
							/>
						</figure>
					{/if}
					<div class="basis-4/6 flex flex-col justify-between gap-2 min-h-[300px] h-full">
						<div>
							<span class="date text-sm font-fira text-gray-600">{formatDate(date)}</span>
							<hr class="border-gray-500 pb-2" />
							<p class="font-roboto text-xl">{description}</p>
						</div>
						<div class="cta">
							<a href={projectLink} class="btn-primary w-80 bg-blue">
								Read more
								<ExternalLink size={20} />
							</a>
						</div>
					</div>
				</div>
			{/if}
		</div>
	{/each}
</div>
