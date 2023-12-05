import { getYearAndWeek } from "./utils"
export const publication = {
    name: "Publication",
    label: "Publication",
    path: "content/publication",
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
            name: 'featured',
            component: 'toggle',
            label: 'Feature this post',
            toggleLabels: {
              true: 'On',
              false: 'Off',
            },
            type: 'boolean',
          },
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
            name: 'projectLink',
            label: 'Project link',
            type: 'string',
        },
 
        {
            label: 'Platform',
            name: 'platform',
            type: 'reference',
            collections: ['clients'],
          },
        {
            name: 'thumbnail',
            label: 'Thumbnail',
            type: 'image',
        },
        
        
    ],
}