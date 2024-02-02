export async function load({ fetch }) {
	try {
		const response = await fetch('/.netlify/functions/stats');
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();

		return {
			props: {
				gps: data.gps,
				online: data.online,
				songs: data.songs
			}
		};
	} catch (error) {
		console.error('Error fetching data:', error);
		return {
			props: {
				error: 'Failed to load data'
			}
		};
	}
}
