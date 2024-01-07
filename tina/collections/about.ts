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
			label: 'Resume Info',
			name: 'resume',
			type: 'object',
			component: 'group',
			fields: [
				{
					label: 'Link to CV',
					name: 'resumePDFLink',
					type: 'string',
					component: 'text'
				},
				{
					label: 'Link to Portfolio',
					name: 'portfolioPDFLink',
					type: 'string',
					component: 'text'
				},
				{
					type: 'object',
					name: 'resume',
					label: 'Updated CV',
					list: true,
					component: 'group-list',
					itemProps: (item) => ({
						key: item.id,
						label: item.name
					}),
					defaultItem: () => ({
						name: 'New job',
						id: Math.random().toString(36).substr(2, 9)
					}),
					fields: [
						{
							label: 'Place of work',
							name: 'place',
							type: 'string'
						},
						{
							label: 'Position',
							name: 'position',
							type: 'string'
						},
						{
							label: 'Date range',
							name: 'date',
							type: 'string'
						},
						{
							label: 'Description',
							name: 'description',
							type: 'string'
						}
					]
				},
				{
					type: 'object',
					name: 'education',
					label: 'Updated Education',
					list: true,
					component: 'group-list',
					itemProps: (item) => ({
						key: item.id,
						label: item.name
					}),
					defaultItem: () => ({
						name: 'New school',
						id: Math.random().toString(36).substr(2, 9)
					}),
					fields: [
						{
							label: 'Place of study',
							name: 'place',
							type: 'string'
						},
						{
							label: 'Program',
							name: 'program',
							type: 'string'
						},
						{
							label: 'Date range',
							name: 'date',
							type: 'string'
						},
						{
							label: 'Description',
							name: 'description',
							type: 'string'
						},
						{
							label: 'Grades',
							name: 'grade',
							type: 'string'
						}
					]
				}
			]
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
