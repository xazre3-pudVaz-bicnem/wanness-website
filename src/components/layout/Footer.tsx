import Link from "next/link";
import Image from "next/image";
import { allPages } from "@/data/navigation";
import { site } from "@/config/site";

export default function Footer() {
  const business = site.animalHandlingBusiness;
  return (
    <footer className="border-t border-cocoa/10 bg-white">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          {/* 事業情報 */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/images/logo/logo-mark.jpg"
                alt="わんnessのロゴ"
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover"
              />
              <span className="flex flex-col leading-tight">
                <span className="font-serif text-xl font-bold text-cocoa">
                  わんness
                </span>
                <span className="text-xs text-ink/60">
                  出張トリミング＆ボディケア
                </span>
              </span>
            </Link>
            <dl className="mt-5 space-y-1.5 text-sm text-ink/80">
              <div className="flex gap-3">
                <dt className="shrink-0 text-ink/50">所在地</dt>
                <dd>{site.address.full}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="shrink-0 text-ink/50">電話</dt>
                <dd>
                  <a href={site.telLink} className="transition hover:text-brand">
                    {site.tel}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="shrink-0 text-ink/50">営業時間</dt>
                <dd>
                  {site.businessHours.text}
                  <span className="block text-xs text-ink/60">
                    {site.businessHours.note}
                  </span>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="shrink-0 text-ink/50">対応エリア</dt>
                <dd>{site.serviceArea}</dd>
              </div>
            </dl>
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-ink/80 transition hover:text-brand"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
                <circle cx="12" cy="12" r="4.5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              Instagram {site.instagram.id}
            </a>
          </div>

          {/* サイトマップ */}
          <nav aria-label="フッターナビゲーション">
            <p className="mb-3 text-sm font-semibold text-cocoa">サイトメニュー</p>
            <ul className="grid grid-cols-1 gap-1.5 text-sm">
              {allPages.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="text-ink/70 transition hover:text-brand"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 動物取扱業登録 */}
          <div>
            <p className="mb-3 text-sm font-semibold text-cocoa">{business.label}</p>
            <dl className="space-y-1.5 rounded-2xl bg-surface p-5 text-sm leading-relaxed text-ink/85">
              <div>
                <dt className="text-xs text-ink/55">事業所の名称</dt>
                <dd>{business.officeName}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink/55">所在地</dt>
                <dd>{business.address}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink/55">種別</dt>
                <dd>{business.category}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink/55">登録番号</dt>
                <dd>{business.registrationNumber}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink/55">登録年月日</dt>
                <dd>{business.registrationDate}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink/55">有効期限の末日</dt>
                <dd>{business.expirationDate}</dd>
              </div>
              <div>
                <dt className="text-xs text-ink/55">動物取扱責任者</dt>
                <dd>{business.manager}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-10 border-t border-cocoa/10 pt-6 text-center">
          <p className="text-xs leading-relaxed text-ink/60">
            わんnessは出張型のサービスです。上記所在地は事業所情報であり、店舗への来店にてご利用いただくサービスではありません。
            <br />
            当サービスは病気の診断・治療を行う動物医療サービスではありません。
          </p>
          <p className="mt-3 text-xs text-ink/50">
            &copy; {new Date().getFullYear()} わんness
          </p>
        </div>
      </div>
      {/* スマートフォン下部固定ボタンと重ならないための余白 */}
      <div className="h-16 md:hidden" aria-hidden="true" />
    </footer>
  );
}
