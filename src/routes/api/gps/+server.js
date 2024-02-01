import { GPS_LAST_LOCATION_API } from '$env/static/private';
export const prerender = true;
export async function GET() {
	const response = await fetch(GPS_LAST_LOCATION_API);
	const data = await response.json();

	const fullData = data[0];
	const selectedData = {
		batt: fullData.batt
	};

	return new Response(JSON.stringify(selectedData), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
