<script>
	import { formatDate } from '$lib/utils';

	export let title = 'A new post';
	export let date = new Date().toISOString();
</script>

<div class="flex flex-row flex-col w-full col-span-1 gap-2 md:col-span-2">
	<div class="note basis-1/2">
		<figure class="relative max-w-sm">
			<div
				class="absolute w-[15rem] lg:max-w-[14rem] lg:w-full top-[15%] lg:top-[16%] flex flex-col justify-between left-[16%] -rotate-[16deg]"
			>
				<p class="my-2 text-sm tracking-tighter uppercase md:text-md font-fira">Blog /</p>
				<h3 class="text-3xl uppercase break-words font-libre-caslon">
					{title}
				</h3>
				<p class="my-2 text-xs tracking-tighter text-left uppercase md:m-2 md:text-md font-fira">
					{formatDate(date)}
				</p>
			</div>
			<!-- <img src={orangeNote} alt="background" height="355" class="w-full pointer-events-none" /> -->
		</figure>
	</div>
</div>

<style>
	div {
		font-family: 'Libre Caslon Condensed';
		display: flex;
		flex-direction: column;
		font-size: 50px;

		height: 100%;
		width: 100%;
		align-items: center;
		justify-content: center;
	}
</style>
