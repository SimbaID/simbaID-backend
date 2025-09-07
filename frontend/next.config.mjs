/** @type {import('next').NextConfig} */
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
  // Use a custom dist dir to avoid conflicts with a locked `.next/` folder during dev
  distDir: ".next-dev",
}

export default nextConfig
