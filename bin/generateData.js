const fs = require('fs')
const path = require('path')
const marked = require('marked')
const compareDesc = require('date-fns/compare_desc')
const fm = require('front-matter')

// @TODO: Cleanup this file, I don't like it very much

marked.setOptions({
  highlight (code) {
    return require('highlight.js').highlightAuto(code).value
  }
})

// generatePost :: String -> String -> Obj
function generatePost (dir, slug) {
  const post = fs.readFileSync(path.resolve(__dirname, `${dir}/${slug}.md`), 'utf8')
  const metadata = fm(post)
  return Object.assign({}, metadata, { __html: marked(metadata.body) })
}

// generateData :: String -> Object
function generateData (dir) {
  return fs.readdirSync(path.resolve(__dirname, dir), 'utf8')
    .filter(file => file !== '.DS_Store' && /\.md$/.test(file))
    .map(file => file.split('.')[0])
    .reduce((obj, slug) => {
      const data = generatePost(dir, slug)
      obj[slug] || (obj[slug] = data)
      return obj
    }, {})
}

// sortData :: Object -> Object
function sortData (data) {
  return Object.keys(data)
    .sort((a, b) => compareDesc(data[a].attributes.date, data[b].attributes.date))
    .reduce((obj, slug) => {
      obj[slug] = data[slug]
      return obj
    }, {})
}

function writeData (dir) {
  const data = sortData(generateData(dir))
  fs.writeFileSync(path.resolve(__dirname, `${dir}/metadata.json`), JSON.stringify(data, null, 2), 'utf8')
}

writeData('../client/blog/posts')
writeData('../client/blog/weekly-links')
