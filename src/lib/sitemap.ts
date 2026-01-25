export interface SitemapEntry {
	url: string
	lastmod: string
	changefreq: string
	priority: number
}

/**
 * Generates sitemap XML content from a list of entries.
 */
export function generateSitemapXml(entries: SitemapEntry[]): string {
	return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
	.map(
		(entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
	)
	.join('\n')}
</urlset>`
}
