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
			const post = { ...metadata, week: parseInt(metadata.week) };
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
	const posts = await getPosts();
	const meta = await calculateMetadata(posts);
	return json({ content: posts, meta });
}
