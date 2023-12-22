// fontUtils.js

export function determineFontWeight(tags) {
	const counts = Object.values(tags);
	const maxCount = Math.max(...counts);
	const minCount = Math.min(...counts);

	function getPercentile(count) {
		return ((count - minCount) / (maxCount - minCount)) * 120;
	}

	return function fontStyles(count) {
		const percentile = getPercentile(count);

		// Interpolate font weight
		const minFontWeight = 300;
		const maxFontWeight = 800;
		const fontWeight = minFontWeight + (percentile / 100) * (maxFontWeight - minFontWeight);

		// Interpolate font size
		const minFontSize = 9; // Minimum font size in pixels
		const maxFontSize = 15; // Maximum font size in pixels
		const fontSize = minFontSize + (percentile / 100) * (maxFontSize - minFontSize);

		// Interpolate opacity
		const minOpacity = 0.7;
		const maxOpacity = 1;
		const opacity = minOpacity + (percentile / 100) * (maxOpacity - minOpacity);

		return `font-weight: ${Math.round(fontWeight)}; font-size: ${Math.round(
			fontSize
		)}px; opacity: ${opacity.toFixed(2)};`;
	};
}
