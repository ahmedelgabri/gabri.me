/**
 * Generates robots.txt content with sitemap URL.
 */
export function generateRobotsTxt(siteUrl: string): string {
	return `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`
}
