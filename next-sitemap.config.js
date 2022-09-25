const siteMeta = require('./src/config/siteMeta')

/** @type {import('next-sitemap').IConfig} */
const config = {
	siteUrl: siteMeta.siteUrl,
	generateRobotsTxt: true,
	changefreq: 'yearly',
	transform: (config, url) => {
		const isHomepage = url === '/'
		const isBlog = ~url.indexOf('/blog')
		const changefreq = isBlog ? 'weekly' : config.changefreq
		const priority = isHomepage ? 1 : isBlog ? 0.9 : config.priority

		return {
			loc: url,
			changefreq,
			priority,
			lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
		}
	},
}

module.exports = config
