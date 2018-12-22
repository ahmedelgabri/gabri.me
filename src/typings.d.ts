// This file is used to hold ambient type declarations, as well as type shims
// for npm module without type declarations, and assets files.

// For example, to shim modules without declarations, use:
// declare module "package-without-declarations"

// And to shim assets, use (one file extension per `declare`):
// declare module "*.png"

declare module 'colors.css'

declare module '*.png'
declare module '*.svg'
declare module '*.gif'
declare module '*.jpg'

// Global/Shared Props
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
