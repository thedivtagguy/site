export const prerender = true;

export async function load({ fetch }) {
	const apiURL = `${__API_BASE_URL__}/fetchGPS`;
	console.log(apiURL);

	try {
		const gpsData = await fetch(apiURL);
		const data = await gpsData.json();
		console.log(data);
		return { data };
	} catch (error) {
		console.error('Error fetching data:', error);
		return { data: null };
	}
}
