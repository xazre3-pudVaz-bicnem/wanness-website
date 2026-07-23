import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageHero from "@/components/ui/PageHero";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import CtaSection from "@/components/ui/CtaSection";
import JsonLd from "@/components/seo/JsonLd";
import { personJsonLd } from "@/lib/jsonld";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "代表者・事業者情報｜佐々木那菜・動物取扱業登録",
  description:
    "わんness代表・佐々木那菜のプロフィールと事業者情報。犬の理学療法インストラクター師範。第一種動物取扱業（保管）登録済み（沖動保第1435号）。所在地・営業時間・連絡先を掲載しています。",
  alternates: { canonical: "/profile" },
  openGraph: {
    title: "代表者・事業者情報｜わんness",
    description:
      "代表・佐々木那菜のプロフィールと、第一種動物取扱業の登録情報をご確認いただけます。",
    url: "/profile",
    images: [{ url: "/images/trimming/bath-smile.jpg" }],
  },
};

export default function ProfilePage() {
  const business = site.animalHandlingBusiness;
  return (
    <>
      <JsonLd data={personJsonLd()} />
      <Breadcrumbs items={[{ name: "代表者・事業者情報", path: "/profile" }]} />
      <PageHero
        title="代表者・事業者情報"
        description="わんnessの代表者プロフィールと、事業者としての登録情報をご確認いただけます。"
      />

      {/* 代表者 */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14 md:py-20">
        <div className="grid items-start gap-10 md:grid-cols-[2fr_3fr]">
          <Reveal className="zoom-media mx-auto w-full max-w-sm overflow-hidden rounded-[2.5rem] rounded-tr-[6rem] shadow-lg shadow-cocoa/10">
            <Image
              src="/images/trimming/bath-smile.jpg"
              alt="わんness代表 佐々木那菜。自宅での温浴ケア中に笑顔でわんちゃんと向き合う様子"
              width={1108}
              height={1477}
              sizes="(min-width: 768px) 35vw, 100vw"
              className="h-auto w-full object-cover"
            />
          </Reveal>
          <div>
            <Reveal>
              <p className="text-sm font-medium tracking-widest text-brand">代表者</p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-cocoa">
                {site.representative.name}
              </h2>
              <p className="mt-1 text-sm text-ink/60">{site.representative.nameReading}</p>
              <div className="mt-5">
                <p className="text-xs font-semibold text-ink/60">保有資格</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {site.representative.qualifications.map((q) => (
                    <li
                      key={q}
                      className="rounded-full border border-sage/40 bg-sagelight px-4 py-1.5 text-sm font-medium text-sage"
                    >
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 space-y-4 text-sm leading-loose text-ink/85 md:text-base">
                <p>
                  わんちゃんたちも十犬十色。それぞれに生まれ持った性格、身体の個性、体質があります。
                </p>
                <p>
                  わんnessでは、その子に合ったスキンケアや身体のケアを通して、その子らしく、自然な身体で元気に過ごせることを大切にしています。
                </p>
                <p>
                  シニアの子、身体に不安のある子、トリミングが苦手な子も、まずはお気軽にご相談ください。
                </p>
              </div>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand transition hover:opacity-70"
              >
                Instagram {site.instagram.id} で日々の施術を発信しています →
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 動物取扱業登録情報 */}
      <section className="bg-surface">
        <div className="mx-auto w-full max-w-4xl px-4 py-14 md:py-20">
          <SectionTitle
            label="登録情報"
            title="第一種動物取扱業 登録情報"
            description="わんnessは、動物愛護管理法に基づく第一種動物取扱業の登録を受けて営業しています。"
          />
          <Reveal>
            <dl className="divide-y divide-cocoa/10 overflow-hidden rounded-3xl border border-cocoa/10 bg-white text-sm md:text-base">
              {[
                ["事業所の名称", business.officeName],
                ["所在地", business.address],
                ["種別", business.category],
                ["登録番号", business.registrationNumber],
                ["登録年月日", business.registrationDate],
                ["有効期限の末日", business.expirationDate],
                ["動物取扱責任者", business.manager],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[8rem_1fr] gap-4 px-6 py-4 md:grid-cols-[12rem_1fr]"
                >
                  <dt className="font-medium text-ink/60">{label}</dt>
                  <dd className="font-medium text-ink/90">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* 事業概要 */}
      <section className="mx-auto w-full max-w-4xl px-4 py-14 md:py-20">
        <SectionTitle label="事業概要" title="事業者情報" />
        <Reveal>
          <dl className="divide-y divide-cocoa/10 overflow-hidden rounded-3xl border border-cocoa/10 bg-white text-sm md:text-base">
            {[
              ["事業名", site.name],
              ["代表者", site.representative.name],
              ["所在地", site.address.full],
              ["電話番号", site.tel],
              ["営業時間", `${site.businessHours.text}（${site.businessHours.note}）`],
              ["対応エリア", site.serviceArea],
              ["事業内容", "出張トリミング、犬のボディコンディショニング、お散歩代行サポート"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="grid grid-cols-[8rem_1fr] gap-4 px-6 py-4 md:grid-cols-[12rem_1fr]"
              >
                <dt className="font-medium text-ink/60">{label}</dt>
                <dd className="text-ink/90">{value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal className="mt-6">
          <p className="rounded-2xl border border-sky/30 bg-skylight/50 p-5 text-xs leading-relaxed text-ink/75 md:text-sm">
            わんnessは出張型のサービスです。上記所在地は事業所情報であり、店舗への来店にてご利用いただくサービスではありません。また、病気の診断・治療を行う動物医療サービスではありません。
          </p>
        </Reveal>
      </section>

      <CtaSection />
    </>
  );
}
