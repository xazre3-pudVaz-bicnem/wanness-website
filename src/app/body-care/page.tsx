import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageHero from "@/components/ui/PageHero";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import CtaSection from "@/components/ui/CtaSection";
import JsonLd from "@/components/seo/JsonLd";
import { OutlineLink } from "@/components/ui/Buttons";
import { PawMarker } from "@/components/ui/PawIcon";
import { serviceJsonLd } from "@/lib/jsonld";
import { carePricing } from "@/data/pricing";

export const metadata: Metadata = {
  title: "ボディケア・ボディコンディショニング｜シニア犬の身体ケア",
  description:
    "シニア犬や、歩き方・姿勢・身体の左右差が気になる子へ。わんnessのボディコンディショニングは30分3,500円～、トリミングと同日は2,500円～。お散歩代行サポートも。那覇市を中心に沖縄本島全域へ出張します。",
  alternates: { canonical: "/body-care" },
  openGraph: {
    title: "ボディケア・ボディコンディショニング｜わんness",
    description:
      "シニア犬や身体の使い方が気になる子に向けた、日常的な身体のコンディショニング。",
    url: "/body-care",
    images: [{ url: "/images/care/golden-back-care.jpg" }],
  },
};

const conditioningFor = [
  "シニア犬",
  "以前より動く時間が減った子",
  "身体の左右差が気になる子",
  "歩き方や姿勢が気になる子",
  "身体のこわばりが気になる子",
  "元気なうちから予防的なメンテナンスをしたい子",
  "日常的な身体ケアを取り入れたい子",
];

export default function BodyCarePage() {
  const { bodyConditioning, walkSupport } = carePricing;
  return (
    <>
      <JsonLd
        data={[
          serviceJsonLd({
            name: "ボディコンディショニング",
            description:
              "シニア犬や身体の使い方が気になる子に向けた、日常的な身体のコンディショニングケア。30分3,500円～。",
            path: "/body-care",
          }),
          serviceJsonLd({
            name: "お散歩代行サポート",
            description:
              "歩き方や身体の使い方を確認しながらのお散歩と、終了後に身体を緩めて整える簡単なケア。30分＋ケアで3,500円～。",
            path: "/body-care",
          }),
        ]}
      />
      <Breadcrumbs items={[{ name: "ボディケア", path: "/body-care" }]} />
      <PageHero
        title="ボディケア"
        description="その子らしく、自然な身体で元気に過ごすために。シニア犬や、歩き方・姿勢が気になる子の日常的な身体のケアを行います。"
      />

      {/* ボディコンディショニング */}
      <section className="mx-auto w-full max-w-6xl px-4 py-14 md:py-20">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <SectionTitle
              label="メニュー 1"
              title="ボディコンディショニング"
              align="left"
            />
            <Reveal>
              <div className="space-y-4 text-sm leading-loose text-ink/85 md:text-base">
                <p>
                  シニア犬や、身体の使い方が気になる子に向けた、日常的な身体のコンディショニングです。
                </p>
                <p>
                  身体の左右差や関節の動かしやすさを確認しながら、背筋を伸ばすやさしいケアや、緊張しやすい箇所を緩めるケアを、その子のペースに合わせて行います。
                </p>
                <p>
                  犬の理学療法インストラクター師範の学びを土台にしたケアですが、病気やケガの診断・治療・医療リハビリではありません。治療中の子は、必要に応じて獣医師さんへのご相談をおすすめしております。
                </p>
              </div>
              <div className="mt-6 overflow-hidden rounded-2xl border border-cocoa/10 bg-white">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">
                    ボディコンディショニング 体重別料金表（30分）
                  </caption>
                  <tbody>
                    {bodyConditioning.tiers.map((tier) => (
                      <tr key={tier.weight} className="border-b border-cocoa/10 last:border-b-0">
                        <th scope="row" className="px-4 py-3 font-medium text-cocoa md:px-5">
                          {tier.label}
                          <span className="ml-1.5 text-xs font-normal text-ink/60">
                            {tier.weight}
                          </span>
                        </th>
                        <td className="px-2 py-3 text-xs text-ink/60">
                          {bodyConditioning.duration}
                        </td>
                        <td className="px-4 py-3 text-right font-semibold tabular-nums text-cocoa md:px-5">
                          {tier.price.toLocaleString("ja-JP")}円
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3 rounded-2xl bg-mimosa/25 p-4 text-center text-sm font-medium text-cocoa">
                トリミングと同日のご利用なら、上記から{" "}
                <span className="font-serif text-lg font-bold text-brand">
                  {bodyConditioning.sameDayDiscount.toLocaleString("ja-JP")}円OFF
                </span>
                （{bodyConditioning.withTrimming.min.toLocaleString("ja-JP")}円～）
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="zoom-media overflow-hidden rounded-[2.5rem] rounded-bl-[6rem] shadow-lg shadow-cocoa/10">
            <Image
              src="/images/care/golden-relax.jpg"
              alt="芝生の上でリラックスして横になるゴールデンレトリバーへのボディコンディショニング"
              width={873}
              height={1882}
              sizes="(min-width: 768px) 45vw, 100vw"
              className="aspect-[4/5] h-auto w-full object-cover object-center"
            />
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <div className="rounded-3xl border border-cocoa/10 bg-white p-7 md:p-9">
            <h3 className="font-serif text-lg font-semibold text-cocoa">
              こんな子におすすめです
            </h3>
            <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
              {conditioningFor.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm md:text-base">
                  <PawMarker tone="sage" size="sm" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* お散歩代行サポート */}
      <section id="walk-support" className="bg-surface">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <Reveal className="zoom-media overflow-hidden rounded-[2.5rem] rounded-tr-[6rem] shadow-lg shadow-cocoa/10">
            <Image
              src="/images/care/golden-stretch.jpg"
              alt="お散歩の後にゴールデンレトリバーの前足をやさしく支えて身体を確認する様子"
              width={1142}
              height={1476}
              sizes="(min-width: 768px) 45vw, 100vw"
              className="aspect-[4/3] h-auto w-full object-cover"
            />
          </Reveal>
          <div>
            <SectionTitle label="メニュー 2" title="お散歩代行サポート" align="left" />
            <Reveal>
              <div className="space-y-4 text-sm leading-loose text-ink/85 md:text-base">
                <p>
                  歩き方や身体の使い方を確認しながらお散歩し、終了後に身体を緩めて整える簡単なケアを行います。
                </p>
                <p>
                  ただ歩くだけのお散歩代行ではなく、歩幅や姿勢、左右のバランスに目を向けながら歩くのが、わんnessのお散歩代行サポートです。気づいたことは飼い主さまへ共有します。
                </p>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-mimosa/25 p-5 text-center">
                  <p className="text-xs text-ink/70">時間</p>
                  <p className="mt-1 font-serif text-xl font-bold text-cocoa">
                    {walkSupport.duration}
                  </p>
                </div>
                <div className="rounded-2xl bg-mimosa/25 p-5 text-center">
                  <p className="text-xs text-ink/70">料金</p>
                  <p className="mt-1 font-serif text-xl font-bold text-cocoa">
                    {walkSupport.price.min.toLocaleString("ja-JP")}円～
                  </p>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-ink/60 md:text-sm">
                ※ご利用条件（鍵のお預かり、悪天候時の対応など）の詳細は、お問い合わせください。
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 注意事項 */}
      <section className="mx-auto w-full max-w-4xl px-4 py-14 md:py-20">
        <Reveal>
          <div className="rounded-3xl border border-sky/30 bg-skylight/50 p-7 md:p-9">
            <h2 className="font-serif text-lg font-semibold text-cocoa md:text-xl">
              ボディケアをご利用いただく前に
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm leading-loose text-ink/85 md:text-base">
              <li className="flex gap-2.5">
                <span aria-hidden="true" className="text-sky">・</span>
                ボディコンディショニング・お散歩後のケアは、病気やケガの診断、治療、医療リハビリではありません。
              </li>
              <li className="flex gap-2.5">
                <span aria-hidden="true" className="text-sky">・</span>
                日常的なケアを通じて、身体の変化に気づくきっかけをつくることを目的としています。
              </li>
              <li className="flex gap-2.5">
                <span aria-hidden="true" className="text-sky">・</span>
                治療中・通院中のわんちゃんは、事前に状態をお知らせください。必要に応じてかかりつけの獣医師さんへの確認をお願いする場合があります。
              </li>
              <li className="flex gap-2.5">
                <span aria-hidden="true" className="text-sky">・</span>
                当日の体調や様子によっては、内容の変更・中止をご提案する場合があります。
              </li>
            </ul>
          </div>
        </Reveal>
        <Reveal className="mt-8 text-center">
          <OutlineLink href="/price">料金案内を見る</OutlineLink>
        </Reveal>
      </section>

      <CtaSection
        title={"歩き方や姿勢の「あれ？」を、\nそのままにしないために。"}
        message="最近の様子や気になっている変化を、写真や動画と一緒にLINEでお送りいただくこともできます。"
      />
    </>
  );
}
