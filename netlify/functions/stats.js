const GPS_LAST_LOCATION_API = process.env.GPS_LAST_LOCATION_API;
const ONLINE_TRACKER = process.env.ONLINE_TRACKER;
const LAST_FM_API_KEY = process.env.LAST_FM_API_KEY;
const LAST_FM_USER = 'thedivtagguy';

exports.handler = async function (event, context) {
	try {
		// Fetch GPS data
		const gpsResponse = await fetch(GPS_LAST_LOCATION_API);
		const gpsData = await gpsResponse.json();

		// Fetch Online data
		const onlineResponse = await fetch(ONLINE_TRACKER);
		const onlineData = await onlineResponse.json();

		// Fetch Songs data
		const songsUrl = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LAST_FM_USER}&api_key=${LAST_FM_API_KEY}&format=json`;
		const songsResponse = await fetch(songsUrl);
		const songsData = await songsResponse.json();

		// Aggregate data
		const aggregatedData = {
			gps: {
				batt: gpsData?.batt
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
		return {
			statusCode: 500,
			body: JSON.stringify({ error: 'Internal Server Error' })
		};
	}
};
