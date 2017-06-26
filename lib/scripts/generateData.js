const fs = require('fs')
const path = require('path')
const compareDesc = require('date-fns/compareDesc')
const fm = require('front-matter')
const hljs = require('highlight.js')
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${hljs.highlight(lang, str, true)
          .value}</code></pre>`
      } catch (__) {} // eslint-disable-line
    }

    return `<pre class="hljs"><code>${md.utils.escapeHtml(str)}</code></pre>`
  },
})

// generatePost :: String -> String -> Obj
function generatePost(dir, slug) {
  const post = fs.readFileSync(
    path.resolve(__dirname, `${dir}/${slug}.md`),
    'utf8'
  )
  const metadata = fm(post)
  return Object.assign({}, metadata, { __html: md.render(metadata.body) })
}

// generateData :: String -> Object
function generateData(dir) {
  return fs
    .readdirSync(path.resolve(__dirname, dir), 'utf8')
    .filter(file => file !== '.DS_Store' && /\.md$/.test(file))
    .map(file => file.split('.')[0])
    .reduce((obj, slug) => {
      const data = generatePost(dir, slug)
      obj[slug] || (obj[slug] = data) // eslint-disable-line
      return obj
    }, {})
}

// sortData :: Object -> Object
function sortData(data) {
  return Object.keys(data)
    .sort((a, b) =>
      compareDesc(data[a].attributes.date, data[b].attributes.date)
    )
    .reduce((obj, slug) => {
      obj[slug] = data[slug] // eslint-disable-line
      return obj
    }, {})
}

function writeData(dir) {
  const data = sortData(generateData(dir))
  fs.writeFileSync(
    path.resolve(__dirname, `${dir}/metadata.json`),
    JSON.stringify(data, null, 2),
    'utf8'
  )
}

writeData('../../posts/articles')
writeData('../../posts/weekly-links')
