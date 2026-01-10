import type {NextConfig} from 'next'
import createMDX from '@next/mdx'

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
		rehypePlugins: [
			'rehype-slug',
			'rehype-code-titles',
			[
				'rehype-prism-plus',
				{
					defaultLanguage: 'txt',
				},
			],
			[
				'rehype-autolink-headings',
				{
					properties: {
						className: ['anchor'],
					},
				},
			],
		],
	},
})

export default withMDX(config)
