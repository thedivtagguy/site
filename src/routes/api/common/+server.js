import { json } from '@sveltejs/kit';
import path from 'path';

const CONTENT_DIR = '../../../content';

function formatDate(dateString) {
	const date = new Date(dateString);
	const monthNames = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];
	return `${monthNames[date.getMonth()]}, ${date.getFullYear()}`;
}

async function getDataFromFile(filePath, dataKeys) {
	const fullPath = path.join(CONTENT_DIR, filePath);
	const files = import.meta.glob('../../../content/**/*.mdx', { eager: true });
	const fileContent = files[fullPath];

	if (!fileContent) {
		throw new Error(`File not found: ${filePath}`);
	}

	const result = {};
	for (const key of dataKeys) {
		if (key in fileContent.metadata) {
			let value = fileContent.metadata[key];
			if (key.toLowerCase().includes('date')) {
				value = formatDate(value);
			}
			result[key] = value;
		}
	}

	return result;
}

export async function GET({ url }) {
	const filePath = url.searchParams.get('file') || 'now/now.mdx';
	const dataKeys = url.searchParams.get('keys')?.split(',') || ['takingFreelanceFrom'];

	try {
		const data = await getDataFromFile(filePath, dataKeys);
		return json(data);
	} catch (error) {
		return json({ error: error.message }, { status: 400 });
	}
}
