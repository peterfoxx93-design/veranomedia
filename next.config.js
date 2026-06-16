/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  swcMinify: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'x-vercel-ai-enabled',
            value: 'false',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
