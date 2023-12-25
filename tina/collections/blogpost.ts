import { getYearAndWeek } from './utils';
import { TinaCMS, Form } from 'tinacms';
export const blog = {
	name: 'Blog',
	label: 'Blog',
	path: 'src/content/blog',
	format: 'mdx',
	ui: {
		filename: {
			readonly: true,
			slugify: (values) => {
				return `${getYearAndWeek(values?.date, false)}-${values?.slug
					?.toLowerCase()
					.replace(/ /g, '-')}`;
			}
		},
		beforeSubmit: async ({
			form,
			cms,
			values
		}: {
			form: Form;
			cms: TinaCMS;
			values: Record<string, any>;
		}) => {
			const firstParagraphNode = values.content.children.find((node) => node.type === 'p');
			const excerpt = firstParagraphNode
				? firstParagraphNode.children.map((child) => child.text).join('')
				: '';
			return {
				...values,
				excerpt: excerpt
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
			name: 'date',
			label: 'Date',
			type: 'datetime',
			dateFormat: 'MMMM DD YYYY',
			component: 'date'
		},
		{
			component: 'tags',
			name: 'tags',
			label: 'Tags',
			type: 'string',
			list: true,
			ui: {
				component: 'tags'
			}
		},
		{
			type: 'string',
			name: 'label',
			label: 'Label'
		},
		{
			component: 'tags',
			name: 'category',
			label: 'Category',
			type: 'string',
			list: true,
			ui: {
				component: 'tags'
			}
		},
		{
			type: 'rich-text',
			name: 'content',
			label: 'Content',
			isBody: true
		},
		{
			type: 'string',
			name: 'slug',
			label: 'Slug',
			required: true
		},
		{
			type: 'string',
			name: 'excerpt',
			label: 'Excerpt'
		}
	]
};
