/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/',
      },
    ],
    domains: ['res.cloudinary.com', 'images.unsplash.com', 'localhost'],
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/',
        destination: 'http://localhost:5000/api/v1/',
      },
    ]
  },
}
module.exports = nextConfig
