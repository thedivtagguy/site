import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { html as toReactNode } from 'satori-html';
import Card from '$lib/components/Primary/ShareCard.svelte';

const height = 830;
const width = 1200;

// Global font fetching
const fontUrl =
	'https://github.com/ertekinno/libre-caslon-condensed/raw/refs/heads/main/fonts/ttf/LibreCaslonCondensed-Bold.ttf';
let fontPromise = fetch(fontUrl).then((res) => res.arrayBuffer());

/** @type {import('./$types').RequestHandler} */
export const GET = async ({ url }) => {
	const title = url.searchParams.get('title') ?? 'A new post';
	const date = url.searchParams.get('date') ?? new Date().toISOString();

	// Wait for the font to be loaded
	const fontData = await fontPromise;

	const result = Card.render({ title, date });
	const element = toReactNode(`${result.html}<style>${result.css.code}</style>`);

	const svg = await satori(element, {
		fonts: [
			{
				name: 'Libre Caslon Condensed',
				data: fontData,
				style: 'normal'
			}
		],
		height,
		width
	});

	const resvg = new Resvg(svg, {
		fitTo: {
			mode: 'width',
			value: width
		}
	});

	const image = resvg.render();
	return new Response(image.asPng(), {
		headers: {
			'content-type': 'image/png'
		}
	});
};
