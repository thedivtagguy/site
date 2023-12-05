import { json } from '@sveltejs/kit';

async function getPosts() {
	const works = await getSortedPosts(import.meta.glob('/content/work/*.mdx', { eager: true }));

	return works;
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
