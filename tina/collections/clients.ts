export const clients = {
	name: 'clients',
	label: 'Clients',
	path: 'src/content/clients',
	format: 'mdx',
	ui: {
		filename: {
			readonly: true,
			slugify: (values) => {
				return `${values?.title?.toLowerCase().replace(/ /g, '-')}`;
			}
		}
	},
	fields: [
		{
			type: 'string',
			name: 'title',
			label: 'Name',
			isTitle: true,
			required: true
		},
		{
			name: 'logo',
			label: 'Logo',
			type: 'image'
		}
	]
};
