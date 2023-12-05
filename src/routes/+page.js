export const prerender = true;

export async function load({ fetch }) {
	try {
		const [tidytuesdayRes, publicationsRes, worksRes] = await Promise.all([
			fetch('api/tidytuesday'),
			fetch('api/publications'),
			fetch('api/works')
		]);

		const [tidytuesday, publications, works] = await Promise.all([
			tidytuesdayRes.json(),
			publicationsRes.json(),
			worksRes.json()
		]);

		const data = {
			tidytuesday: tidytuesday.content,
			publications: publications.content,
			works: works.content
		};

		return { data };
	} catch (error) {
		console.error('Error fetching data:', error);
		return { data: null };
	}
}
