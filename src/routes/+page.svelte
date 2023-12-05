<script>
	import Hero from '$lib/components/Homepage/Hero.svelte';
	import VizOfTheWeek from '$lib/components/Homepage/VizOfTheWeek.svelte';
	import TextDivider from '$lib/components/Primary/TextDivider.svelte';
	export let data;

	console.log(data);
</script>

<Hero />
<VizOfTheWeek />
<TextDivider>Heard and seen, here and there</TextDivider>
