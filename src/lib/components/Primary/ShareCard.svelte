<script>
	import { formatDate } from '$lib/utils';
	export let title = 'A new post';
	export let date = new Date().toISOString();
</script>

<div class="flex w-full py-12 px-44">
	<div class="border-2 max-h-[535px] px-6 rounded-md border-black/50 py-4">
		<figure class="flex justify-center items-center max-w-sm">
			<div
				style="transform: rotate(-16deg);"
				class="absolute max-w-[23rem] pr-12 pl-8 w-full top-[15%] lg:top-[16%] flex flex-col justify-between left-[16%]"
			>
				<p class="my-2 text-sm tracking-tighter uppercase md:text-md font-fira">Blog /</p>
				<h3 class="text-3xl uppercase break-words font-libre-caslon">
					{title}
				</h3>
				<p
					class="my-2 text-md tracking-tighter -ml-1 text-left uppercase md:m-2 md:text-md font-fira"
				>
					{formatDate(date)}
				</p>
			</div>
			<img
				src="https://aman.bh/orange-note.png"
				alt="background"
				class="w-[400px] h-[500px] rotate-12 pointer-events-none"
			/>
		</figure>
	</div>
</div>

<style>
	div {
		font-family: 'Libre Caslon Condensed';
		display: flex;
		flex-direction: column;
		margin: auto;
		height: 100%;
		width: 100%;
		align-items: flex-start;
		justify-content: flex-start;
	}
</style>
