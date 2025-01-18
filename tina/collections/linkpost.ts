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
      type: 'string',
      name: 'url',
      label: 'Link URL',
      required: true
    },
    {
      type: 'string',
      name: 'source',
      label: 'Source/Website Name',
      required: true
    },
    {
      type: 'string',
      name: 'slug',
      label: 'Slug',
      required: true
    },
    {
      type: 'rich-text',
      name: 'content',
      label: 'Content',
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
        }
      ]
    },
    {
      type: 'string',
      name: 'tags',
      label: 'Tags',
      list: true,
      ui: {
        component: 'tags'
      }
    }
  ]
};
