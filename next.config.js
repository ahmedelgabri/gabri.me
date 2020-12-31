module.exports = {
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
  webpack: (config, {dev, isServer}) => {
    if (isServer) {
      require('./scripts/generate-feed')
    }

    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      })
    }

    return config
  },
}
