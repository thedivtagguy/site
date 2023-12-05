// Collection for tidytuesday posts
import { getYearAndWeek } from "./utils"

export const tidytuesday = {
    name: "TidyTuesday",
    label: "TidyTuesday",
    path: "content/tidytuesday",
    ui: {
        filename: {
          readonly: true,
          slugify: (values) => {            
            return `${
                getYearAndWeek(values?.date)
                
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
            type: 'image',
            label: 'Thumbnail',
            name: 'thumbnail',
            required: true,
        },
        {
            name: 'description',
            label: 'Description',
            type: 'rich-text',
        },
        
        {
            name: 'projectLink',
            label: 'Project link',
            type: 'string',
        },
        {
            name: 'githubLink',
            label: 'Github link',
            type: 'string',
        },
        {
            name: 'week',
            label: 'Week',
            type: 'string',
           
        },
   {
        label: 'Social details',
        name: 'social',
        description: 'Links etc.',
        component: 'group',
        type: 'object',
        fields: [
            {
                type: 'string',
                name: 'twitter',
                label: 'Twitter URL',
            },
            {
                type: 'string',
                name: 'mastodon',
                label: 'Mastodon URL',
               
            },
            {
                type: 'string',
                name: 'blog',
                label: 'Blog URL',
            }
        ]
    },

    ]
}


