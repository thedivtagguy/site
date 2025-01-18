export const prerender = true;

export async function load({ fetch }) {
	const endpoints = ['linkposts'];

	async function fetchData(endpoint) {
		const response = await fetch(`api/${endpoint}`);
		return response.json();
	}

	try {
		const results = await Promise.all(endpoints.map(fetchData));
		let combinedData = [];
		let yearCounts = {};

		results.forEach((result) => {
			let content = result.content || Object.values(result).flatMap((year) => year.content);
			content.forEach((item) => {
				const year = new Date(item.date).getFullYear();
				yearCounts[year] = (yearCounts[year] || 0) + 1;
				combinedData.push({ ...item });
			});
		});

		combinedData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

		return {
			data: combinedData,
			yearCounts
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return {
			data: [],
			yearCounts: {}
		};
	}
}
