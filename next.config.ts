import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 親ディレクトリに別プロジェクトのlockfileがあるため、ルートを明示する
  outputFileTracingRoot: __dirname,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
