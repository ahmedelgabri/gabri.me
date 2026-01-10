import type {NextConfig} from 'next'
import createMDX from '@next/mdx'
import {rehypePluginsForNext} from './mdx.config'

const config: NextConfig = {
	experimental: {
		inlineCss: true,
	},
	pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
	reactCompiler: true,
	reactStrictMode: true,
	poweredByHeader: false,
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
}

const withMDX = createMDX({
	extension: /\.mdx?$/,
	options: {
		rehypePlugins: rehypePluginsForNext,
	},
})

export default withMDX(config)
