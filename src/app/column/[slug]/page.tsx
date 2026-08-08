import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Reveal from "@/components/ui/Reveal";
import CtaSection from "@/components/ui/CtaSection";
import JsonLd from "@/components/seo/JsonLd";
import { articleJsonLd } from "@/lib/jsonld";
import { getAllPosts, getPostBySlug, getRelatedPosts } from "@/lib/column";
import { site } from "@/config/site";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/column/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `/column/${post.slug}`,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      images: post.thumbnail ? [{ url: post.thumbnail }] : undefined,
    },
  };
}

export default async function ColumnDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);

  return (
    <>
      <JsonLd
        data={articleJsonLd({
          title: post.title,
          description: post.description,
          slug: post.slug,
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt,
          thumbnail: post.thumbnail,
        })}
      />
      <Breadcrumbs
        items={[
          { name: "コラム", path: "/column" },
          { name: post.title, path: `/column/${post.slug}` },
        ]}
      />

      <article className="mx-auto w-full max-w-3xl px-4 py-10 md:py-16">
        <Reveal>
          <header>
            <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm">
              <Link
                href={`/column?category=${encodeURIComponent(post.category)}`}
                className="rounded-full bg-sagelight px-3.5 py-1 font-medium text-sage transition hover:opacity-80"
              >
                {post.category}
              </Link>
              <time dateTime={post.publishedAt} className="text-ink/55">
                公開日 {post.publishedAt.replaceAll("-", ".")}
              </time>
              {post.updatedAt && post.updatedAt !== post.publishedAt && (
                <time dateTime={post.updatedAt} className="text-ink/55">
                  更新日 {post.updatedAt.replaceAll("-", ".")}
                </time>
              )}
            </div>
            <h1 className="mt-4 font-serif text-2xl font-semibold leading-relaxed text-cocoa md:text-3xl">
              {post.title}
            </h1>
            <p className="mt-3 text-sm leading-loose text-ink/70 md:text-base">
              {post.description}
            </p>
          </header>

          {post.thumbnail && (
            <div className="mt-8 overflow-hidden rounded-3xl">
              <Image
                src={post.thumbnail}
                alt=""
                width={1200}
                height={675}
                sizes="(min-width: 768px) 48rem, 100vw"
                className="h-auto w-full object-cover"
                priority
              />
            </div>
          )}

          {/* 目次 */}
          {post.toc.length > 1 && (
            <nav
              aria-label="目次"
              className="mt-8 rounded-3xl border border-cocoa/10 bg-surface p-6"
            >
              <p className="font-serif text-sm font-semibold text-cocoa">目次</p>
              <ol className="mt-3 space-y-1.5 text-sm">
                {post.toc.map((item) => (
                  <li
                    key={item.id}
                    className={item.depth === 3 ? "pl-4" : undefined}
                  >
                    <a
                      href={`#${item.id}`}
                      className="text-ink/75 transition hover:text-brand"
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}

          <div
            className="prose-column mt-8 leading-loose"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {/* タグ */}
          {post.tags.length > 0 && (
            <ul className="mt-10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-surface px-3.5 py-1.5 text-xs text-ink/70"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          )}

          {/* 執筆者 */}
          <div className="mt-10 flex items-center gap-4 rounded-3xl border border-cocoa/10 bg-white p-6">
            <Image
              src="/images/logo/logo-mark.jpg"
              alt=""
              width={64}
              height={64}
              className="h-16 w-16 shrink-0 rounded-full object-cover"
            />
            <div>
              <p className="text-xs text-ink/55">執筆</p>
              <p className="font-serif text-base font-semibold text-cocoa">
                {post.author}（{site.name} 代表）
              </p>
              <p className="mt-1 text-xs leading-relaxed text-ink/70">
                {site.representative.qualifications.join("／")}。
                那覇市を拠点に出張トリミングとボディケアを行っています。
              </p>
            </div>
          </div>

          <p className="mt-6 rounded-2xl border border-sky/30 bg-skylight/40 p-5 text-xs leading-relaxed text-ink/70">
            本記事は一般的な情報提供を目的としたもので、病気の診断・治療に代わるものではありません。愛犬ちゃんの体調に不安があるときは、かかりつけの動物病院へご相談ください。
          </p>
        </Reveal>
      </article>

      {/* 関連記事 */}
      {related.length > 0 && (
        <section className="bg-surface">
          <div className="mx-auto w-full max-w-5xl px-4 py-14 md:py-16">
            <h2 className="mb-8 text-center font-serif text-xl font-semibold text-cocoa md:text-2xl">
              関連記事
            </h2>
            <ul className="grid gap-5 sm:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/column/${item.slug}`}
                    className="flex h-full flex-col overflow-hidden rounded-3xl border border-cocoa/10 bg-white transition hover:border-brand/40 hover:shadow-md"
                  >
                    <div className="aspect-[16/9] overflow-hidden bg-skylight/40">
                      <Image
                        src={item.thumbnail ?? "/images/logo/logo-full.jpg"}
                        alt=""
                        width={480}
                        height={270}
                        sizes="(min-width: 640px) 30vw, 100vw"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-sage">{item.category}</p>
                      <p className="mt-1.5 font-serif text-sm font-semibold leading-relaxed text-cocoa">
                        {item.title}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 text-center">
              <Link
                href="/column"
                className="text-sm font-medium text-brand transition hover:opacity-70"
              >
                コラム一覧へ戻る →
              </Link>
            </div>
          </div>
        </section>
      )}

      <CtaSection />
    </>
  );
}
