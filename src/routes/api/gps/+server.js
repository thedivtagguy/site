import { GPS_LAST_LOCATION_API, GPS_AUTH_HEADER } from '$env/static/private';
// export const prerender = true;
export async function GET() {
	const response = await fetch(GPS_LAST_LOCATION_API, {
		headers: {
			Authorization: GPS_AUTH_HEADER
		}
	});
	const data = await response.json();

	// Filter for owntracks user with device m54x
	const owntracksData = data.find(
		(item) => item.username === 'owntracks' && item.device === 'm54x'
	);

	if (!owntracksData) {
		return new Response(JSON.stringify({ error: 'Owntracks device not found' }), {
			status: 404,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	const selectedData = {
		batt: owntracksData.batt,
		lat: owntracksData.lat,
		lon: owntracksData.lon,
		tst: owntracksData.tst
	};

	return new Response(JSON.stringify(selectedData), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
