import { PRIVATE_TILE_SERVER_URL } from '$env/static/private';
import { LAST_FM_API_KEY } from '$env/static/private';

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

export const load = async () => {
	const response = await fetchCurrentTrack();

	const songs = response.recenttracks;
	return {
		tiles: { routes: PRIVATE_TILE_SERVER_URL },
		songs: songs
	};
};
