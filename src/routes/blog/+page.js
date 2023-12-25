export async function load({ fetch }) {
	const endpoints = ['blogposts'];
	const excerptLength = 100; // Set desired length of th

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

		// Sort combined data by date
		combinedData.sort((a, b) => new Date(b.date) - new Date(a.date));

		// Calculate tag counts
		let tagCounts = combinedData
			.flatMap((item) => item.tags)
			.reduce((acc, tag) => {
				acc[tag] = (acc[tag] || 0) + 1;
				return acc;
			}, {});

		return { data: combinedData, meta: { tags: tagCounts, years: yearCounts } };
	} catch (error) {
		console.error('Error fetching data:', error);
		return { data: null };
	}
}
