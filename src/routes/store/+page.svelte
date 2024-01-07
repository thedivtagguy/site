<script>
	import Header from '$lib/components/Store/Header.svelte';
	import ProductImage from '$lib/assets/images/store/mapsample.jpg?enhanced';
	import Stamp from '$lib/components/Work/Stamp.svelte';
	import Buildings from '$lib/assets/images/store/buildings.webp';
</script>

<Header />
<main class="min-h-[90vh] max-w-[83rem] my-4">
	<div class="grid h-full grid-cols-1 gap-6 md:grid-cols-2">
		<div
			class="h-full flex flex-col justify-center col-span-1 m-[0.3rem] w-full text-left outline outline-1 outline-base-300 outline-offset-4 bg-base-200 p-8 rounded-xl border-[1px] border-base-300"
		>
			<div class="mb-8 max-h-32">
				<Stamp
					--rotation={2}
					--stamp-cut-scale={0.5}
					background={Buildings}
					--stamp-background-color="#FEFEFE"
					disabled={true}
				/>
			</div>
			<h3 class="text-5xl font-black leading-tight text-left font-libre-caslon">
				The canvas of your city
			</h3>
			<p class="mt-4 text-lg font-archivo">
				High quality map prints of an area of your choice. Produced on a selection of premium fine
				art paper and sizes – available unframed or framed, and sent safely and securely direct to
				your door.
			</p>
			<a href="/store/buildings" class="w-40 h-16 mt-6 btn-primary bg-orange"> Grab a copy </a>
		</div>
		<div class="w-full col-span-1 -mb-2">
			<figure class="noise-image">
				<enhanced:img
					src={ProductImage}
					alt="sample"
					class="h-[40rem] w-full object-cover rounded-xl"
				/>
				<caption class="w-full py-4"
					>And they look pretty nice, if you ask me? <br />
					<span class="text-xs italic"
						>Or <a class="underline" href="https://twitter.com/sahilk">Sahil</a>, who sent me this
						picture of his copy!</span
					></caption
				>
			</figure>
		</div>
	</div>
	<hr class="mt-8 divide" />
</main>
