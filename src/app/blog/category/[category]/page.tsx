import { redirect } from "next/navigation";

/** /blog/category/[category] はコラム一覧のカテゴリー絞り込みへ転送する */
export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  redirect(`/column?category=${encodeURIComponent(category)}`);
}
