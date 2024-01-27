import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const post = await import(`../../../../content/blog/${params.year}-${params.slug}.mdx`);
		console.log(params.slug, params.year);
		return {
			content: post.default,
			meta: post.metadata
		};
	} catch (e) {
		error(404, `Could not find ${params.slug}`);
	}
}
