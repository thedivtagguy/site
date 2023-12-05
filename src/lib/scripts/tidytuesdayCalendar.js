import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import chokidar from 'chokidar';
import lodash from 'lodash';
const contentDirectory = './content';
const tidytuesdayDirectory = path.join(contentDirectory, 'tidytuesday');

function parseTidyTuesdayPosts() {
	const fileNames = fs.readdirSync(tidytuesdayDirectory);
	const postsData = fileNames.map((fileName) => {
		const fullPath = path.join(tidytuesdayDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');
		const { data } = matter(fileContents);

		return {
			week: data.week,
			...data
		};
	});

	return postsData;
}

function generateYearlyCalendar() {
	const postsData = parseTidyTuesdayPosts();
	const calendar = {};

	for (let week = 1; week <= 52; week++) {
		calendar[week] = null;
	}

	postsData.forEach((post) => {
		calendar[post.week] = true;
	});

	// Calculate longest streak
	let longestStreak = 0;
	let currentStreak = 0;
	for (let week = 1; week <= 52; week++) {
		if (calendar[week]) {
			currentStreak++;
			if (currentStreak > longestStreak) {
				longestStreak = currentStreak;
			}
		} else {
			currentStreak = 0;
		}
	}

	if (calendar[1]) {
		currentStreak++;
		if (currentStreak > longestStreak) {
			longestStreak = currentStreak;
		}
	}

	// Transform calendar into array of objects
	const weeksData = Object.keys(calendar).map((week) => ({
		week: parseInt(week),
		tidytuesday: calendar[week]
	}));

	// Create final object with data and meta
	const finalCalendar = {
		// data: weeksData,
		meta: {
			longestStreak,
			weeksDone: lodash.filter(weeksData, (week) => week.tidytuesday).length
		}
	};

	const calendarOutputPath = path.join(process.cwd(), 'src/lib/data', 'tidytuesdayCalendar.json');
	fs.writeFileSync(calendarOutputPath, JSON.stringify(finalCalendar, null, 2));
}

export function ttplugin() {
	return {
		name: 'tt-update',
		configureServer() {
			chokidar.watch(tidytuesdayDirectory).on('add', () => {
				console.log('Added a tidytuesday project, regenerating calendar...');
				generateYearlyCalendar();
			});
			chokidar.watch(tidytuesdayDirectory).on('unlink', () => {
				console.log('Removed a tidytuesday project, regenerating calendar...');
				generateYearlyCalendar();
			});
			chokidar.watch(tidytuesdayDirectory).on('change', () => {
				console.log('Changed a tidytuesday project, regenerating calendar...');
				generateYearlyCalendar();
			});
		},
		buildStart() {
			generateYearlyCalendar();
		}
	};
}
