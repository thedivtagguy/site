import { getYearAndWeek } from './utils';
import { TinaCMS, Form } from 'tinacms';

export const linkpost = {
	name: 'LinkPost',
	label: 'Link Posts',
	path: 'src/content/links',
	format: 'mdx',
	ui: {
		filename: {
			readonly: true,
			slugify: (values: any) => {
				const slug = (() => {
					try {
						if (values.title) {
							const titleSlug = values.title
								.toLowerCase()
								.replace(/ /g, '-')
								.replace(/[^\w-]+/g, '');

							if (values.url) {
								return `${titleSlug}-${new URL(values.url).hostname
									.replace(/^www\./i, '')
									.replace(/\./g, '-')}`;
							}
							return titleSlug;
						}

						if (values.url) {
							return new URL(values.url).hostname
								.replace(/^www\./i, '')
								.replace(/\./g, '-')
								.toLowerCase();
						}

						return 'untitled';
					} catch (e) {
						return 'untitled';
					}
				})();

				const date = values?.date ? new Date(values.date) : new Date();
				return `${getYearAndWeek(date.toISOString(), false)}-${slug}`;
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
			const url = values.url ? new URL(values.url) : null;
			const domain = url ? url.hostname.replace(/^www\./i, '') : '';

			const firstParagraphNode = values.content?.children?.find((node: any) => node.type === 'p');
			const excerpt = firstParagraphNode
				? firstParagraphNode.children.map((child: any) => child.text).join('')
				: domain;

			const slug = (() => {
				try {
					if (values.title) {
						const titleSlug = values.title
							.toLowerCase()
							.replace(/ /g, '-')
							.replace(/[^\w-]+/g, '');

						if (values.url) {
							return `${titleSlug}-${new URL(values.url).hostname
								.replace(/^www\./i, '')
								.replace(/\./g, '-')}`;
						}
						return titleSlug;
					}

					if (values.url) {
						return new URL(values.url).hostname
							.replace(/^www\./i, '')
							.replace(/\./g, '-')
							.toLowerCase();
					}

					return 'untitled';
				} catch (e) {
					return 'untitled';
				}
			})();

			const currentDate = new Date().toISOString();
			const date = values.date ? new Date(values.date).toISOString() : currentDate;

			return {
				...values,
				slug,
				title: values.title || domain || 'Untitled Link',
				source: values.source || domain || '',
				excerpt,
				date,
				tags: values.tags?.length ? values.tags : [domain.split('.')[0]]
			};
		}
	},
	fields: [
		{
			type: 'string',
			name: 'url',
			label: 'Link URL',
			required: true,
			description: 'Paste a URL to automatically populate other fields'
		},
		{
			type: 'string',
			name: 'title',
			label: 'Title',
			required: true,
			description: 'Optional - will use domain name if not provided',
			isTitle: true
		},
		{
			type: 'rich-text',
			name: 'content',
			label: 'Notes',
			description: 'Your thoughts, quotes, or takeaways',
			isBody: true,
			templates: [
				{
					name: 'BlockQuote',
					label: 'Block Quote',
					fields: [
						{
							name: 'children',
							label: 'Quote',
							type: 'rich-text'
						}
					]
				},
				{
					name: 'KeyTakeaway',
					label: 'Key Takeaway',
					fields: [
						{
							name: 'children',
							label: 'Takeaway',
							type: 'rich-text'
						}
					]
				},
				{
					name: 'RelatedLinks',
					label: 'Related Links',
					fields: [
						{
							name: 'links',
							label: 'Links',
							type: 'object',
							list: true,
							fields: [
								{
									name: 'title',
									label: 'Title',
									type: 'string'
								},
								{
									name: 'url',
									label: 'URL',
									type: 'string'
								}
							]
						}
					]
				}
			]
		},
		{
			type: 'string',
			name: 'tags',
			label: 'Tags',
			list: true,
			description: 'Optional - will use domain name as default tag',
			ui: {
				component: 'tags'
			}
		},
		{
			type: 'string',
			name: 'source',
			label: 'Source',
			ui: {
				component: () => null
			}
		},
		{
			type: 'datetime',
			name: 'date',
			label: 'Date',
			ui: {
				dateFormat: 'YYYY-MM-DD HH:mm:ss',
				parse: (value) => {
					return value ? new Date(value).toISOString() : new Date().toISOString();
				},
				format: (value) => {
					return value ? new Date(value).toISOString() : new Date().toISOString();
				}
			}
		},
		{
			type: 'string',
			name: 'slug',
			label: 'Slug',
			description: 'The URL-friendly identifier for this post (auto-generated)',
			ui: {
				component: () => null
			}
		}
	]
};
