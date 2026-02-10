/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@nc/ui', '@nc/design-system', '@nc/shared'],
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
