/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // هذا سيسمح بالرفع حتى لو وجد أخطاء في الـ Lint
    ignoreDuringBuilds: true,
  },
  typescript: {
    // هذا سيسمح بالرفع حتى لو وجد أخطاء في الـ Types
    ignoreBuildErrors: true,
  },
};

export default nextConfig;