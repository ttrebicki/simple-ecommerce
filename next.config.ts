import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { remotePatterns: [new URL("https://loremflickr.com/**")] },
};

export default nextConfig;
