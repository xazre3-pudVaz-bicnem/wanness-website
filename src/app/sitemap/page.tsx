import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { allPages } from "@/data/navigation";
import { getAllPosts } from "@/lib/column";

export const metadata: Metadata = {
  title: "サイトマップ",
  description:
    "わんness公式サイトのサイトマップ。サービス案内、料金、対応エリア、よくある質問、コラムなど全ページの一覧です。",
  alternates: { canonical: "/sitemap" },
};

export default function SitemapPage() {
  const posts = getAllPosts();
  return (
    <>
      <Breadcrumbs items={[{ name: "サイトマップ", path: "/sitemap" }]} />
      <PageHero title="サイトマップ" description="当サイトの全ページ一覧です。" />
      <section className="mx-auto w-full max-w-4xl px-4 py-14 md:py-20">
        <Reveal>
          <h2 className="font-serif text-lg font-semibold text-cocoa">ページ一覧</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {allPages.map((page) => (
              <li key={page.href}>
                <Link
                  href={page.href}
                  className="flex items-center gap-2 rounded-xl border border-cocoa/10 bg-white px-4 py-3 text-sm text-ink/85 transition hover:border-brand hover:text-brand"
                >
                  <span aria-hidden="true" className="text-brand">›</span>
                  {page.label}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
        {posts.length > 0 && (
          <Reveal className="mt-10">
            <h2 className="font-serif text-lg font-semibold text-cocoa">コラム記事</h2>
            <ul className="mt-4 grid gap-2">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/column/${post.slug}`}
                    className="flex items-center gap-2 rounded-xl border border-cocoa/10 bg-white px-4 py-3 text-sm text-ink/85 transition hover:border-brand hover:text-brand"
                  >
                    <span aria-hidden="true" className="text-brand">›</span>
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </section>
    </>
  );
}
