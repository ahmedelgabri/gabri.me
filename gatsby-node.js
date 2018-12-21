// @flow
const path = require('path')
const componentWithMDXScope = require('gatsby-mdx/component-with-mdx-scope')

// Create slugs for files.
exports.onCreateNode = ({node, actions}) => {
  const {createNodeField} = actions

  if (node.internal.type === 'Mdx') {
    // https://github.com/gatsbyjs/gatsby/issues/1471
    createNodeField({
      node,
      name: 'slug',
      value: `/blog/${path.basename(node.fileAbsolutePath, '.md')}`,
    })
  }
}

exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx {
              edges {
                node {
                  id
                  fields {
                    slug
                  }
                  code {
                    scope
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
        result.data.allMdx.edges.forEach(({node}) => {
          const slug = node.fields.slug

          createPage({
            path: slug,
            component: componentWithMDXScope(
              path.resolve('./src/templates/post.tsx'),
              node.code.scope,
            ),
            context: {
              slug,
              id: node.id,
            },
          })
        })
      }),
    )
  })
}

exports.onCreateWebpackConfig = ({actions}) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}
