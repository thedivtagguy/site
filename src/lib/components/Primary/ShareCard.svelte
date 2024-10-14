<script>
	import { formatDate } from '$lib/utils';
	export let title = 'A new post';
	export let date = new Date().toISOString();
</script>

<div style="background-color: #E1E1E1;" class="flex w-full py-12 px-44">
	<div class="border-2 relative max-h-[535px] px-6 rounded-md border-black/50 py-4">
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
		<img
			src="https://aman.bh/sharecard-assets/stamp.png?34345"
			alt="background"
			class="w-[200px] absolute right-8 top-2 h-[180px] rotate-12 pointer-events-none"
		/>

		<div class="top-48 right-[5.6rem] mx-28 pl-[31.5rem] flex flex-col gap-[4rem] absolute">
			{#each Array(5) as line}
				<hr class="w-84 mt-5 text-black border-t border-black/20" />
			{/each}
		</div>
		<p class="text-sm w-full max-w-[22rem] self-end text-black/40 -mb-0 pl-[3.2rem] break-words">
			Published via https://aman.bh, an otherwise general mishmash of the varied interests of Aman
			Bhargava (also known as @thedivtagguy)
		</p>
	</div>
</div>

<style>
	div {
		font-family: 'Libre Caslon Condensed';
		display: flex;

		margin: auto;
		height: 100%;
		width: 100%;
		align-items: flex-start;
		justify-content: flex-start;
	}
</style>
