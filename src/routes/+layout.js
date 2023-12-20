export const prerender = true;
import { dev } from '$app/environment';

const apiURL = dev
	? 'http://localhost:8888/.netlify/functions/fetchGPS'
	: '/.netlify/functions/fetchGPS';
export async function load({ fetch }) {
	try {
		const gpsData = await fetch(apiURL);
		// Get response
		const data = await gpsData.json();
		// Return response
		console.log(data);
		return { data };
	} catch (error) {
		console.error('Error fetching data:', error);
		return { data: null };
	}
}
