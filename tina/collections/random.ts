import { getYearAndWeek } from './utils';
export const random = {
	name: 'random',
	label: 'Random',
	path: 'src/content/random',
	format: 'mdx',
	ui: {
		filename: {
			readonly: true,
			slugify: (values) => {
				return `${getYearAndWeek(values?.date, false)}-${values?.title
					?.toLowerCase()
					.replace(/ /g, '-')}`;
			}
		}
	},
	fields: [
		{
			name: 'favorite',
			component: 'toggle',
			label: 'Favorite this post',
			toggleLabels: {
				true: 'On',
				false: 'Off'
			},
			type: 'boolean'
		},

		{
			type: 'string',
			name: 'label',
			label: 'Label'
		},
		{
			type: 'string',
			name: 'title',
			label: 'Title',
			isTitle: true,
			required: true
		},
		{
			name: 'date',
			label: 'Date',
			type: 'datetime',
			dateFormat: 'MMMM DD YYYY',
			component: 'date'
		},
		{
			name: 'description',
			label: 'Short description',
			type: 'string'
		},
		{
			name: 'link',
			label: 'link',
			type: 'string'
		},
		{
			type: 'rich-text',
			label: 'Write about the work',
			name: 'body',
			isBody: true
		},
		{
			name: 'thumbnail',
			label: 'Thumbnail',
			type: 'image'
		},
		{
			type: 'string',
			list: true,
			name: 'tags',
			label: 'Tags',
			ui: {
				component: 'tags'
			}
		},
		{
			type: 'string',
			name: 'slug',
			label: 'Slug',
			required: true
		}
	]
};
