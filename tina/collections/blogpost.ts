import { getYearAndWeek } from "./utils"
export const blog = {
    name: "Blog",
    label: "Blog",
    path: "content/blog",
    format: 'mdx',
    ui: {
        filename: {
          readonly: true,
          slugify: (values) => {            
            return `${
                getYearAndWeek(values?.date, false)
                
            }-${values?.slug
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
            type: "string",
            name: "label",
            label: "Label",
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
            isBody: true,    
        },
        {
            type: "string",
            name: "slug",
            label: "Slug",
            required: true,
        },
    ],
}