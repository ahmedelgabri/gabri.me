// @flow strict
/* eslint-disable */

declare type Hash<V, K = string> = {[K]: V}
declare type Nullable<V> = V | null
declare type PropsT<V> = $ReadOnly<$Exact<V>>
declare type StateT<V> = PropsT<V>

declare module '*.png' {
  declare export default string
}
declare module '*.svg' {
  declare export default string
}
declare module '*.gif' {
  declare export default string
}
declare module '*.jpg' {
  declare export default string
}

declare type PostT = {|
  frontmatter: {title: string},
  fields: {slug: string},
|}

declare type ContactT = 'twitter' | 'github' | 'email' | 'linkedin' | 'resume'

declare type ActivityT = Hash<[string, string]>

type SocialT = {|
  [key: ContactT]: {|
    display: string,
    url: string,
  |},
|}

type SiteMetaT = {|
  siteMetadata: {|
    author: string,
    title: string,
    siteUrl: string,
    description: string,
    social: SocialT,
    talks: Activity,
    interviews: Activity,
  |},
|}
