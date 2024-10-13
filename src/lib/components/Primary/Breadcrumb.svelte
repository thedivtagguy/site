<script>
	import { page } from '$app/stores';
	import { ChevronRight } from 'lucide-svelte';

	$: path = $page.url.pathname;
	$: breadcrumbs = [
		{ label: 'Home', href: '/' },
		...path
			.split('/')
			.filter(Boolean)
			.map((segment, index, array) => ({
				label: segment.charAt(0).toUpperCase() + segment.slice(1),
				href: '/' + array.slice(0, index + 1).join('/')
			}))
	];
</script>

<main class=" w-full max-w-[83rem] mt-4">
	<div class="grid h-full grid-cols-1 gap-6 md:grid-cols-2">
		<div class="col-span-1">
			<hgroup class="items-start justify-start w-full">
				<ol
					class="flex items-start justify-start whitespace-nowrap font-roboto"
					aria-label="Breadcrumb"
				>
					{#each breadcrumbs as crumb, index}
						<li class="inline-flex items-center">
							<a
								class="flex items-center text-sm text-neutral-300 hover:underline"
								href={crumb.href}
							>
								{crumb.label}
							</a>
							{#if index < breadcrumbs.length - 1}
								<ChevronRight class="h-4 stroke-neutral-300" />
							{/if}
						</li>
					{/each}
				</ol>
			</hgroup>
		</div>
	</div>
</main>
