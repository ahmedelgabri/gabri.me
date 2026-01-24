import type {APIRoute} from 'astro'
import siteMeta from '../config/siteMeta'
import {generateRobotsTxt} from '../lib/robots'

export const GET: APIRoute = () => {
	return new Response(generateRobotsTxt(siteMeta.siteUrl), {
		headers: {
			'Content-Type': 'text/plain',
		},
	})
}
