module.exports = {
  siteMetadata: {
    author: 'Ahmed El Gabri',
    title: 'Front-end Engineer',
    url: 'https://gabri.me',
    description:
      'Ahmed El Gabri is a Front-end Engineer who like to bring structure where it is lacking, systematizing information & automating processes.',
    email: 'ahmed@gabri.me',
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
    // {
    //   resolve: 'gatsby-plugin-feed',
    //   options: {},
    // },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
            {
              site {
                siteMetadata {
                  url
                }
              }

              allSitePage(
                filter: {
                  path: {ne: "/dev-404-page/"}
                }
              ) {
                edges {
                  node {
                    path
                  }
                }
              }
          }
        `,
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map(edge => {
            const isBlog = ~edge.node.path.indexOf('/blog/')
            const changefreq = isBlog ? 'weekly' : 'yearly'
            const priority = isBlog ? 1 : 0.7
            return {
              url: site.siteMetadata.url + edge.node.path,
              changefreq,
              priority,
            }
          }),
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
  ],
}
