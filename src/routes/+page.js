export const prerender = true;

export async function load({ fetch }) {
	try {
		const [tidytuesdayRes, bylinesRes, worksRes] = await Promise.all([
			fetch('api/tidytuesday'),
			fetch('api/bylines'),
			fetch('api/works')
		]);

		const [tidytuesday, bylines, works] = await Promise.all([
			tidytuesdayRes.json(),
			bylinesRes.json(),
			worksRes.json()
		]);

		const data = {
			tidytuesday: tidytuesday,
			bylines: bylines.content,
			works: works.content
		};

		return { data };
	} catch (error) {
		console.error('Error fetching data:', error);
		return { data: null };
	}
}
