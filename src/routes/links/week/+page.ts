export const prerender = true;

export async function load({ fetch }) {
	const response = await fetch('/api/linkposts');
	const result = await response.json();

	// Get the start and end of the current week
	const now = new Date();
	const startOfWeek = new Date(now);
	startOfWeek.setDate(now.getDate() - now.getDay()); // Sunday
	startOfWeek.setHours(0, 0, 0, 0);

	const endOfWeek = new Date(now);
	endOfWeek.setDate(now.getDate() + (6 - now.getDay())); // Saturday
	endOfWeek.setHours(23, 59, 59, 999);

	// Filter posts from this week
	const thisWeekPosts = result.content.filter((post) => {
		const postDate = new Date(post.date);
		return postDate >= startOfWeek && postDate <= endOfWeek;
	});

	return {
		data: thisWeekPosts
	};
}
