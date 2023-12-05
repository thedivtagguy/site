<script>
	import slide1 from '$lib/assets/images/common/eymen-1.webp';
	import Eymen from '$lib/assets/eymen.webm';
	import { onMount } from 'svelte';
	import { localStorageStore } from 'fractils';
	import { fade } from 'svelte/transition';

	const lastVisitStore = localStorageStore('lastVisit', null);
	const twelveHours = 12 * 60 * 60 * 1000;

	let lastVisit = $lastVisitStore;
	let greeting = '';
	const greetings = {
		new: [
			'Oh crap, you found me.',
			"Hey, you're here!",
			'Why hello there lil fella',
			'Are you lost?',
			'What brings you here?',
			"Well, well, well, look who's here",
			'A wild visitor appears',
			'You? Here? On purpose?',
			'Look what the cat dragged in'
		],
		returning: [
			'Welcome back!',
			"Hey, you're back!",
			'Omg you came back!',
			"It's been a while!",
			"Oh, it's you again",
			'Yeah, I remember you',
			'Good to see you again',
			'Round two, huh?',
			'Back for more?',
			'Oh, not tired of me yet?',
			'You again? Huh. That is new.',
			"I'm glad you're back"
		]
	};
	onMount(() => {
		const now = new Date().getTime();
		let isNewUser = false;

		if (!lastVisit || now - lastVisit > twelveHours) {
			isNewUser = true;
			lastVisitStore.set(now);
		}

		const greetingType = isNewUser ? 'new' : 'returning';
		greeting = greetings[greetingType][Math.floor(Math.random() * greetings[greetingType].length)];
	});
</script>

<div class="relative">
	<video
		tabindex="-1"
		src={Eymen}
		style="width: 100%; max-width: 800px;"
		autoplay
		muted
		loop
		playsinline
		preload="none"
		poster={slide1}
	></video>
	<aside
		in:fade={{ duration: 1000 }}
		class="absolute top-[1.9rem] w-[6.5rem] h-60 px-4 text-xs leading-snug left-[6rem] text-center font-bold text-base-300 -skew-y-[17deg]"
	>
		<p class="uppercase tracking-tighter font-bold font-fira">{greeting}</p>
	</aside>
	<div class="absolute top-0 left-0 w-full h-full bg-noise bg-cover z-5"></div>
</div>

<style>
	.bg-noise {
		width: 100%;
		height: 100%;
		filter: contrast(170%) brightness(3000%);
		background: linear-gradient(180deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),
			url("data:image/svg+xml,%3Csvg viewBox='0 0 245 245' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='8.51' numOctaves='10' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
		mix-blend-mode: soft-light;
		opacity: 0.4;
	}
</style>
