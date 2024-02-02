<script>
	import Video from '$lib/assets/anfscd.mp4';
	import VideoPoster from '$lib/assets/images/common/poster-footer.webp';
	import Logo from '$lib/assets/svg/Logo.svelte';
	import License from '$lib/assets/images/common/license.png';
	import NotAi from '$lib/assets/svg/NotAi.svelte';
	import Terminal from '$lib/components/Terminal/Terminal.svelte';
	import Scrobble from './Scrobble.svelte';
	import Online from './Online.svelte';
</script>

<footer
	class="mx-auto w-full p-2 h-full max-w-[83rem] border-[1px] rounded-lg rounded-br-none rounded-bl-none border-b-0 border-base-300"
>
	<div class="relative border-none h-full md:min-h-[600px] min-h-[800px] footer">
		<video
			style="object-position: center 55%;"
			class="absolute object-cover border-none w-full h-full rounded-[0.25rem] object"
			src={Video}
			autoplay
			muted
			tabindex="-1"
			loop
			playsinline
			preload="none"
			poster={VideoPoster}
		></video>
		<div
			class="relative z-10 flex flex-col items-start justify-between h-full gap-8 px-4 py-10 md:px-12 md:flex-row"
		>
			<div class="flex flex-row w-full text-white md:basis-6/12">
				<div class="basis-2/5 md:basis-1/5">
					<Logo width={60} height={120} />
					<img src={License} alt="CC-BY license" class="w-20 mt-4" />
				</div>
				<div class="grid w-full grid-cols-2 gap-4 basis-4/5">
					<div class="grid grid-cols-1 md:basis-2/5 md:grid-cols-2 basis-full">
						<h3 class="font-bold font-roboto text-base-200">My socials</h3>
						<ul
							class="divide-y-[1px] divide-base-100 divide-opacity-15 *:py-1 first:*:pt-0 last:*:pb-0 text-base-200"
						>
							<li class="font-roboto"><a href="https://twitter.com/thedivtagguy">Twitter</a></li>
							<li class="font-roboto">
								<a href="https://instagram.com/thedivtagguy">Instagram</a>
							</li>
							<li class="font-roboto"><a href="https://bsky.app/profile/aman.bh">Bluesky</a></li>
							<li class="font-roboto"><a href="https://fosstodon.org/@amnbh">Mastodon</a></li>
							<li class="font-roboto"><a href="mailto:amanbhargava2001@gmail.com">Email</a></li>
						</ul>
					</div>
					<div class="grid grid-cols-1 md:basis-1/2 md:grid-cols-2 basis-full">
						<h3 class="p-0 m-0 font-bold font-roboto text-base-200">Misc. links</h3>
						<ul
							class="divide-y-[1px] divide-base-100 divide-opacity-15 *:py-1 first:*:pt-0 last:*:pb-0 text-base-200"
						>
							<li class="font-roboto"><a href="/colophon">Colophon</a></li>
							<li class="font-roboto"><a href="/colophon#what-i-track">What I track</a></li>
							<li class="font-roboto"><a href="/ai-policy">AI Policy</a></li>
							<!-- <li class="font-roboto">RSS</li> -->
						</ul>
					</div>
					<div
						class="relative flex flex-col items-start w-full h-full col-span-2 md:hidden md:items-start place-content-start md:place-self-start"
					>
						<!-- <Scrobble /> -->
						<!-- <Online /> -->
					</div>
				</div>
			</div>

			<div class="hidden md:basis-5/12 md:block basis-full">
				<Terminal />
			</div>
			<div
				class="relative flex-col items-end hidden w-full h-full md:flex md:items-start place-content-end md:place-self-start basis-1/5"
			>
				<Scrobble />
				<Online />
			</div>
		</div>
		<div class="absolute top-0 left-0 w-full h-full bg-cover bg-noise z-5"></div>
	</div>

	<aside class="py-2 -mb-2 text-xs italic tracking-tighter text-center font-fira">
		· ✤ ٠ —– ٠ If you have been, thanks for reading —– ✤ ٠ ·
	</aside>
</footer>

<style>
	.bg-noise {
		width: 100%;
		height: 100%;
		filter: contrast(170%) brightness(100%);
		background: url("data:image/svg+xml,%3Csvg viewBox='0 0 245 245' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='8.51' numOctaves='10' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
		mix-blend-mode: overlay;
		opacity: 0.7;
	}
</style>
