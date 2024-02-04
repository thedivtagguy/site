<script lang="ts">
	import Plus from '$lib/assets/svg/Plus.svelte';
	import Badge from '../Primary/Badge.svelte';
	import Heart from '$lib/assets/svg/Heart.svelte';
	import { ExternalLink } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { createAccordion, melt } from '@melt-ui/svelte';
	import { fade, slide } from 'svelte/transition';
	import { scrollIntoView, scrollFade, scrollShadow } from 'svelte-ux';
	import { formatDate, slugify } from '$lib/utils';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { writable } from 'svelte/store';
	import { isWorkBeingFiltered } from '$lib/stores';

	export { className as class };
	export let data;

	let className = '';
	let openProjectParam = writable('');
	const setProjectParam = (slug: string) => () => {
		goto(`/work/?project=${slug}`, { noScroll: true });
	};
	const filtered = isWorkBeingFiltered();

	const {
		elements: { content, item, trigger, root },
		helpers: { isSelected },
		states: { value }
	} = createAccordion({
		value: openProjectParam
	});

	$: if ($page.url.searchParams.get('project') && !$filtered) {
		$openProjectParam = data.find(
			(item) => item.slug === $page.url.searchParams.get('project')
		).title;
	} else if (!$page.url.searchParams.get('project') && !$filtered) {
		$openProjectParam = data.find((item) => item.favorite).title;
	}
</script>

<div class={cn('h-screen overflow-y-auto', className)} {...$root}>
	{#each data as { title, description, link, projectLink, type, client, favorite, label, date, slug, thumbnail, tools }, i (i)}
		{@const readMoreLink = projectLink ? projectLink : link ? link : ''}
		<article
			id={slugify(slug)}
			use:scrollIntoView={{
				condition: slug === $page.url.searchParams.get('project')
			}}
			use:melt={$item(title)}
			class="overflow-hidden transition-colors"
		>
			<header class="flex text-2xl">
				<button
					use:melt={$trigger(title)}
					on:click={setProjectParam(slug)}
					class={cn(
						'flex flex-1 cursor-pointer text-left text-2xl md:text-3xl items-start md:items-center justify-between ',
						'px-5 py-4 gap-4 font-medium leading-none',
						'text-black transition-colors focus:!ring-0',
						'focus-visible:text-magnum-800',
						i !== 0 && 'border-t border-t-neutral-300',
						$isSelected(title) ? 'bg-base-200' : ''
					)}
				>
					<span class="inline-flex items-center gap-2 leading-normal font-libre-caslon">
						<Plus
							class={$isSelected(title)
								? 'rotate-45 transition-transform duration-600'
								: 'transition-transform duration-600'}
						/>
						{title}
					</span>
					{#if (type === 'bylines' && client.title) || (type === 'Client' && client.title)}
						{#if !$isSelected(title)}
							<div out:fade={{ duration: 200 }} in:fade>
								<Badge>
									<img
										height="12"
										width="80"
										class="me-1.5 h-6 inline-block object-contain"
										src={client.logo}
										alt={`${client.title} logo`}
									/>
								</Badge>
							</div>
						{/if}
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
			</header>
			{#if $isSelected(title)}
				<div
					class="flex flex-col gap-4 pb-6 pl-12 pr-6 content bg-base-200 md:flex-row md:pl-12"
					use:melt={$content(title)}
					transition:slide
				>
					{#if thumbnail}
						<figure class="basis-2/6">
							<img
								class="w-[230px] h-[300px] rounded-xl border-neutral border-[1px] object-cover noise-image"
								loading="eager"
								src={thumbnail}
								alt={`Thumbnail for ${title}`}
							/>
						</figure>
					{/if}
					<div class="basis-4/6 relative flex flex-col justify-between gap-2 min-h-[300px] h-full">
						<div>
							<span class="text-sm text-gray-600 date font-fira">{formatDate(date)}</span>
							<hr class="pb-2 border-base-300" />
							<p class="pb-2 text-xl not-italic font-archivo">{description}</p>
							<div
								class="grid {tools
									? 'border-b-[1px]'
									: ''} border-t-[1px] border-base-300 md:grid-cols-4 w-full md:divide-x-[1px] divide-base-300 py-4 gap-6"
							>
								{#if (type === 'bylines' && client.title) || (type === 'Client' && client.title)}
									<div class="col-span-1">
										<p class="pb-2 text-xs font-medium tracking-widest uppercase font-fira">for</p>
										<img
											width="80"
											height="20"
											class="inline-block object-contain"
											src={client.logo}
											alt={`${client.title} logo`}
										/>
									</div>
								{/if}

								{#if tools}
									<div class="col-span-1 first:px-0 md:pl-8">
										<p class="pb-2 text-xs font-medium tracking-widest uppercase font-fira">
											Tools
										</p>
										<p class="w-full leading-tight font-archivo">
											{tools.join(', ')}
										</p>
									</div>
								{/if}
							</div>
						</div>
						<div class="cta">
							<a
								href={readMoreLink}
								class="btn-primary w-80 bg-blue"
								target="_blank"
								rel="noopener noreferrer"
							>
								Read more
								<ExternalLink size={20} />
							</a>
						</div>
					</div>
				</div>
			{/if}
		</article>
	{/each}
</div>
