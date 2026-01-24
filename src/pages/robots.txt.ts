import type {APIRoute} from 'astro'
import siteMeta from '../config/siteMeta'

export const GET: APIRoute = () => {
	const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteMeta.siteUrl}/sitemap.xml
`

	return new Response(robotsTxt, {
		headers: {
			'Content-Type': 'text/plain',
		},
	})
}
