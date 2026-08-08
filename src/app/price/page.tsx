import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageHero from "@/components/ui/PageHero";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import CtaSection from "@/components/ui/CtaSection";
import PriceTable from "@/components/ui/PriceTable";
import { OutlineLink } from "@/components/ui/Buttons";
import { PawMarker } from "@/components/ui/PawIcon";
import { carePricing, optionPricing } from "@/data/pricing";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "料金案内｜出張トリミング・ボディケアの料金表",
  description:
    "わんnessの出張トリミング料金表。ベーシックケアトリミングはロングチワワ7,500円～、トイ・プードル9,000円～など犬種別に掲載。ボディコンディショニング30分3,500円～。那覇市内・牧志2丁目から5km以内は出張費無料です。",
  alternates: { canonical: "/price" },
  openGraph: {
    title: "料金案内｜わんness",
    description:
      "ベーシックケアトリミングの犬種別料金と、ボディケア・お散歩代行サポート、出張費のご案内。",
    url: "/price",
    images: [{ url: "/images/flyer/price-table.jpg" }],
  },
};

export default function PricePage() {
  const { bodyConditioning, walkSupport } = carePricing;
  return (
    <>
      <Breadcrumbs items={[{ name: "料金案内", path: "/price" }]} />
      <PageHero
        title="料金案内"
        description="すべてのコースに、カウンセリング・身体の状態確認・スキンケアを含みます。安さではなく、その子に合ったケアの内容で選んでいただけるよう、料金の考え方も含めてご案内します。"
      />

      {/* トリミング料金 */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14 md:py-20">
        <SectionTitle
          label="ベーシックケアトリミング"
          title="犬種別 料金表"
          description="シャンプーコース・カットコースのどちらにも、身体の左右差の確認・背筋のばし・スキンケア・爪切り・耳そうじ・足裏／足まわりカット・肛門腺しぼりが含まれます。"
        />
        <Reveal>
          <PriceTable />
        </Reveal>
      </section>

      {/* オプションコース */}
      <section id="options" className="bg-surface">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 md:py-20">
          <SectionTitle
            label="オプション"
            title="トリミングに追加できるオプションコース"
            description={optionPricing.note}
          />
          <div className="grid gap-5 md:grid-cols-3">
            {optionPricing.options.map((option, i) => (
              <Reveal key={option.code} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-3xl border border-cocoa/10 bg-white p-7">
                  <p className="flex items-baseline gap-2">
                    <span className="grid h-9 w-9 shrink-0 -translate-y-0.5 place-items-center self-center rounded-full bg-brand font-serif text-sm font-bold text-white">
                      {option.code === "A＆B" ? "＋" : option.code}
                    </span>
                    <span className="font-serif text-lg font-semibold text-cocoa">
                      {option.code === "A＆B" ? "A＆B " : ""}
                      {option.name}
                    </span>
                  </p>
                  <p className="mt-2 text-sm font-medium text-brand">{option.catch}</p>
                  <p className="mt-3 text-sm leading-loose text-ink/80">
                    {option.description}
                  </p>
                  <div className="mt-4">
                    <p className="text-xs font-semibold text-ink/60">こんな子におすすめ</p>
                    <ul className="mt-2 space-y-1.5">
                      {option.recommendedFor.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-xs leading-relaxed text-ink/80 md:text-sm">
                          <PawMarker tone={option.tone} size="sm" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="mt-auto pt-5 font-serif text-2xl font-bold text-cocoa">
                    {option.price.min.toLocaleString("ja-JP")}円～
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6">
            <p className="mx-auto max-w-3xl rounded-2xl border border-sky/30 bg-skylight/50 p-5 text-center text-xs leading-relaxed text-ink/75 md:text-sm">
              {optionPricing.disclaimer}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ボディケア料金 */}
      <section className="mx-auto w-full max-w-5xl px-4 py-14 md:py-20">
        <SectionTitle
          label="ボディケア"
          title="ボディケアメニューの料金"
          description="ボディコンディショニング単体での出張のご利用は、体重に応じた料金です。"
        />
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-cocoa/10 bg-white">
            <table className="w-full text-left text-sm md:text-base">
              <caption className="sr-only">
                ボディコンディショニング 体重別料金表（30分）
              </caption>
              <thead>
                <tr className="bg-surface text-sm text-cocoa">
                  <th scope="col" className="px-5 py-3.5 font-semibold md:px-6">
                    体格・体重
                  </th>
                  <th scope="col" className="px-5 py-3.5 font-semibold md:px-6">
                    時間
                  </th>
                  <th scope="col" className="px-5 py-3.5 font-semibold md:px-6">
                    料金
                  </th>
                </tr>
              </thead>
              <tbody>
                {bodyConditioning.tiers.map((tier) => (
                  <tr key={tier.weight} className="border-t border-cocoa/10">
                    <th scope="row" className="px-5 py-3.5 font-medium text-cocoa md:px-6">
                      {tier.label}
                      <span className="ml-1.5 text-xs font-normal text-ink/60 md:text-sm">
                        {tier.weight}
                      </span>
                    </th>
                    <td className="px-5 py-3.5 md:px-6">{bodyConditioning.duration}</td>
                    <td className="px-5 py-3.5 font-semibold tabular-nums text-cocoa md:px-6">
                      {tier.price.toLocaleString("ja-JP")}円
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 rounded-2xl bg-mimosa/25 p-4 text-center text-sm font-medium text-cocoa">
            トリミングと同日のご利用なら、上記から
            <span className="font-serif text-lg font-bold text-brand">
              {bodyConditioning.sameDayDiscount.toLocaleString("ja-JP")}円OFF
            </span>
          </p>
        </Reveal>
        <Reveal className="mt-6">
          <div className="rounded-3xl border border-cocoa/10 bg-white p-7">
            <h3 className="font-serif text-lg font-semibold text-cocoa">
              {walkSupport.name}
            </h3>
            <p className="mt-2 text-sm text-ink/70">
              時間 {walkSupport.duration}／歩き方の確認＋お散歩後の簡単なケア付き
            </p>
            <p className="mt-3 font-serif text-2xl font-bold text-cocoa">
              {walkSupport.price.min.toLocaleString("ja-JP")}円～
            </p>
          </div>
        </Reveal>
        <Reveal className="mt-6">
          <p className="text-center text-xs leading-relaxed text-ink/60 md:text-sm">
            その他のオプションや詳細は、InstagramまたはLINEにてご案内しています。
          </p>
        </Reveal>
      </section>

      {/* 出張費 */}
      <section className="mx-auto w-full max-w-5xl px-4 py-14 md:py-20">
        <SectionTitle
          label="出張費"
          title="出張費のご案内"
          description={`${site.travelFee.freeArea}と${site.travelFee.baseLocation}から${site.travelFee.freeRadiusKm}km以内は無料。超えた分は1kmにつき${site.travelFee.perKmYen}円です。`}
        />
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-cocoa/10 bg-white">
            <table className="w-full text-left text-sm md:text-base">
              <caption className="sr-only">出張費の料金表</caption>
              <tbody>
                <tr className="border-b border-cocoa/10">
                  <th scope="row" className="px-6 py-4 font-medium text-cocoa">
                    {site.travelFee.freeArea}
                  </th>
                  <td className="px-6 py-4 font-bold text-brand">無料</td>
                </tr>
                <tr className="border-b border-cocoa/10">
                  <th scope="row" className="px-6 py-4 font-medium text-cocoa">
                    {site.travelFee.baseLocation}から{site.travelFee.freeRadiusKm}km以内
                  </th>
                  <td className="px-6 py-4 font-bold text-brand">無料</td>
                </tr>
                <tr>
                  <th scope="row" className="px-6 py-4 font-medium text-cocoa">
                    {site.travelFee.freeRadiusKm}kmを超える距離
                  </th>
                  <td className="px-6 py-4 font-bold text-cocoa">
                    1kmにつき{site.travelFee.perKmYen}円
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-5 rounded-2xl bg-surface p-6 text-sm leading-loose text-ink/85">
            <p className="font-semibold text-cocoa">計算例</p>
            <p className="mt-1">{site.travelFee.example}となります。</p>
            <p className="mt-2 text-xs text-ink/60">※{site.travelFee.note}</p>
          </div>
        </Reveal>
        <Reveal className="mt-8 text-center">
          <OutlineLink href="/area">対応エリアの詳細を見る</OutlineLink>
        </Reveal>
      </section>

      {/* 料金についての補足・チラシ */}
      <section className="bg-skylight/40">
        <div className="mx-auto w-full max-w-5xl px-4 py-14 md:py-20">
          <SectionTitle label="補足" title="料金についてのご案内" />
          <Reveal>
            <ul className="space-y-2.5 rounded-3xl border border-cocoa/10 bg-white p-7 text-sm leading-loose text-ink/85 md:p-9 md:text-base">
              <li className="flex gap-2.5">
                <span aria-hidden="true" className="text-brand">・</span>
                料金表は目安です。大きさ・毛量・毛玉・抜け毛・状態・性格・施術内容などにより前後する場合があります。
              </li>
              <li className="flex gap-2.5">
                <span aria-hidden="true" className="text-brand">・</span>
                正確なお見積りは、犬種・年齢・毛量・ご住所などを伺ったうえで、ご予約時にご案内します。
              </li>
              <li className="flex gap-2.5">
                <span aria-hidden="true" className="text-brand">・</span>
                お支払い方法は、ご予約時にご確認ください。
              </li>
            </ul>
          </Reveal>
          <Reveal className="mt-8">
            <details className="group mx-auto max-w-2xl rounded-3xl border border-cocoa/10 bg-white p-6">
              <summary className="cursor-pointer text-center text-sm font-medium text-cocoa transition hover:text-brand">
                配布中の料金表（画像）を見る
              </summary>
              <div className="mt-5">
                <Image
                  src="/images/flyer/price-table.jpg"
                  alt="わんness ベーシックケアトリミング犬種別料金表のチラシ画像"
                  width={1024}
                  height={1536}
                  sizes="(min-width: 768px) 40rem, 100vw"
                  className="mx-auto h-auto w-full max-w-md rounded-2xl"
                />
              </div>
            </details>
          </Reveal>
        </div>
      </section>

      <CtaSection
        title={"うちの子の場合はいくら？\nお気軽にお尋ねください。"}
        message="犬種・年齢・毛の状態・お住まいの地域をお知らせいただければ、料金と出張費の目安をご案内します。"
      />
    </>
  );
}
