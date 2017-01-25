const fs = require('fs')
const path = require('path')
const format = require('date-fns/format')
const escape = require('../escape')
const data = require('../../data')
const posts = require('../../posts/articles/metadata')

function generateItems (siteUrl, posts) {
  return Object.keys(posts).map(slug => {
    return `
      <item>
        <title>${escape(posts[slug].attributes.title)}</title>
        <guid isPermaLink="false">${slug}</guid>
        <link>${siteUrl}/blog/${slug}/</link>
        <pubDate>${format(new Date(posts[slug].attributes.date), 'ddd, DD MMM YYYY H:mm:ss +0000')}</pubDate>
        <description><![CDATA[${posts[slug].__html}]]></description>
        <content:encoded><![CDATA[${posts[slug].__html}]]></content:encoded>
      </item>
    `
  }).join('\n')
}

const feed = (d, p) => `<?xml version="1.0" encoding="utf-8" ?>
<rss
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:wfw="http://wellformedweb.org/CommentAPI/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
  xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
  version="2.0">
  <channel>
    <title>${d.author} | ${d.title}</title>
    <atom:link href="${d.url}/feed.xml" rel="self" type="application/rss+xml"/>
    <link>${d.url}</link>
    <description>${escape(d.description)}</description>
    <lastBuildDate>${format(new Date(p[Object.keys(p)[0]].attributes.date), 'ddd, DD MMM YYYY H:mm:ss +0000')}</lastBuildDate>
    <language>en-US</language>
    <sy:updatePeriod>hourly</sy:updatePeriod>
    <sy:updateFrequency>1</sy:updateFrequency>
    ${generateItems(d.url, p)}
  </channel>
</rss>`

fs.writeFileSync(path.resolve(__dirname, '../../static/feed.xml'), feed(data, posts), 'utf8')
