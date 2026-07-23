import Link from "next/link";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";

type Crumb = { name: string; path: string };

/** パンくずリスト（BreadcrumbList構造化データ付き） */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: "ホーム", path: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(all)} />
      <nav aria-label="パンくずリスト" className="mx-auto w-full max-w-6xl px-4 pt-4">
        <ol className="flex flex-wrap items-center gap-1 text-xs text-ink/60">
          {all.map((crumb, i) => {
            const isLast = i === all.length - 1;
            return (
              <li key={crumb.path} className="flex items-center gap-1">
                {isLast ? (
                  <span aria-current="page" className="text-ink/80">
                    {crumb.name}
                  </span>
                ) : (
                  <>
                    <Link href={crumb.path} className="transition hover:text-brand">
                      {crumb.name}
                    </Link>
                    <span aria-hidden="true">›</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
