module.exports = {
  plugins: [
    'tailwindcss',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
        features: {
          // not working https://github.com/csstools/postcss-preset-env/issues/169
          'nesting-rules': true,
          'custom-properties': false,
        },
      },
    ],
  ],
}
