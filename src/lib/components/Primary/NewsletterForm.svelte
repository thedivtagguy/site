<script lang="ts">
	import { ArrowRight } from 'lucide-svelte';
	let emails = [
		'coconuts@migratorybirdscience.org',
		'doriangray@portrait.art',
		'bilbo.baggins@shire.org',
		'gandalf@middleearth.com',
		'frodo@shire.org',
		'samwise@shire.org',
		'heathcliff@wuthering.com',
		'doc@canneryrowsardines.fish',
		'deerstalker@whodunit.com',
		'vogon@poetrycritique.agency',
		'fordprefect@galactictravelguides.org'
	];
	let subscribeToDiagramChasing = true;
</script>

<div
	class="flex flex-col w-full gap-1 outline my-2 outline-1 outline-base-300/50 outline-offset-4 bg-base-200 py-2 px-2 rounded-2xl"
>
	<h3 class="text-sm text-neutral/80 font-roboto inline-flex items-center justify-center font-bold">
		<a
			href="/blog/2025/keeping-in-touch#email"
			class="underline underline-offset-4 decoration-dashed hover:text-neutral"
			>My newsletter on dataviz and more <ArrowRight class="inline size-4" /></a
		>
	</h3>
	<form
		action="https://buttondown.com/api/emails/embed-subscribe/amanbh"
		method="post"
		target="popupwindow"
		onSubmit={() => {
			window.open('https://buttondown.com/amanbh', 'popupwindow');
		}}
		class="flex flex-col gap-2"
	>
		<div class="flex flex-col md:items-center gap-3">
			<input
				type="email"
				name="email"
				id="bd-email"
				placeholder={emails[Math.floor(Math.random() * emails.length)]}
				required
				class="flex-1 w-full px-3 py-2 placeholder:text-neutral/70 placeholder:text-xs bg-white rounded border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>
		<div class="flex justify-between">
			<label class="flex items-center gap-2 text-xs text-neutral/80">
				<input
					type="checkbox"
					bind:checked={subscribeToDiagramChasing}
					class="w-4 h-4 rounded border-zinc-300 dark:border-zinc-600 text-blue-600 focus:ring-blue-500"
				/>
				<span>
					Also subscribe to
					<a
						href="https://diagramchasing.fun"
						target="_blank"
						class="underline block"
						rel="noopener noreferrer">Diagram Chasing</a
					>
				</span>
			</label>
			{#if subscribeToDiagramChasing}
				<input type="hidden" name="tag" value="diagramChasing" />
			{/if}
			<button type="submit" class="btn-primary bg-purple"> Subscribe </button>
		</div>
	</form>
</div>
