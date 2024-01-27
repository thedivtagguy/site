export const prerender = true;

export async function load({ fetch }) {
	const apiURL = `${import.meta.env.VITE_API_BASE_URL}/fetchGPS`;
	try {
		const gpsData = await fetch(apiURL);
		const data = await gpsData.json();
		return { data };
	} catch (error) {
		console.error('Error fetching data:', error);
		return { data: null };
	}
}
