import { preprocessMeltUI, sequence } from '@melt-ui/pp';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';
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
	kit: {
		prerender: {
			handleHttpError: 'ignore'
		},
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		})
	}
};
export default config;
