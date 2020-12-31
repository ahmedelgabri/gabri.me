const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')
const remark = require('remark')
const strip = require('strip-markdown')
const truncate = require('lodash.truncate')
const globby = require('globby')

const getProcessor = remark().use(strip).freeze()

async function stripMarkdown(md) {
  try {
    const file = await getProcessor.process(md)

    return file.contents
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Strip Markdown error: ${error}`)
    throw error
  }
}

const postsDirectory = path.resolve(process.cwd(), './src/_content/blog')
// const weeklyLinks = `${postsDirectory}/weekly-links`

async function getPostSlugs() {
  return (await globby([`${postsDirectory}/*.{md,mdx}`])).map((p) =>
    path.basename(path.basename(p, '.mdx'), '.md'),
  )
}

async function getPostBySlug(slug) {
  const realSlug = slug.replace(/\.mdx?$/, '')
  // Markdown is the default
  let fullPath = path.join(postsDirectory, `${realSlug}.md`)

  // add support to .mdx extention
  // All files will be compiled as .mdx anyway
  try {
    const filePath = path.join(postsDirectory, `${realSlug}.mdx`)
    if (fs.statSync(filePath).isFile()) {
      fullPath = filePath
    }
  } catch (e) {}

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const {data, content} = matter(fileContents)
  const raw = await stripMarkdown(content)
  const excerpt = truncate(raw, {length: 160})

  return {...data, content, excerpt, slug: `/blog/${realSlug}`}
}

async function getAllPosts() {
  const slugs = await getPostSlugs()
  const posts = await Promise.all(
    slugs.map(async (slug) => await getPostBySlug(slug)),
  )

  return posts.sort(
    ({date: a}, {date: b}) => new Date(b).getTime() - new Date(a).getTime(),
  )
}

module.exports = {
  getPostSlugs,
  getPostBySlug,
  getAllPosts,
}
