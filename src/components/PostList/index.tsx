import * as React from 'react'
import {Link, graphql, useStaticQuery} from 'gatsby'

export default function PostList() {
  const {
    allMdx: {edges: posts},
  } = useStaticQuery(graphql`
    query postsListQuery {
      allMdx(
        sort: {fields: [frontmatter___date], order: DESC}
        filter: {fileAbsolutePath: {regex: "/blog/"}}
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              date(formatString: "Do MMMM YYYY")
            }
          }
        }
      }
    }
  `)

  return (
    <div className="prose">
      <h2 className="text-6xl font-extrabold leading-tight tracking-tight">
        Articles
      </h2>
      <ul>
        {posts.map(({node: {frontmatter: {title, date}, fields: {slug}}}) => (
          <li key={title} className="items-center mb-4 lg:mb-2 lg:flex">
            <div className="lg:mr-4 lg:text-right lg:w-1/6">
              <time className="text-sm text-gray-500" dateTime={date}>
                {date}
              </time>
            </div>
            <Link to={slug}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
