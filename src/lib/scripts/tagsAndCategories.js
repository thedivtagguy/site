import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import chokidar from 'chokidar';
import lodash from 'lodash';
const contentDirectory = './content';

const toGather = ['tags', 'category'];

function parseContent() {
	// Read the frontmatter of all content files even in subdirectories
	const files = fs.readdirSync(contentDirectory, { withFileTypes: true });
	const contentFiles = files.filter((file) => file.isFile() && file.name.endsWith('.md|mdx'));
	const contentDirectories = files.filter((file) => file.isDirectory());
	const contentFilesInDirectories = contentDirectories.map((directory) => {
		const directoryFiles = fs.readdirSync(path.join(contentDirectory, directory.name), {
			withFileTypes: true
		});
		return directoryFiles.filter((file) => file.isFile() && file.name.endsWith('.md|mdx'));
	});
	// store only frontmatter
}
