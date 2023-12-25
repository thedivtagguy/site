import { json } from '@sveltejs/kit';

async function getPosts() {
	const allPosts = await getSortedPosts(
		import.meta.glob('../../../content/tidytuesday/*.md|mdx', { eager: true })
	);

	// Group posts by year and calculate metadata for each year
	const postsByYear = allPosts.reduce((acc, post) => {
		const year = post.date.getFullYear(); // Assuming 'date' is a Date object
		acc[year] = acc[year] || { content: [], meta: null };
		acc[year].content.push(post);
		return acc;
	}, {});

	// Calculate metadata for each year
	for (const year in postsByYear) {
		postsByYear[year].meta = await calculateMetadata(postsByYear[year].content);
	}

	return postsByYear;
}

async function getSortedPosts(paths) {
	const categoryPosts = [];

	for (const path in paths) {
		const file = paths[path];

		if (file && typeof file === 'object' && 'metadata' in file) {
			const { metadata } = file;
			const post = { ...metadata, week: parseInt(metadata.week), date: new Date(metadata.date) };
			categoryPosts.push(post);
		}
	}

	return categoryPosts.sort((a, b) => b.week - a.week);
}

async function calculateMetadata(posts) {
	const completedWeeks = new Set();
	let longestStreak = 0;
	let currentStreak = 0;

	posts.forEach((post) => {
		completedWeeks.add(post.week);
	});

	for (let week = 1; week <= 52; week++) {
		if (completedWeeks.has(week)) {
			currentStreak++;
			longestStreak = Math.max(longestStreak, currentStreak);
		} else {
			currentStreak = 0;
		}
	}

	return {
		longestStreak,
		weeksDone: Array.from(completedWeeks).sort((a, b) => a - b)
	};
}

export async function GET() {
	const postsByYear = await getPosts();
	return json(postsByYear);
}
