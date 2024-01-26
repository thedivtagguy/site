export const prerender = true;
const values = ['10%', '50%', '20%'];

export async function load({ fetch }) {
	try {
		const [tidytuesdayRes] = await Promise.all([fetch('api/tidytuesday')]);
		const [tidytuesday] = await Promise.all([tidytuesdayRes.json()]);

		Object.keys(tidytuesday).forEach((year) => {
			tidytuesday[year].content.forEach((item) => {
				const randomValue = values[Math.floor(Math.random() * values.length)];
				const position = Math.random() < 0.5 ? 'left' : 'right';
				item.tabStyle = `${position}: ${randomValue}`;
			});
		});

		const data = tidytuesday;

		return { data };
	} catch (error) {
		console.error('Error fetching data:', error);
		return { data: null };
	}
}
