const path = require('path')
const siteMetadata = require('./src/config/meta')
const feedUrl = 'feed.xml'

module.exports = {
  siteMetadata,
  plugins: [
    // Must be first
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-10517764-2',
        head: true,
        anonymize: true,
      },
    },
    'gatsby-plugin-twitter',
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-purgecss',
      options: {
        printRejected: true, // Print removed selectors and processed file names
        develop: false,
        tailwind: true,
        // whitelist: ['whitelist'], // Don't remove this selector
        // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
          },
          {
            resolve: 'gatsby-remark-smartypants',
          },
        ],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.join(__dirname, '/src/__content/blog'),
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: path.join(__dirname, '/src/__content/weekly-links'),
        name: 'weekly-links',
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        setup({
          query: {
            site: {siteMetadata},
            allMdx: {edges},
            generator,
          },
        }) {
          return Object.assign({}, siteMetadata, edges, generator, {
            title: `${siteMetadata.author} | ${siteMetadata.title}`,
            site_url: siteMetadata.siteUrl,
            feed_url: `${siteMetadata.siteUrl}/${feedUrl}`,
            language: 'en-US',
          })
        },
        query: `
          {
            site {
              siteMetadata {
                author
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            query: `
        {
          allMdx(
                sort: {
                  order: DESC,
                  fields: [frontmatter___date]
                }
              ) {
                edges {
                  node {
                    frontmatter {
                      title
                      date
                    }
                    fields {
                      slug
                    }
                    excerpt(pruneLength: 500)
                  }
                }
              }
            }
          `,
            serialize({
              query: {
                site: {siteMetadata},
                allMdx: {edges},
              },
            }) {
              return edges.map((edge) => {
                const url = siteMetadata.siteUrl + edge.node.fields.slug
                return Object.assign({}, edge.node.frontmatter, {
                  url,
                  guid: url,
                  description: edge.node.excerpt,
                  pubDate: new Date(edge.node.frontmatter.date).toUTCString(),
                })
              })
            },
            output: feedUrl,
            title: `${siteMetadata.author} | ${siteMetadata.title}`,
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        serialize: ({site, allSitePage}) =>
          allSitePage.edges.map((edge) => {
            const isBlog = ~edge.node.path.indexOf('/blog/')
            const changefreq = isBlog ? 'weekly' : 'yearly'
            const priority = isBlog ? 1 : 0.7
            return {
              url: site.siteMetadata.siteUrl + edge.node.path,
              changefreq,
              priority,
            }
          }),
      },
    },
    'gatsby-plugin-typescript',
  ],
}
