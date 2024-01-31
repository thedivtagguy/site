import { batteryLevel } from '$lib/stores';

export async function load({ fetch }) {
	const response = await fetch('/api/gps');
	const data = await response.json();

	return {
		props: {
			batt: data.batt
		}
	};
}
