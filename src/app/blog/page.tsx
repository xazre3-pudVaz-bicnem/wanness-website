import { redirect } from "next/navigation";

/**
 * わんnessのブログは既存のコラム（/column）に統合されている。
 * /blog へのアクセスは記事一覧（/column）へ転送する。
 */
export default function BlogPage() {
  redirect("/column");
}
