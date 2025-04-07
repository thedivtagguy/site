<script>
	import { onMount } from 'svelte';

	// Use DOM position detection instead of counters
	let isSecondInstance = false;

	onMount(() => {
		// Only run in browser
		if (typeof document !== 'undefined') {
			// Find all newsletter components on the page
			const allNewsletters = document.querySelectorAll('.newsletter-signup-component');

			// If this is not the first one, set it as a second instance
			if (allNewsletters.length > 1) {
				// Check if this particular component isn't the first one
				const currentIndex = Array.from(allNewsletters).indexOf(
					allNewsletters[allNewsletters.length - 1]
				);
				isSecondInstance = currentIndex > 0;
			}
		}
	});

	let subscribeToDiagramChasing = true;

	// First instance text variations
	const firstInstanceTexts = [
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

	// Second instance text variations
	const secondInstanceTexts = [
		"Enjoyed the content? There's more where that came from. Subscribe to get it directly in your inbox!",
		'Want to dive deeper? My newsletter covers extended topics not found on the site.',
		'Thanks for reading this far! Consider subscribing for exclusive content and early access.',
		'Still here? You might enjoy my regular newsletter with behind-the-scenes content.',
		'One more thing: subscribe to my newsletter for follow-ups on topics covered here.',
		"Since you've read this far, you might enjoy my newsletter where I explore these ideas in greater depth.",
		'Still reading? My newsletter features similar deep dives and experiments without the Twitter algorithm getting in the way.',
		'If you found this useful, my newsletter has more coding experiments and data adventures worth checking out.',
		'Made it to the end? My newsletter is for folks like you who actually read things thoroughly.',
		"Before you go - I write about these topics more extensively in my newsletter. No pressure, but it's there if you want it."
	];

	// Select a random text based on instance
	$: textOptions = isSecondInstance ? secondInstanceTexts : firstInstanceTexts;
	$: selectedText = textOptions[Math.floor(Math.random() * textOptions.length)];

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
