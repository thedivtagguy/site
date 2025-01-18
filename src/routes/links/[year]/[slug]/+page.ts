import { error } from '@sveltejs/kit';

export const prerender = true;

export async function load({ params, fetch }) {
	try {
		const post = await import(`../../../../content/links/${params.year}-${params.slug}.mdx`);

		// Fetch all posts to get the adjacent post information
		const response = await fetch('/api/linkposts');
		const allPosts = await response.json();

		// Find the current post in the all posts array
		const currentPostIndex = allPosts.content.findIndex(
			(p) => p.slug === params.slug && new Date(p.date).getFullYear().toString() === params.year
		);

		if (currentPostIndex === -1) {
			throw error(404, `Could not find ${params.slug}`);
		}

		const previousPost = currentPostIndex > 0 ? allPosts.content[currentPostIndex - 1] : null;
		const nextPost =
			currentPostIndex < allPosts.content.length - 1
				? allPosts.content[currentPostIndex + 1]
				: null;

		return {
			data: {
				...post.metadata,
				content: post.default,
				excerpt: post.metadata.excerpt || '',
				slug: params.slug
			},
			previousPost: previousPost
				? {
						slug: previousPost.slug,
						title: previousPost.title,
						year: new Date(previousPost.date).getFullYear(),
						date: new Date(previousPost.date).toLocaleString('en-US', {
							month: 'short',
							year: 'numeric'
						})
				  }
				: null,
			nextPost: nextPost
				? {
						slug: nextPost.slug,
						title: nextPost.title,
						year: new Date(nextPost.date).getFullYear(),
						date: new Date(nextPost.date).toLocaleString('en-US', {
							month: 'short',
							year: 'numeric'
						})
				  }
				: null
		};
	} catch (e) {
		console.error(e);
		throw error(404, `Could not find ${params.slug}`);
	}
}
