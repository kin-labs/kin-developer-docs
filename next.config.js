// @ts-check
const { withContentlayer } = require('next-contentlayer')

module.exports = withContentlayer({
  images: {
    domains: ['pbs.twimg.com', 'avatars.githubusercontent.com', 'i.imgur.com'],
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
        { key: 'Cross-Origin-Embedder-Policy', value: 'same-origin' },
      ],
    },
  ],
})

module.exports = {
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack', 'url-loader'],
    })

    return config
  },
}
