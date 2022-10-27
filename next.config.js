const {withContentlayer} = require('next-contentlayer')

module.exports = withContentlayer({
	experimental: {
		// concurrentFeatures: true,
		// serverComponents: true,
		// reactRoot: true,
		legacyBrowsers: false,
		browsersListForSwc: true,
		// runtime: 'experimental-edge',
	},
	reactStrictMode: true,
	poweredByHeader: false,
	eslint: {
		// Warning: Dangerously allow production builds to successfully complete even if
		// your project has ESLint errors.
		ignoreDuringBuilds: true,
	},
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
