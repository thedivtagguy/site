<script>
	import slide1 from '$lib/assets/images/common/eymen-1.png';
	import slide2 from '$lib/assets/images/common/eymen-2.png';
	import { onMount } from 'svelte';
	let currentImage = slide1;
	let images = [slide1, slide2];
	let currentIndex = 0;

	const switchImage = () => {
		currentIndex = (currentIndex + 1) % images.length;
		currentImage = images[currentIndex];
	};

	onMount(() => {
		const interval = setInterval(switchImage, 2000);
		return () => clearInterval(interval);
	});
</script>

<figure class="max-w-2xl">
	<img src={currentImage} alt="Slideshow " />
</figure>
