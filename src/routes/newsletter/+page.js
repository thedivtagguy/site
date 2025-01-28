import { redirect } from '@sveltejs/kit';

export async function load({ url, fetch }) {
	const email_address = url.searchParams.get('email_address');

	if (!email_address) {
		throw redirect(302, '/blog/2025/keeping-in-touch#email');
	}

	// Call our Netlify function to validate
	const response = await fetch(
		`/.netlify/functions/buttondown-status?email_address=${encodeURIComponent(email_address)}`
	);
	const { status } = await response.json();

	return {
		status,
		isNewsletterFlow: ['confirmed', 'unconfirmed', 'unknown', 'error'].includes(status)
	};
}
