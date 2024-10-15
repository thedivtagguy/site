export async function load({ fetch }) {
	const endpoints = ['blogposts'];

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

		// Add previous and next post information
		combinedData = combinedData.map((post, index) => {
			return {
				...post,
				previousPost:
					index > 0
						? {
								slug: combinedData[index - 1].slug,
								title: combinedData[index - 1].title,
								year: new Date(combinedData[index - 1].date).getFullYear()
						  }
						: null,
				nextPost:
					index < combinedData.length - 1
						? {
								slug: combinedData[index + 1].slug,
								title: combinedData[index + 1].title,
								year: new Date(combinedData[index + 1].date).getFullYear()
						  }
						: null
			};
		});

		// Calculate tag counts
		let tagCounts = combinedData
			.flatMap((item) => item.tags)
			.reduce((acc, tag) => {
				acc[tag] = (acc[tag] || 0) + 1;
				return acc;
			}, {});

		return {
			data: combinedData,
			meta: { tags: tagCounts, years: yearCounts }
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return { data: null };
	}
}
