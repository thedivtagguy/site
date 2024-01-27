import { Handler, HandlerContext } from '@netlify/functions';

interface DataItem {
	lat: number;
	lon: number;
	batt: number;
	city?: string; // Optional city property
}

const handler: Handler = async (event, context: HandlerContext) => {
	try {
		const { city } = context.params || {}; // Extract city from context.params
		const response = await fetch(process.env.GPS_LAST_LOCATION_API || '');
		if (!response.ok) {
			throw new Error(response.statusText);
		}
		const data: any[] = await response.json();
		if (data.length === 0) {
			throw new Error('No data available');
		}
		const fullData = data[0];
		const selectedData: DataItem = {
			lat: 0,
			lon: 0,
			batt: fullData.batt,
			city // Include city in the response
		};
		return {
			statusCode: 200,
			body: JSON.stringify(selectedData)
		};
	} catch (error) {
		return {
			statusCode: 500,
			body: JSON.stringify({ msg: 'Error fetching data', error: error.message })
		};
	}
};

export { handler };
