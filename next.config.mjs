// @ts-check

const isDev = process.argv.indexOf('dev') !== -1
const isBuild = process.argv.indexOf('build') !== -1

if (!process.env.VELITE_STARTED && (isDev || isBuild)) {
	process.env.VELITE_STARTED = '1'
	const {build} = await import('velite')
	await build({watch: isDev, clean: !isDev})
}

/** @type {import('next').NextConfig} */
const config = {
	experimental: {
		inlineCss: true,
	},
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

export default config
