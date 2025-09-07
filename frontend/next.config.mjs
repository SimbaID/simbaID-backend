/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Use a custom dist dir only in development to avoid conflicts with a locked `.next/` folder
  ...(isProd ? {} : { distDir: ".next-dev" }),
}

export default nextConfig
