// @flow
const path = require('path')
const componentWithMDXScope = require('gatsby-mdx/component-with-mdx-scope')

// Create slugs for files.
exports.onCreateNode = ({node, actions}) => {
  const {createNodeField} = actions

  switch (node.internal.type) {
    case 'Mdx': {
      const {
        fileAbsolutePath,
        frontmatter: {layout},
      } = node

      // https://github.com/gatsbyjs/gatsby/issues/1471
      createNodeField({
        node,
        name: 'slug',
        value: `/blog/${path.basename(fileAbsolutePath, '.md')}`,
      })

      // Used to determine a page layout.
      createNodeField({
        node,
        name: 'layout',
        value: layout || 'post',
      })
    }
  }
}

exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions

  const allMarkdown = await graphql(`
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
  `)

  if (allMarkdown.errors) {
    console.error(allMarkdown.errors)
    throw new Error(allMarkdown.errors)
  }

  // Create blog posts pages.
  allMarkdown.data.allMdx.edges.forEach(({node}) => {
    const {
      id,
      code: {scope},
      fields: {slug, layout},
    } = node

    createPage({
      path: slug,
      component: componentWithMDXScope(
        path.resolve(`./src/templates/${layout || 'post'}.tsx`),
        scope,
      ),
      context: {
        slug,
        id,
      },
    })
  })
}

exports.onCreateWebpackConfig = ({actions}) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  })
}
