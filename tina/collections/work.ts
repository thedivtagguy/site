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
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
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

    ],
}