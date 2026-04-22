import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coffee-people.com",
      },
    ],
  },
};

export default nextConfig;
