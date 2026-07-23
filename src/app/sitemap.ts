import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { getAllPosts } from "@/lib/column";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/about",
    "/basic-care",
    "/visiting-trimming",
    "/body-care",
    "/price",
    "/flow",
    "/area",
    "/first",
    "/faq",
    "/profile",
    "/column",
    "/contact",
    "/privacy",
    "/sitemap",
  ];

  const pages: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const posts: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${siteUrl}/column/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...pages, ...posts];
}
