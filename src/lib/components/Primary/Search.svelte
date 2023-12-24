<script>
	import Typeahead from 'svelte-typeahead';

	// Example data array
	export let data = [];
	export let titleKey = 'title';
	// Function to flatten an object
	const flattenObject = (obj, prefix = '') =>
		Object.keys(obj).reduce((acc, k) => {
			const pre = prefix.length ? prefix + '.' : '';
			if (typeof obj[k] === 'object') Object.assign(acc, flattenObject(obj[k], pre + k));
			else acc[pre + k] = obj[k];
			return acc;
		}, {});

	// Function to extract searchable text from each item
	const extract = (item) => {
		const flattened = flattenObject(item);
		return Object.values(flattened).join(' ').toLowerCase();
	};
	const getTitle = (item) => item[titleKey] || 'No title';
</script>

<Typeahead
	hideLabel
	label="Search works"
	placeholder="Try me..."
	{data}
	{extract}
	let:result
	let:value
>
	{#if result.score >= 20}
		<div>
			<strong>{getTitle(result.original)}</strong>
		</div>
	{/if}
</Typeahead>
