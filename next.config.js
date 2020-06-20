const withMdxEnhanced = require('next-mdx-enhanced')
const remark = require('remark')
const strip = require('strip-markdown')
const truncate = require('lodash.truncate')

const getProcessor = remark().use(strip).freeze()

async function stripMarkdown(md) {
  try {
    const file = await getProcessor.process(md)

    return file.contents
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Stip Markdown error: ${error}`)
    throw error
  }
}

module.exports = withMdxEnhanced({
  layoutPath: 'layouts',
  defaultLayout: true,
  fileExtensions: ['mdx', 'md'],
  remarkPlugins: [require('remark-code-titles')],
  rehypePlugins: [],
  extendFrontMatter: {
    process: async (mdxContent, frontMatter) => {
      const raw = await stripMarkdown(mdxContent)

      return {
        excerpt: truncate(raw, {length: 160}),
        slug: frontMatter.__resourcePath.replace(/\.mdx?/, ''),
      }
    },
  },
})({
  publicRuntimeConfig: {
    isPROD: process.env.NODE_ENV === 'production',
  },
  async redirects() {
    return [
      {
        source: '/feed',
        destination: '/feed.xml',
        permanent: true,
      },
      {
        source: '/work',
        destination: '/',
        permanent: true,
      },
    ]
  },
  webpack: (config, {isServer}) => {
    if (isServer) {
      require('./scripts/generate-sitemap')
      require('./scripts/generate-feed')
    }

    return config
  },
})
