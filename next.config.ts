import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 親ディレクトリに別プロジェクトのlockfileがあるため、ルートを明示する
  outputFileTracingRoot: __dirname,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // ブログは既存コラム（/column）に統合しているため、/blog 系URLを転送する
  async redirects() {
    return [
      { source: "/blog", destination: "/column", permanent: true },
      {
        source: "/blog/category/:category",
        destination: "/column?category=:category",
        permanent: true,
      },
      { source: "/blog/:slug", destination: "/column/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
