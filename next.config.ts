import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Contentful asset CDN
      { protocol: "https", hostname: "images.ctfassets.net" },
      // Old Wix media, if any images are hotlinked during migration
      { protocol: "https", hostname: "static.wixstatic.com" },
    ],
  },
  async redirects() {
    // Preserve inbound links / SEO from the old Wix URLs
    return [
      { source: "/wetzelland", destination: "/wetzelland", permanent: true },
      { source: "/swap-meet-flyers", destination: "/flyers", permanent: true },
      { source: "/directions-and-site-map", destination: "/directions", permanent: true },
      { source: "/contact-8", destination: "/advertising", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
    ].filter((r) => r.source !== r.destination);
  },
};

export default nextConfig;
