import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { formatDate } from './src/lib/utils';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { kitRoutes } from 'vite-plugin-kit-routes';
export default defineConfig(({ mode }) => {
	const isProduction = mode === 'production';
	const netlifyURL = process.env.URL;

	return {
		define: {
			'process.env.BUILD_TIME': JSON.stringify(formatDate(new Date())),
			VITE_API_BASE_URL:
				isProduction && netlifyURL
					? JSON.stringify(`${netlifyURL}/.netlify/functions`)
					: JSON.stringify('http://localhost:8888/.netlify/functions')
		},
		ssr: {
			noExternal: ['three']
		},
		plugins: [enhancedImages(), sveltekit(), kitRoutes(), purgeCss()]
	};
});
