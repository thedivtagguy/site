import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { formatDate } from './src/lib/utils';
import { ttplugin } from './src/lib/scripts/tidytuesdayCalendar';

export default defineConfig({
	define: {
		'process.env.BUILD_TIME': JSON.stringify(formatDate(new Date())),
	  },
	plugins: [
		enhancedImages(),
		sveltekit(),
		ttplugin()
	]
});
