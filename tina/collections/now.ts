import { getYearAndWeek } from './utils';
export const now = {
	name: 'now',
	label: 'Now',
	path: 'src/content/now',
	format: 'mdx',
	ui: {
		allowedActions: {
			create: false,
			delete: false
		},

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
			type: 'string',
			name: 'location',
			label: 'Location'
		},
		{
			type: 'rich-text',
			name: 'job',
			label: 'Job'
		},
		{
			type: 'rich-text',
			name: 'content',
			label: 'Content',
			isBody: true
		},
		{
			type: 'object',
			name: 'years',
			label: 'Year highlight',
			list: true,
			component: 'group-list',
			itemProps: (item) => ({
				key: item.id,
				label: item.year
			}),
			defaultItem: () => ({
				name: 'New year highlight',
				id: Math.random().toString(36).substr(2, 9)
			}),
			fields: [
				{
					label: 'Year',
					name: 'year',
					type: 'number',
					component: 'number'
				},
				{
					type: 'rich-text',
					name: 'content',
					label: 'Content'
				}
			]
		},
		{
			type: 'object',
			name: 'links',
			label: 'Links',
			list: true,
			component: 'group-list',
			itemProps: (item) => ({
				key: item.id,
				label: item.title
			}),
			defaultItem: () => ({
				name: 'New link',
				id: Math.random().toString(36).substr(2, 9)
			}),
			fields: [
				{
					label: 'Title',
					name: 'title',
					type: 'string'
				},
				{
					type: 'string',
					name: 'url',
					label: 'URL'
				}
			]
		}
	]
};
