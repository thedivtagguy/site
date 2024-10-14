import { preprocessMeltUI, sequence } from '@melt-ui/pp';
import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
const mdsvexOptions = {
	extensions: ['.md', '.svx', '.mdx']
};
/** @type {import('@sveltejs/kit').Config}*/
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	extensions: ['.svelte', '.md', '.svx', '.mdx'],
	preprocess: sequence([vitePreprocess(), mdsvex(mdsvexOptions), preprocessMeltUI()]),
	vitePlugin: {
		inspector: true
	},
	kit: {
		prerender: {
			handleHttpError: 'ignore'
		},
		adapter: adapter({
			edge: false
		})
	}
};
export default config;
