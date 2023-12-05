import chokidar from 'chokidar';
import { generateYearlyCalendar } from './tidytuesdayCalendar.js';
import path from 'path';

const contentDirectory = path.join(process.cwd(), 'content');
const tidytuesdayDirectory = path.join(contentDirectory, 'tidytuesday');

const watcher = chokidar.watch(tidytuesdayDirectory, {
	persistent: true
});

watcher.on('change', () => {
	generateYearlyCalendar();
});
