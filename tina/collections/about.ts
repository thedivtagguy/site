export const about = {
	name: 'about',
	label: 'About',
	path: 'src/content/about',
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
			type: 'rich-text',
			name: 'about',
			label: 'About',
			isBody: true
		},
		{
			type: 'rich-text',
			name: 'thanks',
			label: 'Thanks'
		},
		{
			type: 'object',
			name: 'people',
			label: 'People to thank',
			list: true,
			component: 'group-list',
			itemProps: (item) => ({
				key: item.id,
				label: item.name
			}),
			defaultItem: () => ({
				name: 'New person',
				id: Math.random().toString(36).substr(2, 9)
			}),
			fields: [
				{
					label: 'Name',
					name: 'name',
					type: 'string'
				},
				{
					label: 'Link',
					name: 'link',
					type: 'string'
				}
			]
		},
		{
			type: 'object',
			name: 'online',
			label: 'Online people/resources to thank',
			list: true,
			component: 'group-list',
			itemProps: (item) => ({
				key: item.id,
				label: item.name
			}),
			defaultItem: () => ({
				name: 'New person',
				id: Math.random().toString(36).substr(2, 9)
			}),
			fields: [
				{
					label: 'Name',
					name: 'name',
					type: 'string'
				},
				{
					label: 'Description',
					name: 'description',
					type: 'string'
				},
				{
					label: 'Link',
					name: 'link',
					type: 'string'
				}
			]
		}
	]
};
