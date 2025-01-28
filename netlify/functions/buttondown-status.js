export const handler = async function (event, context) {
	const { email_address } = event.queryStringParameters;

	if (!email_address) {
		return {
			statusCode: 200,
			body: JSON.stringify({ status: 'missing_email' })
		};
	}

	try {
		// Call Buttondown API to check subscription status
		const response = await fetch('https://api.buttondown.email/v1/subscribers', {
			headers: {
				Authorization: `Token ${process.env.BUTTONDOWN_API_KEY}`
			}
		});

		const subscribers = await response.json();
		const subscriber = subscribers.results.find(
			(sub) => sub.email.toLowerCase() === email_address.toLowerCase()
		);

		let status = 'unknown';
		if (subscriber) {
			status = subscriber.subscriber_type === 'unactivated' ? 'unconfirmed' : 'confirmed';
		}

		return {
			statusCode: 200,
			body: JSON.stringify({ status })
		};
	} catch (error) {
		console.error('Buttondown API error:', error);
		return {
			statusCode: 200,
			body: JSON.stringify({ status: 'error' })
		};
	}
};
