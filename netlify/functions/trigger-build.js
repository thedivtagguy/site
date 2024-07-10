export const handler = async (event) => {
	if (event.httpMethod !== 'POST') {
		return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
	}

	const BUILD_HOOK_URL = process.env.NETLIFY_BUILD_HOOK;

	if (!BUILD_HOOK_URL) {
		console.error('NETLIFY_BUILD_HOOK environment variable is not set');
		return {
			statusCode: 500,
			body: JSON.stringify({ error: 'Build hook URL is not configured' })
		};
	}

	try {
		console.log(`Attempting to trigger build hook: ${BUILD_HOOK_URL}`);
		const response = await fetch(BUILD_HOOK_URL, { method: 'POST' });

		console.log(`Response status: ${response.status}`);
		const responseText = await response.text();
		console.log(`Response body: ${responseText}`);

		if (response.ok) {
			return {
				statusCode: 200,
				body: JSON.stringify({ message: 'Build triggered successfully' })
			};
		} else {
			throw new Error(`Failed to trigger build: ${response.status} ${response.statusText}`);
		}
	} catch (error) {
		console.error('Error:', error.message);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: error.message })
		};
	}
};
