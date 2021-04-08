module.exports = {
  future: {
    webpack5: true,
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
    ]
  },
  webpack: (config, {isServer}) => {
    if (isServer) {
      require('./scripts/generate-feed')
    }

    return config
  },
}
