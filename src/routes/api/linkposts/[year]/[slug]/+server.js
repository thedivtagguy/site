import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

export const prerender = true;

async function getPost(year, slug) {
	const posts = import.meta.glob('../../../../../content/links/*.mdx', { eager: true });
	const postPath = Object.keys(posts).find(path => {
		return path.includes(`${year}/${slug}.mdx`);
	});

	if (!postPath) {
		throw error(404, 'Post not found');
	}

	const post = posts[postPath];
	if (!post || typeof post !== 'object' || !('metadata' in post)) {
		throw error(404, 'Invalid post data');
	}

	return post;
}

export async function GET({ params }) {
	const post = await getPost(params.year, params.slug);
	return json(post);
}
