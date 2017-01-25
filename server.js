const path = require('path')
const express = require('express')
const next = require('next')
const metadata = require('./posts/articles/metadata')

const dev = process.env.NODE_ENV !== 'production'
const PORT = process.env.PORT || 3000
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/feed((\/)|(\.xml))?', (req, res) =>
      res.sendFile(path.join(__dirname, './static/feed.xml')))

    server.get('/sitemap((\/)|(\.xml))?', (req, res) =>
      res.sendFile(path.join(__dirname, './static/sitemap.xml')))

    server.get('/blog/:post', (req, res) => {
      return app.render(req, res, '/blog', req.params)
    })

    server.get(/\/(work(\/(.*)?)?|blog(\/(weekly-links-v-\d+)?)?)/, (req, res) => {
      res.redirect(301, '/')
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(PORT, (err) => {
      if (err) throw err
      console.log(`> Ready on http://localhost:${PORT}`)
    })
  })




