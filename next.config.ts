import type {NextConfig} from 'next'
import {withContentlayer} from 'next-contentlayer'

const config: NextConfig = withContentlayer({
	reactStrictMode: true,
	poweredByHeader: false,
	publicRuntimeConfig: {
		isPROD: process.env.NODE_ENV === 'production',
	},
	async redirects() {
		return [
			{
				source: '/feed',
				destination: '/feed.xml',
				permanent: true,
			},
			{
				source: '/work',
				destination: '/',
				permanent: true,
			},
			{
				source: '/blog',
				destination: '/',
				permanent: true,
			},
		]
	},
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'Permissions-Policy',
						value: 'interest-cohort=()',
					},
				],
			},
		]
	},
})

export default config
