import { GPS_LAST_LOCATION_API } from '$env/static/private';
// export const prerender = true;
export async function GET() {
	const response = await fetch(GPS_LAST_LOCATION_API);
	const data = await response.json();

	// Filter for device 5894
	const device5894Data = data.find((item) => item.device === '5894');

	if (!device5894Data) {
		return new Response(JSON.stringify({ error: 'Device 5894 not found' }), {
			status: 404,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	const selectedData = {
		batt: device5894Data.batt,
		lat: device5894Data.lat,
		lon: device5894Data.lon,
		tst: device5894Data.tst
	};

	return new Response(JSON.stringify(selectedData), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
