<script>
	import { onMount } from 'svelte';

	let subscribeToDiagramChasing = true;

	// Text variations for the newsletter
	const textVariations = [
		'I also write a newsletter on data visualization, my side projects and stuff like this. Consider subscribing if you like what you see!',
		'Want to stay updated on my latest data viz projects and ideas? Subscribe to my newsletter!',
		'Join my newsletter for updates on data visualization, coding projects, and more cool stuff.',
		'Never miss new tutorials and projects - subscribe to get updates delivered to your inbox.',
		'Like what you see? Get more content like this in my newsletter!',
		'I occasionally send emails about data viz experiments, maps, and coding shenanigans. Subscribe if that sounds fun.',
		'My newsletter features dataviz explorations too fleeting for blog posts. No spam, just occasional interesting stuff.',
		"If you're into maps, data, or code tinkering, my newsletter might be your jam. New experiments land there first.",
		'I send newsletters with behind-the-scenes looks at my data projects. Usually once a month, never overwhelming.',
		'My newsletter is where I share data visualization techniques, side projects, and thoughts on tech.'
	];

	// Select a random text
	let selectedText = textVariations[Math.floor(Math.random() * textVariations.length)];

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
</script>

<div
	class="newsletter-signup-component flex flex-col gap-1 outline my-6 outline-1 outline-base-300/50 outline-offset-4 bg-base-200 py-4 px-4 rounded-2xl"
>
	<p class="text-base text-neutral/80 text-center font-roboto">
		{selectedText}
	</p>
	<form
		action="https://buttondown.com/api/emails/embed-subscribe/amanbh"
		method="post"
		target="popupwindow"
		on:submit={() => window.open('https://buttondown.com/amanbh', 'popupwindow')}
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
