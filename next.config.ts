import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '', // Correct for chernetsov.github.io
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  // If you were using MDX, you'd add the withMDX wrapper here.
  // For now, let's keep it simple.
};

export default nextConfig;
