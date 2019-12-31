const path = require('path')

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
			fields: {slug, layout},
		} = node

		createPage({
			path: slug,
			component: path.resolve(`./src/templates/${layout || 'post'}.tsx`),
			context: {
				slug,
				id,
			},
		})
	})
}
