interface PostT {
  frontmatter: {title: string}
  fields: {slug: string}
}

enum ContactT {
  'twitter',
  'github',
  'email',
  'linkedin',
  'resume',
}

interface ActivityT {
  [key: string]: [string, string]
}

interface SocialT {
  [key in ContactT]: {
    display: string
    url: string
  }
}

interface SiteMetaT {
  siteMetadata: {
    author: string
    title: string
    siteUrl: string
    description: string
    social: SocialT
    talks: Activity
    interviews: Activity
  }
}
