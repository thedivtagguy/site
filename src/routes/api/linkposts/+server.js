import { json } from '@sveltejs/kit';

export const prerender = true;

async function getPosts() {
	const linkposts = await getSortedPosts(
		import.meta.glob('../../../content/links/*.mdx', { eager: true })
	);

	return linkposts;
}

async function getSortedPosts(paths) {
	const posts = [];

	for (const path in paths) {
		const file = paths[path];

		if (file && typeof file === 'object' && 'metadata' in file) {
			const { metadata } = file;
			// Ignore posts where published === false in frontmatter
			if (metadata.published === false) continue;

			// Extract the filename from the path
			const filename = path.split('/').pop();

			const post = { 
				...metadata,
				filename 
			};
			posts.push(post);
		}
	}

	return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function GET() {
	const content = await getPosts();
	return json({ content });
}
