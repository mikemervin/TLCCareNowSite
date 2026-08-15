import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.wixstatic.com",
        pathname: "/media/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "tlccarenow.com" }],
        destination: "https://www.tlccarenow.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
