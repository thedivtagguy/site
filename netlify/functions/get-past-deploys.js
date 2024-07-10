export const handler = async function (event, context) {
	// Netlify API endpoint
	const API_ENDPOINT = 'https://api.netlify.com/api/v1';

	// Get the site ID from environment variables
	const SITE_ID = process.env.SITE_ID;

	// Get the Netlify personal access token from environment variables
	const NETLIFY_TOKEN = process.env.NETLIFY_ACCESS_TOKEN;

	if (!SITE_ID || !NETLIFY_TOKEN) {
		return {
			statusCode: 400,
			body: JSON.stringify({
				error: 'SITE_ID and NETLIFY_TOKEN must be set in environment variables'
			})
		};
	}

	try {
		// Calculate the date one month ago
		const oneMonthAgo = new Date();
		oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 3);

		// Construct the API URL
		const apiUrl = `${API_ENDPOINT}/sites/${SITE_ID}/deploys?from=${oneMonthAgo.toISOString()}`;

		// Make a request to the Netlify API using the built-in fetch function
		const response = await fetch(apiUrl, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Headers': 'Content-Type',
				'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
				Authorization: `Bearer ${NETLIFY_TOKEN}`
			}
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();

		// Process the response to include only relevant information
		const deployHistory = data.map((deploy) => ({
			id: deploy.id,
			created_at: deploy.created_at,
			published_at: deploy.published_at,
			state: deploy.state,
			branch: deploy.branch,
			commit_ref: deploy.commit_ref,
			commit_url: deploy.commit_url,
			deploy_url: deploy.deploy_url
		}));

		return {
			statusCode: 200,
			body: JSON.stringify(deployHistory)
		};
	} catch (error) {
		console.error('Error fetching deploy history:', error);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: 'Failed to fetch deploy history' })
		};
	}
};
