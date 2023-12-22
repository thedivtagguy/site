export async function load({ fetch }) {
	const endpoints = ['publications', 'works', 'assorted'];

	async function fetchData(endpoint) {
		const response = await fetch(`api/${endpoint}`);
		return response.json();
	}

	try {
		const results = await Promise.all(endpoints.map(fetchData));
		let combinedData = [];
		let typeCounts = {};

		results.forEach((result, index) => {
			let content = result.content || Object.values(result).flatMap((year) => year.content);

			content.forEach((item) => {
				let type = endpoints[index];
				if (type === 'works') {
					type = item.category;
					typeCounts[type] = (typeCounts[type] || 0) + 1;
				} else {
					typeCounts[type] = (typeCounts[type] || 0) + 1;
				}
				combinedData.push({ ...item, type });
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

		return { data: combinedData, meta: { tags: tagCounts, types: typeCounts } };
	} catch (error) {
		console.error('Error fetching data:', error);
		return { data: null };
	}
}
