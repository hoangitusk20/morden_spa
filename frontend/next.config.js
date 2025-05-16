const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    serverActions: true, // nếu dùng Next 14+ App Router
  },
  output: "standalone", // cần thiết cho deployment trên Cloudflare hoặc Docker
  webpack(config) {
    // Giảm kích thước bundle bằng cách loại bỏ moment.js locale nếu có
    config.plugins.push(
      new (require("webpack").IgnorePlugin)({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      })
    );

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
