import { timeParse, timeFormat } from 'd3';

const parseDate = timeParse('%Y-%m-%dT%H:%M:%S.%LZ');
const formatMonth = timeFormat('%B');
const formatDate = timeFormat('%d');
const formatDay = timeFormat('%A');

export function extractDateTimeComponents(dateTime) {
	const parsedDate = parseDate(dateTime);
	return {
		month: formatMonth(parsedDate),
		date: formatDate(parsedDate),
		day: formatDay(parsedDate)
	};
}
