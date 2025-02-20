export const config = {
  backend: {
    name: 'git-gateway',
    branch: 'master' // or your default branch
  },
  media_folder: "src/lib/images/uploads",
  public_folder: "/images/uploads",
  publish_mode: "editorial_workflow",
  slug: {
    encoding: "ascii",
    clean_accents: true,
    sanitize_replacement: "-"
  },
  collections: [
    {
      name: "linkpost",
      label: "Link Posts",
      folder: "src/content/links",
      create: true,
      format: "mdx",
      slug: "{{fields.slug}}",
      fields: [
        { label: "Title", name: "title", widget: "string", required: false },
        { label: "URL", name: "url", widget: "string", required: true },
        { 
          label: "Date", 
          name: "date", 
          widget: "datetime",
          format: "YYYY-MM-DD",
          date_format: "YYYY-MM-DD",
          time_format: false
        },
        { 
          label: "Slug",
          name: "slug",
          widget: "string",
          pattern: ['^[a-z0-9]+(?:-[a-z0-9]+)*$', "Slug must contain only lowercase letters, numbers, and hyphens"],
          hint: "The slug will be used in the URL. It should be unique and URL-friendly."
        },
        { label: "Body", name: "body", widget: "markdown" },
        { label: "Tags", name: "tags", widget: "list", required: false },
        { label: "Draft", name: "draft", widget: "boolean", default: false }
      ]
    },
    {
      name: "blogpost",
      label: "Blog Posts",
      folder: "src/content/blog",
      create: true,
      format: "mdx",
      slug: "{{slug}}",
      fields: [
        { label: "Title", name: "title", widget: "string" },
        { 
          label: "Date", 
          name: "date", 
          widget: "datetime",
          format: "YYYY-MM-DD",
          date_format: "YYYY-MM-DD",
          time_format: false
        },
        { label: "Description", name: "description", widget: "text", required: false },
        { label: "Body", name: "body", widget: "markdown" },
        { label: "Tags", name: "tags", widget: "list", required: false },
        { label: "Draft", name: "draft", widget: "boolean", default: false }
      ]
    },
    {
      name: "work",
      label: "Work",
      folder: "src/content/work",
      create: true,
      format: "mdx",
      slug: "{{slug}}",
      fields: [
        { label: "Title", name: "title", widget: "string" },
        { label: "Description", name: "description", widget: "text" },
        { label: "Date", name: "date", widget: "datetime" },
        { label: "Body", name: "body", widget: "markdown" },
        { label: "Featured", name: "featured", widget: "boolean", default: false },
        { label: "Draft", name: "draft", widget: "boolean", default: false }
      ]
    }
  ]
};
