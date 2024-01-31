import { ONLINE_TRACKER } from '$env/static/private';

export async function GET() {
	const response = await fetch(ONLINE_TRACKER);
	const data = await response.json();

	return new Response(JSON.stringify(data), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
