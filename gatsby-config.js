const proxy = require('http-proxy-middleware')
const siteMetadata = require('./src/config/meta')
const feedUrl = 'feed.xml'

module.exports = {
  developMiddleware: app => {
    app.use(
      '/.netlify/functions/',
      proxy({
        target: 'http://localhost:9000',
        pathRewrite: {
          '/.netlify/functions/': '',
        },
      }),
    )
  },
  siteMetadata,
  plugins: [
    'gatsby-plugin-remove-serviceworker',
    'gatsby-plugin-twitter',
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-mdx',
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
        path: `${__dirname}/src/posts`,
        name: 'posts',
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
              return edges.map(edge => {
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
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        serialize: ({site, allSitePage}) =>
          allSitePage.edges.map(edge => {
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
    'gatsby-plugin-netlify',
    'gatsby-plugin-typescript',
  ],
}
