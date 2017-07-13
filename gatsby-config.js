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
          // {
          //   resolve: 'gatsby-remark-images',
          //   options: {
          //     maxWidth: 590,
          //   },
          // },
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
    // 'gatsby-transformer-sharp',
    // 'gatsby-plugin-sharp',
    // 'gatsby-plugin-feed',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        // trackingId: `ADD YOUR TRACKING ID HERE`,
      },
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
  ],
}
