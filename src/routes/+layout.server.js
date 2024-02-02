import { LAST_FM_API_KEY } from '$env/static/private';
export const prerender = true;
async function fetchCurrentTrack() {
	const apiKey = LAST_FM_API_KEY;
	const user = 'thedivtagguy';
	const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${apiKey}&format=json`;

	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching track:', error);
	}
}

export async function load({ fetch }) {
	const response = await fetchCurrentTrack();

	const songs = response.recenttracks;
	const gps = await fetch('/api/gps');
	const online = await fetch('/api/online');
	const gpsData = await gps.json();
	const onlineData = await online.json();
	return {
		props: {
			batt: gpsData.batt,
			online: onlineData,
			songs
		}
	};
}
