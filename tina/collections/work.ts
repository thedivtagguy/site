import { getYearAndWeek } from "./utils"
export const work = {
    name: "work",
    label: "Work",
    path: "content/work",
    format: 'mdx',
    ui: {
        filename: {
          readonly: true,
          slugify: (values) => {            
            return `${
                getYearAndWeek(values?.date, false)
                
            }-${values?.title
              ?.toLowerCase()
              .replace(/ /g, '-')}`
          },
        },
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
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
        },
        {
            type: "string",
            name: "description",
            label: "Description",

        },
        {
            type: "string",
            component: 'select',
            name: "category",
            label: "Category",
            options: ['Personal', 'Client'],
        },
        {
			label: 'Client deets (if this is a client project)',
			name: 'clientWork',
			type: 'reference',
			collections: ['clients']
		},
        {
            name: "date",
            label: "Date",
            type: "datetime",
            dateFormat: "MMMM DD YYYY",
            component: "date",
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
            component: 'tags',
            name: 'tools',
            label: 'Tools',
            type: 'string',
            list: true,
            ui: {
                component: 'tags'
            }
        },
        {
            name: 'projectLink',
            label: 'Project link',
            type: 'string',
        },
        {
            type: 'rich-text',
            label: 'Write about the work',
            name: 'body',
            isBody: true,
          },
        {
            name: 'thumbnail',
            label: 'Thumbnail',
            type: 'image',
        },
        {
            type: "string",
            name: "slug",
            label: "Slug",
            required: true,
        },

    ],
}