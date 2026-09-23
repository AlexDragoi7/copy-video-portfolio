import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
  // /anki is a sample landing page for a portfolio piece — keep it out of search results.
  async headers() {
    return ["/anki", "/anki-landing-page.html"].map((source) => ({
      source,
      headers: [{ key: "X-Robots-Tag", value: "noindex" }],
    }));
  },
  async rewrites() {
    return [{ source: "/anki", destination: "/anki-landing-page.html" }];
  },
};

export default nextConfig;
