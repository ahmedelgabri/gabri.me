module.exports = {
  // experimental: {
  //   concurrentFeatures: true,
  //   serverComponents: true,
  //   reactRoot: true,
  // },
  swcMinify: true,
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
  webpack: (config, {isServer}) => {
    if (isServer) {
      require('./scripts/generate-feed')
    }

    return config
  },
}
