import { getYearAndWeek } from "./utils"
export const assorted = {
    name: "assorted",
    label: "Assorted",
    path: "content/assorted",
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
            name: 'shortDescription',
            label: 'Short description',
            type: 'string',
        },
        {
            name: 'link',
            label: 'link',
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
            type: 'string',
            list: true,
            name: 'tags',
            label: 'Tags',
            ui: {
              component: 'tags',
            },
        }

    ],
}