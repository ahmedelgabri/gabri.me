// @flow
const path = require('path')

// Create slugs for files.
exports.onCreateNode = ({node, boundActionCreators}) => {
  const {createNodeField} = boundActionCreators

  if (node.internal.type === 'MarkdownRemark') {
    // https://github.com/gatsbyjs/gatsby/issues/1471
    createNodeField({
      node,
      name: 'slug',
      value: `/blog/${path.basename(node.fileAbsolutePath, '.md')}`,
    })
  }
}

exports.createPages = async ({graphql, boundActionCreators}) => {
  const {createPage} = boundActionCreators

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/post.js')
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(limit: 1000) {
              edges {
                node {
                  fields {
                    slug
                  }
                }
              }
            }
          }
        `,
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        result.data.allMarkdownRemark.edges.forEach(edge => {
          const slug = edge.node.fields.slug
          createPage({
            path: slug,
            component: blogPost,
            context: {
              slug,
            },
          })
        })
      }),
    )
  })
}
