import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import CtaSection from "@/components/ui/CtaSection";
import JsonLd from "@/components/seo/JsonLd";
import { itemListJsonLd } from "@/lib/jsonld";
import { getAllPosts, getAllCategories } from "@/lib/column";
import { siteUrl } from "@/config/site";

export const metadata: Metadata = {
  title: "コラム｜犬の健康ケア・トリミングの読みもの",
  description:
    "わんnessのコラム。シニア犬のトリミング、犬の皮膚・被毛ケア、身体の左右差や歩き方のこと、沖縄での犬との暮らしなど、愛犬の健康管理に役立つ情報をお届けします。",
  alternates: { canonical: "/column" },
  openGraph: {
    title: "コラム｜わんness",
    description:
      "シニア犬のケア、皮膚・被毛のこと、犬との暮らしに役立つ情報を発信しています。",
    url: "/column",
  },
};

const PER_PAGE = 9;

export default async function ColumnPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; page?: string }>;
}) {
  const params = await searchParams;
  const categories = getAllCategories();
  const activeCategory =
    params.category && categories.includes(params.category)
      ? params.category
      : null;

  const allPosts = getAllPosts();
  const filtered = activeCategory
    ? allPosts.filter((p) => p.category === activeCategory)
    : allPosts;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(
    Math.max(1, Number(params.page) || 1),
    totalPages,
  );
  const posts = filtered.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE,
  );

  const pageHref = (page: number) => {
    const query = new URLSearchParams();
    if (activeCategory) query.set("category", activeCategory);
    if (page > 1) query.set("page", String(page));
    const qs = query.toString();
    return qs ? `/column?${qs}` : "/column";
  };

  return (
    <>
      <JsonLd
        data={itemListJsonLd({
          name: "わんnessコラム",
          items: posts.map((p) => ({
            name: p.title,
            url: `${siteUrl}/column/${p.slug}`,
          })),
        })}
      />
      <Breadcrumbs items={[{ name: "コラム", path: "/column" }]} />
      <PageHero
        title="コラム"
        description="愛犬の健康管理やトリミング、犬との暮らしに役立つ情報をお届けします。"
      />

      <section className="mx-auto w-full max-w-6xl px-4 py-14 md:py-20">
        {/* カテゴリー絞り込み */}
        <Reveal className="mb-10">
          <nav aria-label="カテゴリー絞り込み">
            <ul className="flex flex-wrap justify-center gap-2">
              <li>
                <Link
                  href="/column"
                  className={`inline-block rounded-full px-5 py-2 text-sm font-medium transition ${
                    !activeCategory
                      ? "bg-brand text-white"
                      : "bg-surface text-ink/70 hover:text-brand"
                  }`}
                >
                  すべて
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/column?category=${encodeURIComponent(category)}`}
                    className={`inline-block rounded-full px-5 py-2 text-sm font-medium transition ${
                      activeCategory === category
                        ? "bg-brand text-white"
                        : "bg-surface text-ink/70 hover:text-brand"
                    }`}
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Reveal>

        {posts.length === 0 ? (
          <p className="py-20 text-center text-sm text-ink/60">
            記事は準備中です。公開までしばらくお待ちください。
          </p>
        ) : (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <Reveal as="li" key={post.slug} delay={Math.min(i * 0.05, 0.25)}>
                <article className="h-full">
                  <Link
                    href={`/column/${post.slug}`}
                    className="flex h-full flex-col overflow-hidden rounded-3xl border border-cocoa/10 bg-white transition hover:border-brand/40 hover:shadow-md"
                  >
                    <div className="zoom-media aspect-[16/9] overflow-hidden bg-surface">
                      <Image
                        src={post.thumbnail ?? "/images/logo/logo-full.jpg"}
                        alt=""
                        width={640}
                        height={360}
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="rounded-full bg-sagelight px-3 py-1 font-medium text-sage">
                          {post.category}
                        </span>
                        <time dateTime={post.publishedAt} className="text-ink/55">
                          {post.publishedAt.replaceAll("-", ".")}
                        </time>
                      </div>
                      <h2 className="mt-3 font-serif text-base font-semibold leading-relaxed text-cocoa md:text-lg">
                        {post.title}
                      </h2>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink/70">
                        {post.description}
                      </p>
                    </div>
                  </Link>
                </article>
              </Reveal>
            ))}
          </ul>
        )}

        {/* ページネーション */}
        {totalPages > 1 && (
          <nav aria-label="ページネーション" className="mt-12">
            <ul className="flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <li key={page}>
                  {page === currentPage ? (
                    <span
                      aria-current="page"
                      className="grid h-11 w-11 place-items-center rounded-full bg-brand text-sm font-bold text-white"
                    >
                      {page}
                    </span>
                  ) : (
                    <Link
                      href={pageHref(page)}
                      className="grid h-11 w-11 place-items-center rounded-full border border-cocoa/15 bg-white text-sm text-ink/70 transition hover:border-brand hover:text-brand"
                    >
                      {page}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </section>

      <CtaSection
        title={"読んで気になったことは、\nそのままご相談ください。"}
        message="記事の内容とうちの子の場合はどうか、写真を添えてLINEでお尋ねいただけます。"
      />
    </>
  );
}
