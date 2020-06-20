const fs = require('fs')
const path = require('path')
const matter = require('gray-matter')

const postsDirectory = path.resolve(process.cwd(), './pages/blog')
// const weeklyLinks = `${postsDirectory}/weekly-links`

function getPostSlugs() {
  return fs.readdirSync(postsDirectory).filter((f) => f !== 'index.tsx')
}

function getPostBySlug(slug, fields = []) {
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

  // Ensure only the minimal needed data is exposed
  return fields.reduce(
    (acc, field) => {
      if (process.env.NODE_ENV === 'production' && !data.published) return acc

      if (field === 'content') {
        Object.assign(acc, {[field]: content})
      }

      if (data[field]) {
        Object.assign(acc, {[field]: data[field]})
      }

      return acc
    },
    {slug: realSlug},
  )
}

function getAllPosts(fields = []) {
  const slugs = getPostSlugs()
  return slugs
    .map((slug) => getPostBySlug(slug, fields))
    .sort(
      ({date: a}, {date: b}) => new Date(b).getTime() - new Date(a).getTime(),
    )
}

module.exports = {
  getPostSlugs,
  getPostBySlug,
  getAllPosts,
}
