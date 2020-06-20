const fs = require('fs')
const globby = require('globby')
const prettier = require('prettier')
const siteMeta = require('../config/meta')

;(async () => {
  const prettierConfig = await prettier.resolveConfig('./.prettier.config.js')
  const pages = await globby([
    'pages/**/*.{js,jsx,tsx,mdx,md}',
    '!pages/_*.{js,jsx,tsx,mdx,md}',
    '!pages/api',
  ])
  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace('pages', '')
                  .replace(/\.(js|jsx|tsx|mdx?)$/, '')
                const route = path === '/index' ? '' : path
                return `
                        <url>
                            <loc>${`${siteMeta.siteUrl}${route}`}</loc>
                        </url>
                    `
              })
              .join('')}
        </urlset>
    `

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  })

  // eslint-disable-next-line no-sync
  fs.writeFileSync('public/sitemap.xml', formatted)
})()
