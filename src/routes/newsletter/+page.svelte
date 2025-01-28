<script>
	import NewsletterImage from '$lib/assets/images/newsletter-image.webp';
	import NewsletterForm from '$lib/components/Primary/NewsletterForm.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const status = $page.url.searchParams.get('status');
	const isNewsletterFlow = status === 'confirmed' || status === 'unconfirmed';

	const buttons = [
		{
			label: 'Recent works',
			href: '/work',
			bg: 'bg-purple'
		},
		{
			label: 'Link Hoard',
			href: '/links',
			bg: 'bg-red'
		},
		{
			label: 'Diagram Chasing',
			href: 'https://diagramchasing.fun',
			bg: 'bg-blue'
		}
	];

	$: if (!isNewsletterFlow) {
		goto('/blog/2025/keeping-in-touch#email');
	}
</script>

<section class="py-6 px-4 flex md:flex-row justify-center items-center flex-col gap-8">
	<div class="{isNewsletterFlow ? 'basis-1/2' : 'w-full'} space-y-4">
		{#if status === 'confirmed'}
			<h1 class="text-4xl font-bold border-b border-gray-300 pb-4">Thanks for subscribing!</h1>

			<p class="text-lg">
				You've successfully confirmed your subscription. Welcome aboard! I'll be writing to you very
				soon with what I've been up to this month and other interesting things I've found.
			</p>

			<p class="text-lg">
				PS: If you're interested in dataviz and the kind of stuff we make at <a
					href="https://diagramchasing.fun">Diagram Chasing</a
				>, we've decided to
				<a href="/blog/2025/keeping-in-touch#discord" class="underline text-purple"
					>open our Discord server</a
				>! Come on over and talk about data, design, and other nerdy stuff if you're into that sort
				of thing.
			</p>
		{:else if status === 'unconfirmed'}
			<h1 class="text-4xl font-bold border-b border-gray-300 pb-4">Thanks for subscribing!</h1>

			<p class="text-lg">
				You're one of the first to subscribe and I'm excited to have you! I know, I know. Another
				'techbro' with a newsletter. But hopefully it's interesting, ya know?
			</p>
			<p class="text-lg">
				For now I'm calling it 'Magpieing & Making'. I like the word magpieing because it feels like
				it's what I'm constantly doing, just collecting shiny bits and interesting ideas wherever I
				find them (like a chronically online magpie with too many tabs open). Instead of hoarding it
				for myself, I'd like to share it with you.
			</p>
			<p class="text-lg">
				The "Making" part is where I'll document my progress on making various things and what I've
				learnt along the way.
			</p>
			<p class="text-lg">
				So, welcome aboard! You're officially part of this experiment. I'll be writing to you soon.
			</p>
			<hr class="border-gray-300" />
			<p class="text-lg">
				PS: Remember to <strong>confirm your subscription</strong> by clicking the link in the email
				you'll receive in a bit.
			</p>
		{/if}

		{#if isNewsletterFlow}
			<hr class="border-gray-300" />
			<div class="flex flex-col gap-2">
				<h3 class="text-2xl font-bold font-libre-caslon">
					In the meantime, here's some other stuff to browse!
				</h3>
				<div class="flex flex-row gap-2">
					{#each buttons as button}
						<a href={button.href} class="btn btn-primary {button.bg}">{button.label}</a>
					{/each}
				</div>
			</div>
		{/if}
	</div>
	{#if isNewsletterFlow}
		<img
			class="rounded-3xl w-1/3 outline my-2 outline-1 outline-base-300 outline-offset-4 border-[1px] border-base-300"
			alt="Graphic showing Aman sitting with his laptop writing a newsletter"
			src={NewsletterImage}
		/>
	{/if}
</section>
