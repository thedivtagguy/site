import { json } from '@sveltejs/kit';

async function getPosts() {
	const tidytuesday = await getSortedPosts(
		import.meta.glob('/content/tidytuesday/*.md|mdx', { eager: true })
	);

	return tidytuesday;
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
