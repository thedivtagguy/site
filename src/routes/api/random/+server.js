import { json } from '@sveltejs/kit';
export const prerender = true;
async function getPosts() {
	const assorteds = await getSortedPosts(
		import.meta.glob('/content/random/*.mdx', { eager: true })
	);

	return assorteds;
}

async function getSortedPosts(paths) {
	const categoryPosts = [];

	for (const path in paths) {
		const file = paths[path];
		if (file && typeof file === 'object' && 'metadata' in file) {
			const { metadata } = file;
			const post = { ...metadata };
			categoryPosts.push(post);
		}
	}

	return categoryPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function GET() {
	const content = await getPosts();
	return json({ content });
}
