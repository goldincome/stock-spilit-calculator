/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  eslint: {
    ignoreDuringBuilds: true
  },
  reactStrictMode: true,   webpack: (config, { isServer }) => {     if (!isServer) {       config.resolve.fallback.fs = false     }      return config   },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
};


module.exports = nextConfig;