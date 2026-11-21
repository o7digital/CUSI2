/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{
      source: '/_next/static/media/:path*',
      headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }],
    }]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'oliviers54.sg-host.com',
      },
      {
        protocol: 'https',
        hostname: 'wp-cusi.o7digitalgroup.com',
      },
    ],
  },
}

export default nextConfig
