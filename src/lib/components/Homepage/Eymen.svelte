<script>
	import slide1 from '$lib/assets/images/common/eymen-1.png?enhanced';
	import slide2 from '$lib/assets/images/common/eymen-2.png?enhanced';
	import { onMount } from 'svelte';
	let currentImage = slide1;
	let images = [slide1, slide2];
	let currentIndex = 0;
	let imageSize = '500';

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
	<enhanced:img src={currentImage} alt="Slideshow" class="h-full w-auto" />
</figure>
