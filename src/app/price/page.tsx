import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageHero from "@/components/ui/PageHero";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import CtaSection from "@/components/ui/CtaSection";
import PriceTable from "@/components/ui/PriceTable";
import { OutlineLink } from "@/components/ui/Buttons";
import { carePricing } from "@/data/pricing";
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

      {/* ボディケア料金 */}
      <section className="bg-surface">
        <div className="mx-auto w-full max-w-5xl px-4 py-14 md:py-20">
          <SectionTitle label="ボディケア" title="ボディケアメニューの料金" />
          <div className="grid gap-5 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-cocoa/10 bg-white p-7">
                <h3 className="font-serif text-lg font-semibold text-cocoa">
                  {bodyConditioning.name}
                </h3>
                <p className="mt-2 text-sm text-ink/70">
                  施術時間 {bodyConditioning.duration}
                </p>
                <p className="mt-4 font-serif text-2xl font-bold text-cocoa">
                  {bodyConditioning.price.min.toLocaleString("ja-JP")}円～
                </p>
                <p className="mt-2 inline-block rounded-full bg-mimosa/30 px-4 py-1.5 text-sm font-medium text-cocoa">
                  トリミングと同日なら{" "}
                  {bodyConditioning.withTrimming.min.toLocaleString("ja-JP")}円～
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full rounded-3xl border border-cocoa/10 bg-white p-7">
                <h3 className="font-serif text-lg font-semibold text-cocoa">
                  {walkSupport.name}
                </h3>
                <p className="mt-2 text-sm text-ink/70">時間 {walkSupport.duration}</p>
                <p className="mt-4 font-serif text-2xl font-bold text-cocoa">
                  {walkSupport.price.min.toLocaleString("ja-JP")}円～
                </p>
                <p className="mt-2 text-sm text-ink/70">
                  歩き方の確認＋お散歩後の簡単なケア付き
                </p>
              </div>
            </Reveal>
          </div>
          <Reveal className="mt-6">
            <p className="text-center text-xs leading-relaxed text-ink/60 md:text-sm">
              その他のオプションや詳細は、InstagramまたはLINEにてご案内しています。
            </p>
          </Reveal>
        </div>
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
