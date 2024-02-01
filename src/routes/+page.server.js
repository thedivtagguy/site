import { PRIVATE_TILE_SERVER_URL } from '$env/static/private';

export const load = async () => {
	return {
		tiles: { routes: PRIVATE_TILE_SERVER_URL }
	};
};
