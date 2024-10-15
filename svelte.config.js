import { preprocessMeltUI, sequence } from '@melt-ui/pp';
import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import remarkFootnotes from 'remark-footnotes';

const mdsvexOptions = {
	extensions: ['.md', '.svx', '.mdx'],
	remarkPlugins: [remarkFootnotes]
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
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
