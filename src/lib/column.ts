import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked, type Tokens } from "marked";

/**
 * コラム記事の読み込み
 *
 * 記事は content/column/*.md で管理。
 * Claude API や GitHub Actions から Markdown ファイルを追加するだけで
 * 一覧・詳細・サイトマップへ自動反映される。
 */

const COLUMN_DIR = path.join(process.cwd(), "content", "column");

export type ColumnFrontmatter = {
  title: string;
  slug: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  tags: string[];
  author: string;
  thumbnail?: string;
  relatedKeywords?: string[];
};

export type ColumnPost = ColumnFrontmatter & {
  /** 変換済みHTML */
  html: string;
  /** 目次（h2 / h3） */
  toc: { id: string; text: string; depth: number }[];
};

export type ColumnSummary = ColumnFrontmatter;

function readPostFile(filename: string): { data: ColumnFrontmatter; content: string } {
  const raw = fs.readFileSync(path.join(COLUMN_DIR, filename), "utf-8");
  const { data, content } = matter(raw);
  const fm = data as Partial<ColumnFrontmatter>;
  return {
    data: {
      title: fm.title ?? "無題",
      slug: fm.slug ?? filename.replace(/\.md$/, ""),
      description: fm.description ?? "",
      publishedAt: fm.publishedAt ?? "1970-01-01",
      updatedAt: fm.updatedAt,
      category: fm.category ?? "コラム",
      tags: fm.tags ?? [],
      author: fm.author ?? "わんness",
      thumbnail: fm.thumbnail,
      relatedKeywords: fm.relatedKeywords,
    },
    content,
  };
}

export function getAllPosts(): ColumnSummary[] {
  if (!fs.existsSync(COLUMN_DIR)) return [];
  return fs
    .readdirSync(COLUMN_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readPostFile(f).data)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getAllCategories(): string[] {
  return [...new Set(getAllPosts().map((p) => p.category))];
}

export function getPostBySlug(slug: string): ColumnPost | null {
  if (!fs.existsSync(COLUMN_DIR)) return null;
  const file = fs
    .readdirSync(COLUMN_DIR)
    .filter((f) => f.endsWith(".md"))
    .find((f) => readPostFile(f).data.slug === slug);
  if (!file) return null;

  const { data, content } = readPostFile(file);
  const toc: ColumnPost["toc"] = [];
  let headingIndex = 0;

  const renderer = new marked.Renderer();
  renderer.heading = ({ tokens, depth }: Tokens.Heading) => {
    const text = tokens.map((t) => ("text" in t ? (t as Tokens.Text).text : "")).join("");
    headingIndex += 1;
    const id = `section-${headingIndex}`;
    if (depth === 2 || depth === 3) toc.push({ id, text, depth });
    return `<h${depth} id="${id}">${text}</h${depth}>`;
  };

  const html = marked.parse(content, { renderer, async: false }) as string;
  return { ...data, html, toc };
}

export function getRelatedPosts(post: ColumnFrontmatter, limit = 3): ColumnSummary[] {
  const others = getAllPosts().filter((p) => p.slug !== post.slug);
  const sameCategory = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
