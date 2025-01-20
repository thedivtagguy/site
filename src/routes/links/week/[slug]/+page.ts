import { error } from '@sveltejs/kit';
import { getWeekDates, getWeekNumber } from '$lib/utils';

export const prerender = true;

function isValidWeekFormat(slug: string) {
	return /^\d{4}-\d{2}$/.test(slug);
}

export async function load({ params, fetch }) {
	const { slug } = params;

	if (!isValidWeekFormat(slug)) {
		throw error(404, {
			message: `Invalid week format: ${slug}`,
			suggestion: 'Try using format YYYY-NN (e.g., 2024-01)'
		});
	}

	try {
		const { startOfWeek, endOfWeek } = getWeekDates(slug);
		const response = await fetch('/api/linkposts');
		const result = await response.json();

		// Get all weeks that have posts
		const allWeeks = [
			...new Set(result.content.map((post) => getWeekNumber(new Date(post.date))))
		].sort();

		const weekPosts = result.content.filter((post) => {
			const postDate = new Date(post.date);
			return postDate >= startOfWeek && postDate <= endOfWeek;
		});

		// Always calculate nearest weeks, whether we have posts or not
		const weekIndex = allWeeks.indexOf(slug);
		const nearestWeeks = {
			previous: weekIndex > 0 ? allWeeks[weekIndex - 1] : null,
			next: weekIndex < allWeeks.length - 1 ? allWeeks[weekIndex + 1] : null
		};

		if (weekPosts.length === 0) {
			throw error(404, {
				message: `No posts found for week ${slug}`,
				nearestWeeks
			});
		}

		return {
			data: weekPosts,
			weekSlug: slug,
			startDate: startOfWeek,
			endDate: endOfWeek,
			nearestWeeks: {
				previous: weekIndex > 0 ? allWeeks[weekIndex - 1] : null,
				next: weekIndex < allWeeks.length - 1 ? allWeeks[weekIndex + 1] : null
			}
		};
	} catch (e) {
		if (e.status === 404) throw e;
		throw error(500, {
			message: 'An error occurred while loading the posts',
			error: e
		});
	}
}
