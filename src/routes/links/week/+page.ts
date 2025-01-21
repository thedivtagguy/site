import { redirect } from '@sveltejs/kit';
import { getWeekNumber } from '$lib/utils';

export const prerender = false;

export function load() {
	// Force current date calculation without any timezone or system influences
	const now = new Date();
	const currentWeekSlug = getWeekNumber(now);

	// Add more debug information
	console.log({
		timestamp: now.getTime(),
		dateString: now.toISOString(),
		weekSlug: currentWeekSlug
	});

	throw redirect(307, `/links/week/${currentWeekSlug}`);
}
