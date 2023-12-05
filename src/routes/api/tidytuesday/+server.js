import { json } from '@sveltejs/kit';

async function getPosts() {
	const tidytuesday = await getSortedPosts(
		import.meta.glob('/content/tidytuesday/*.md|mdx', { eager: true })
	);
	// 	tidytuesday:
	// 	// works: await getSortedPosts(import.meta.glob('/content/work/*.md|mdx')),
	// 	// blogposts: await getSortedPosts(import.meta.glob('/content/blog/*.md|mdx')),
	// 	// assorted: await getSortedPosts(import.meta.glob('/content/assorted/*.md|mdx')),
	// 	// publications: await getSortedPosts(import.meta.glob('/content/publications/*.md|mdx'))
	// };

	return tidytuesday;
}

async function getSortedPosts(paths) {
	const categoryPosts = [];

	for (const path in paths) {
		const file = paths[path];
		const slug = path
			.split('/')
			.at(-1)
			?.replace(/\.(md|mdx)$/, '');

		if (file && typeof file === 'object' && 'metadata' in file) {
			const { metadata } = file;
			const post = { ...metadata, slug };
			categoryPosts.push(post);
		}
	}

	return categoryPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function GET() {
	const content = await getPosts();
	return json({ content });
}
