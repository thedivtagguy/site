export async function load({ fetch, data }) {
	const songs = await fetch('/api/songs');
	const gps = await fetch('/api/gps');
	const online = await fetch('/api/online');
	const gpsData = await gps.json();
	const onlineData = await online.json();
	// const songsData = await songs.json();
	return {
		props: {
			batt: gpsData.batt,
			online: onlineData
			// songs: songsData
		}
	};
}
