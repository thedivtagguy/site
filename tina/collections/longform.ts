export const longform = {
	name: 'longform',
	label: 'Longform',
	path: 'src/content/pages',
	format: 'mdx',
	ui: {
		beforeSubmit: async ({ values }: { values: Record<string, any> }) => {
			return {
				...values,
				lastUpdated: new Date().toISOString()
			};
		}
	},
	fields: [
		{
			type: 'string',
			name: 'title',
			label: 'Title',
			isTitle: true,
			required: true
		},
		{
			name: 'lastUpdated',
			label: 'Last updated',
			type: 'datetime',
			dateFormat: 'MMMM DD YYYY',
			component: 'date'
		},
		{
			type: 'rich-text',
			name: 'content',
			label: 'Content',
			isBody: true
		}
	]
};
