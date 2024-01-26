import fs from 'fs';
import path from 'path';
import vibrant from 'node-vibrant';
import color from 'color';
import sharp from 'sharp';
const CWD = process.cwd();
const STATIC_PATH = `${CWD}/static`;
const DATA_PATH = `${CWD}/src/data`;
const SUBDIRECTORIES = ['tidytuesday', 'work'];
const SUPPORTED_FORMATS = ['.avif', '.webp', '.png', '.jpg', 'jpeg'];
const QUALITY = 2;
const SCORE_GRAPHIC = 3.25;
const SCORE_TEXT = 4.75;

const roundRGB = (rgb) => rgb.map((d) => Math.round(d));
const getVibrant = (palette) => roundRGB(palette.Vibrant._rgb);

const convertToSupportedFormat = async (filePath) => {
	const outputFilePath = filePath.replace(/\.\w+$/, '.jpg');
	await sharp(filePath).toFormat('jpg').toFile(outputFilePath);
	return outputFilePath;
};

const getAccessiblePair = (c) => {
	const l = c.lightness(80);
	let dark, darker;
	for (let delta = 0.01; !(dark && darker); delta += 0.01) {
		const d = l.darken(delta);
		const score = l.contrast(d);
		if (!dark && score > SCORE_GRAPHIC) dark = d.hsl().round().string();
		if (!darker && score > SCORE_TEXT) darker = d.hsl().round().string();
	}
	return { light: l.hsl().round().string(), dark, darker };
};

const createPalette = (rgb) => {
	const c = color(rgb);
	return getAccessiblePair(c);
};

const getColor = (filePath) => {
	return vibrant.from(filePath).quality(QUALITY).getPalette().then(getVibrant).then(createPalette);
};

const shouldProcessFile = (filePath) => {
	const dataFilePath = path.join(
		DATA_PATH,
		path.basename(filePath, path.extname(filePath)) + '.json'
	);
	return !fs.existsSync(dataFilePath);
};

(async () => {
	try {
		for (const subdir of SUBDIRECTORIES) {
			const directory = path.join(STATIC_PATH, subdir);
			const files = fs
				.readdirSync(directory)
				.filter((file) => SUPPORTED_FORMATS.includes(path.extname(file).toLowerCase()))
				.filter((file) => shouldProcessFile(path.join(directory, file)));

			for (const file of files) {
				console.log(`- extracting ${file}`);
				let filePath = path.join(directory, file);

				if (path.extname(file).toLowerCase() !== '.jpg') {
					filePath = await convertToSupportedFormat(filePath);
				}

				const { light, dark, darker } = await getColor(filePath);
				const slug = file.replace(path.extname(file), '');
				const json = JSON.stringify({ slug, light, dark, darker });
				fs.writeFileSync(path.join(DATA_PATH, `${slug}.json`), json);
			}
		}
		console.log('DONE: extract thumbnail color');
	} catch (err) {
		console.error(err);
	}
	process.exit();
})();
