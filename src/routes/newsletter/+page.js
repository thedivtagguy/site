import { redirect } from '@sveltejs/kit';

export function load({ url }) {
	const status = url.searchParams.get('status');

	if (!status) {
		throw redirect(302, '/blog/2025/keeping-in-touch#email');
	}

	return { status, isNewsletterFlow: status === 'confirmed' || status === 'unconfirmed' };
}
