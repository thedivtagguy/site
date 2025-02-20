const GPS_LAST_LOCATION_API = process.env.GPS_LAST_LOCATION_API;
const ONLINE_TRACKER = process.env.ONLINE_TRACKER;
const LAST_FM_API_KEY = process.env.LAST_FM_API_KEY;
const LAST_FM_USER = 'thedivtagguy';
const GPS_AUTH_HEADER = process.env.GPS_AUTH_HEADER;

exports.handler = async function (event, context) {
	try {
		// Fetch GPS data
		const response = await fetch(GPS_LAST_LOCATION_API, {
			headers: {
				Authorization: GPS_AUTH_HEADER
			}
		});
		if (!response.ok) throw new Error(`GPS API responded with status: ${response.status}`);
		const data = await response.json();

		// Filter for device 5894
		const device = data.find((item) => item.username === 'owntracks' && item.device === 'm54x');
		if (!device) throw new Error('Device 5894 not found in GPS data');

		// Fetch Online data
		const onlineResponse = await fetch(ONLINE_TRACKER);
		if (!onlineResponse.ok)
			throw new Error(`Online tracker responded with status: ${onlineResponse.status}`);
		const onlineData = await onlineResponse.json();

		// Fetch Songs data
		const songsUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LAST_FM_USER}&api_key=${LAST_FM_API_KEY}&format=json`;
		const songsResponse = await fetch(songsUrl);
		if (!songsResponse.ok)
			throw new Error(`Last.fm API responded with status: ${songsResponse.status}`);
		const songsData = await songsResponse.json();

		// Aggregate data
		const aggregatedData = {
			gps: {
				batt: device.batt
			},
			online: onlineData,
			songs: songsData.recenttracks.track.slice(0, 2)
		};

		return {
			statusCode: 200,
			body: JSON.stringify(aggregatedData),
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		};
	} catch (error) {
		console.error('Error in stats function:', error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: error.message || 'An unknown error occurred' }),
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			}
		};
	}
};
