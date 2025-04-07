<script>
	export let widgetName;

	// Convert widget name to SVG filename
	const getSvgFilename = (name) => {
		// Handle special cases
		if (name === 'Select Rows') return 'SelectRows.svg';
		if (name === 'Select Columns') return 'SelectColumns.svg';
		if (name === 'Group By') return 'GroupBy.svg';
		if (name === 'Merge Data') return 'MergeData.svg';
		if (name === 'Edit Domain') return 'EditDomain.svg';
		if (name === 'Feature Statistics') return 'FeatureStatistics.svg';
		if (name === 'Formula') return 'FeatureConstructor.svg';
		if (name === 'Data Table') return 'Table.svg';
		if (name === 'Save Data') return 'Save.svg';
		if (name === 'Melt') return 'Melt.svg';
		if (name === 'Transpose') return 'Transpose.svg';
		if (name === 'Pivot') return 'Pivot.svg';
		if (name === 'Concatenate') return 'Concatenate.svg';
		if (name === 'Unique') return 'Unique.svg';

		// Default case - convert to camelCase and add .svg
		return name.replace(/\s+/g, '') + '.svg';
	};

	const svgUrl = `https://raw.githubusercontent.com/biolab/orange3/f606f130e2a2d05c16bbb2f05d98db30ea9d0a78/Orange/widgets/data/icons/${getSvgFilename(
		widgetName
	)}`;
</script>

<span class="widget-icon">
	<img src={svgUrl} alt={`${widgetName} icon`} />
</span>

<style>
	.widget-icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 35px;
		height: 35px;
		border-radius: 50%;
		background: radial-gradient(circle at center, #ffa726 0%, #fb8c00 100%);
		margin-right: 8px;
		vertical-align: middle;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
	}

	.widget-icon img {
		width: 25px;
		height: 25px;
		opacity: 0.85;
	}
</style>
