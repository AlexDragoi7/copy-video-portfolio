import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
  async rewrites() {
    return [{ source: "/anki", destination: "/anki-landing-page.html" }];
  },
};

export default nextConfig;
