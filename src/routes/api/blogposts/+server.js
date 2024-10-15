import { json } from '@sveltejs/kit';

export const prerender = true;
async function getPosts() {
	const blogposts = await getSortedPosts(
		import.meta.glob('../../../content/blog/*.mdx', { eager: true })
	);

	return blogposts;
}

async function getSortedPosts(paths) {
	const categoryPosts = [];

	for (const path in paths) {
		// Ignore blog-post-template.mdx
		if (path.includes('blog-post-template.mdx')) continue;

		const file = paths[path];

		if (file && typeof file === 'object' && 'metadata' in file) {
			const { metadata } = file;
			// Ignore posts where published === false in frontmatter
			if (metadata.published === false) continue;
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
