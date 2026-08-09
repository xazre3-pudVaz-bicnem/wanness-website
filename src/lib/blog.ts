/**
 * ブログAPI
 *
 * わんnessのブログは既存のコラム機能（/column、content/column/）に
 * 統合されている。自動生成スクリプト（scripts/generate-daily-post.ts）も
 * content/column/ へ記事を保存し、一覧・詳細・カテゴリー絞り込み・
 * サイトマップ・構造化データはすべて既存のコラム側で提供される。
 *
 * /blog 系のURLは /column へリダイレクトされる（src/app/blog/）。
 * このファイルは、ブログ記事へアクセスするための公開APIとして
 * コラムの実装を再エクスポートしている。
 */

export {
  getAllPosts,
  getAllCategories,
  getPostBySlug,
  getRelatedPosts,
  type ColumnPost as BlogPost,
  type ColumnSummary as BlogSummary,
  type ColumnFrontmatter as BlogFrontmatter,
} from "@/lib/column";
