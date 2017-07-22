// @flow
const feedUrl = 'feed.xml'

module.exports = {
  siteMetadata: {
    author: 'Ahmed El Gabri',
    title: 'Front-end Engineer',
    siteUrl: 'https://gabri.me',
    description:
      'Ahmed El Gabri is a Front-end Engineer who like to bring structure where it is lacking, systematizing information & automating processes.',
    social: {
      twitter: {
        display: '@ahmedelgabri',
        url: 'http://twitter.com/ahmedelgabri',
      },
      github: {
        display: 'github.com/ahmedelgabri',
        url: 'https://github.com/ahmedelgabri',
      },
      email: {
        display: 'email',
        url: 'mailto:ahmed@gabri.me?subject=Hi!&body=👋🏼',
      },
      resume: {
        display: 'resume',
        url:
          'https://docs.google.com/document/d/1sxu8gQi_vyz_RnDNTb6qJy3o9cth6_DzAI2zE_HHSnQ/edit?usp=sharing',
      },
    },
    google_analytics: {
      prod: 'UA-10517764-2',
      local: 'UA-10517764-7',
    },
    disqus: 'gabrime',
    twitter_id: '1512909779',
    talks: {
      AmsterdamJS: [
        'http://bit.ly/amsterdamjs-codemods',
        'https://youtu.be/xGjSMbks9vA',
      ],
    },
  },
  plugins: [
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/posts`,
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-feed',
      options: {
        setup({
          query: {
            site: { siteMetadata },
            allMarkdownRemark: { edges },
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
              allMarkdownRemark(
                limit: 1000,
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
                    excerpt
                    html
                  }
                }
              }
            }
          `,
            serialize({
              query: { site: { siteMetadata }, allMarkdownRemark: { edges } },
            }) {
              return edges.map(edge => {
                const url = siteMetadata.siteUrl + edge.node.fields.slug
                return Object.assign({}, edge.node.frontmatter, {
                  url,
                  guid: url,
                  description: edge.node.excerpt,
                  pubDate: new Date(edge.node.frontmatter.date).toUTCString(),
                  custom_elements: [{ 'content:encoded': edge.node.html }],
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
        serialize: ({ site, allSitePage }) =>
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
  ],
}
