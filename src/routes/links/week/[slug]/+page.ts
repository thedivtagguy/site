import { error } from '@sveltejs/kit';
import { getWeekDates } from '$lib/utils';

export const prerender = true;

export async function load({ params, fetch }) {
	const { slug } = params;

	try {
		const { startOfWeek, endOfWeek } = getWeekDates(slug);

		const response = await fetch('/api/linkposts');
		const result = await response.json();

		const weekPosts = result.content.filter((post) => {
			const postDate = new Date(post.date);
			return postDate >= startOfWeek && postDate <= endOfWeek;
		});

		return {
			data: weekPosts,
			weekSlug: slug,
			startDate: startOfWeek,
			endDate: endOfWeek
		};
	} catch (e) {
		throw error(404, `Invalid week format: ${slug}`);
	}
}
