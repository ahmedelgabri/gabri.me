const fs = require('fs')
const RSS = require('rss')
const truncate = require('lodash.truncate')
const remark = require('remark')
const strip = require('strip-markdown')
const prettier = require('prettier')
const getAllPosts = require('../src/lib/utils').getAllPosts
const siteMeta = require('../src/config/meta')
const {author, title, siteUrl, description} = siteMeta

;(async () => {
  const prettierConfig = await prettier.resolveConfig('../.prettier.config.js')
  const allPosts = await getAllPosts()

  const feed = new RSS({
    title: `${author} | ${title}`,
    site_url: siteUrl,
    feed_url: `${siteUrl}/feed.xml`,
    description,
  })

  allPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map(async ({title, date, content, slug}) => {
      const stripped = await remark().use(strip).process(content)

      feed.item({
        title: title,
        guid: `${siteUrl}${slug}`,
        date,
        description: truncate(stripped.contents || '', {length: 500}).replace(
          '*',
          '',
        ),
        author,
      })
    })

  const formatted = feed.xml({indent: true})
  // const formatted = prettier.format(feed.xml({indent: true}), {
  //   ...prettierConfig,
  //   parser: 'html',
  // })

  // eslint-disable-next-line no-sync
  fs.writeFileSync('public/feed.xml', formatted)
})()
