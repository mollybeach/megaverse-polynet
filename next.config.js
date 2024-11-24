/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['res.cloudinary.com'],
  },
  basePath: process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? '/megaverse-polynet' : '',
  assetPrefix: process.env.NEXT_PUBLIC_NODE_ENV === 'production' ? '/megaverse-polynet' : '',
};

module.exports = nextConfig;