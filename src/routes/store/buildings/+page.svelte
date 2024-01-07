<script>
	import LeafletMap from '$lib/components/Store/Map/MainMap.svelte';
	import { ChevronRight } from 'lucide-svelte';
</script>

<main class="min-h-[90vh] w-full max-w-[83rem] my-4">
	<div class="grid h-full grid-cols-1 gap-6 md:grid-cols-2">
		<div class="col-span-1">
			<hgroup class="items-start justify-start w-full">
				<ol class="flex items-start justify-start whitespace-nowrap font-roboto" aria-label="Links">
					<li class="inline-flex items-center">
						<a class="flex items-center text-sm text-base-300 hover:underline" href="/"> Home </a>
						<ChevronRight class="h-4 stroke-base-300" />
					</li>
					<li class="inline-flex items-center">
						<a class="flex items-center text-sm text-base-300 hover:underline" href="/store">
							Store
						</a>
						<ChevronRight class="h-4 stroke-base-300" />
					</li>
					<li class="inline-flex items-center">
						<a class="flex items-center text-sm text-base-300 hover:underline" href="/buildings">
							Building Footprints
						</a>
					</li>
				</ol>
			</hgroup>
			<div class="py-4">
				<LeafletMap />
			</div>
		</div>
	</div>
</main>
