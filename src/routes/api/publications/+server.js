import { json } from '@sveltejs/kit';

async function getPosts() {
	const clients = await getClients();
	const publications = await getSortedPosts(
		import.meta.glob('/content/publication/*.md', { eager: true }),
		clients
	);
	return publications;
}

async function getClients() {
	try {
		const clients = await getSortedPosts(
			import.meta.glob('/content/clients/*.mdx', { eager: true })
		);
		return clients || [];
	} catch (error) {
		console.error('Error fetching clients:', error);
		return [];
	}
}

async function getSortedPosts(paths, clients = []) {
	const categoryPosts = [];

	for (const path in paths) {
		const file = paths[path];

		if (file && typeof file === 'object' && 'metadata' in file) {
			const { metadata } = file;

			if (metadata.platform) {
				const platformName = metadata.platform.split('/').pop().split('.')[0].toLowerCase();
				const clientDetails = clients.find((client) => client.title.toLowerCase() === platformName);

				if (clientDetails) {
					metadata.client = clientDetails;
				}
			}

			const post = { ...metadata };
			categoryPosts.push(post);
		}
	}

	return categoryPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function GET() {
	const content = await getPosts();
	return json({ content });
}
