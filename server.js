const path = require('path')
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const PORT = process.env.PORT || 3000
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.disable('x-powered-by')

  // server.get('/sitemap.xml', (req, res) => res.sendFile(path.join(__dirname, './static/sitemap.xml')))
  server.get('/feed.xml', (req, res) =>
    res.sendFile(path.join(__dirname, './static/feed.xml'))
  )

  server.get(/\/feed((\/)|(\.xml))?/, (req, res) =>
    res.redirect(301, '/feed.xml')
  )
  // server.get(/\/sitemap((\/)|(\.xml))?/, (req, res) => res.redirect(301, '/sitemap.xml'))
  server.get('/work/?', (req, res) => res.redirect(301, '/'))
  server.get('/work/:item/?', (req, res) => res.redirect(301, '/'))
  server.get('/blog/?', (req, res) => res.redirect(301, '/'))
  server.get('/blog/:post/?', (req, res) =>
    app.render(req, res, '/blog', req.params)
  )

  server.get('*', (req, res) => handle(req, res))

  server.listen(PORT, err => {
    if (err) throw err
    process.stdout.write(`> Ready on http://localhost:${PORT}`)
  })
})
