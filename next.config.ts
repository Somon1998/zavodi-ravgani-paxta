import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Hide the on-screen Dev Tools indicator in local development only.
  // Compile/runtime errors still surface; production UI is unaffected.
  devIndicators: false,
};

export default nextConfig;
