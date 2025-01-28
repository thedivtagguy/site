import { preprocessMeltUI, sequence } from '@melt-ui/pp';
import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import remarkFootnotes from 'remark-footnotes';
import relativeImages from 'mdsvex-relative-images';
import rehypeSlug from 'rehype-slug';
import rehypeAutoLink from 'rehype-autolink-headings';
import remarkTOC from 'remark-toc';
const mdsvexOptions = {
	extensions: ['.md', '.svx', '.mdx'],
	remarkPlugins: [remarkFootnotes, relativeImages, remarkTOC],
	rehypePlugins: [rehypeSlug, rehypeAutoLink]
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
			handleHttpError: 'ignore',
			entries: [
				'*',
				'/newsletter',
				'/newsletter?status=confirmed',
				'/newsletter?status=unconfirmed'
			]
		},
		adapter: adapter({
			edge: false
		})
	}
};

export default config;
