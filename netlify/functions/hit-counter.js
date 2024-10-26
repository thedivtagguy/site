exports.handler = async (event) => {
	// Configure Cloudflare KV
	const KV_TOKEN = process.env.CLOUDFLARE_KV_TOKEN;
	const KV_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
	const KV_NAMESPACE_ID = process.env.CLOUDFLARE_KV_NAMESPACE_ID;

	const path = event.path || '/';
	const counterKey = `hits:${path}`;

	try {
		// Fetch current count
		const response = await fetch(
			`https://api.cloudflare.com/client/v4/accounts/${KV_ACCOUNT_ID}/storage/kv/namespaces/${KV_NAMESPACE_ID}/values/${counterKey}`,
			{
				headers: {
					Authorization: `Bearer ${KV_TOKEN}`
				}
			}
		);

		let count = 1;
		if (response.ok) {
			count = parseInt(await response.text()) + 1;
		}

		// Update count
		await fetch(
			`https://api.cloudflare.com/client/v4/accounts/${KV_ACCOUNT_ID}/storage/kv/namespaces/${KV_NAMESPACE_ID}/values/${counterKey}`,
			{
				method: 'PUT',
				headers: {
					Authorization: `Bearer ${KV_TOKEN}`,
					'Content-Type': 'text/plain'
				},
				body: count.toString()
			}
		);

		return {
			statusCode: 200,
			headers: {
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
			body: JSON.stringify({ hits: count })
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ error: 'Failed to update hit counter' })
		};
	}
};
