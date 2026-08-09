import { redirect } from "next/navigation";

/** /blog/[slug] は記事詳細（/column/[slug]）へ転送する */
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  redirect(`/column/${encodeURIComponent(slug)}`);
}
