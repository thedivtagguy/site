import { redirect } from '@sveltejs/kit';
import { getWeekNumber } from '$lib/utils';

export const prerender = true;

export function load() {
	const currentWeekSlug = getWeekNumber(new Date());
	throw redirect(307, `/links/week/${currentWeekSlug}`);
}
