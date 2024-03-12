/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  env: {
    // Global
    HOST: process.env.HOST,
  },
};

module.exports = nextConfig;
