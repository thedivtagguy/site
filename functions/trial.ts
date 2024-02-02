exports.handler = async (event, _, callback) => {
	const ip = event.headers['x-forwarded-for'];
	const client = ip.split(',')[0];
	callback(null, {
		statusCode: 200,
		body: client
	});
};
