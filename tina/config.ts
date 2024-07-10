import { defineConfig } from 'tinacms';
import { collections } from './collections';
import React from 'react';
import DeployScreen from './components/DeployScreen';

const branch =
	process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || 'master';

export default defineConfig({
	branch,
	clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
	token: process.env.TINA_TOKEN,
	build: {
		outputFolder: 'admin',
		publicFolder: 'static'
	},
	media: {
		tina: {
			mediaRoot: '',
			publicFolder: 'static'
		}
	},
	schema: {
		collections
	},
	cmsCallback: (cms) => {
		const deployScreenPlugin = {
			__type: 'screen',
			name: 'Deploy',
			layout: 'fullscreen',
			Component: DeployScreen
		};
		cms.plugins.add(deployScreenPlugin);
		return cms;
	}
});
