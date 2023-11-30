<script>
	import slide1 from '$lib/assets/images/common/eymen-1.webp';
	import slide2 from '$lib/assets/images/common/eymen-2.webp';
	import { onMount } from 'svelte';
	let currentImage = slide1;
	let images = [slide1, slide2];
	let currentIndex = 0;
	let imageSize = '500'; // Set size for square images

	const switchImage = () => {
		currentIndex = (currentIndex + 1) % images.length;
		currentImage = images[currentIndex];
	};

	onMount(() => {
		const interval = setInterval(switchImage, 2000);
		return () => clearInterval(interval);
	});
</script>

<figure class="basis-2/4 -mt-2 h-full">
	<img
		src={currentImage}
		alt="Slideshow"
		width={imageSize}
		height={imageSize}
		class="h-full w-auto"
	/>
</figure>
