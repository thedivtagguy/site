export const prerender = true;

export async function load({ fetch, data }) {
	let { tiles } = data;

	try {
		const [tidytuesdayRes, bylinesRes, worksRes, blogRes] = await Promise.all([
			fetch('api/tidytuesday'),
			fetch('api/bylines'),
			fetch('api/works'),
			fetch('api/blogposts')
		]);

		const [tidytuesday, bylines, works, blogsResponse] = await Promise.all([
			tidytuesdayRes.json(),
			bylinesRes.json(),
			worksRes.json(),
			blogRes.json()
		]);

		const blogs = blogsResponse.content;

		// Sort blogs by date in descending order
		blogs.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

		const data = {
			tidytuesday: tidytuesday,
			bylines: bylines.content,
			works: works.content,
			latestBlog: blogs[0],

			tiles
		};

		return { data };
	} catch (error) {
		console.error('Error fetching data:', error);
		return { data: null };
	}
}
