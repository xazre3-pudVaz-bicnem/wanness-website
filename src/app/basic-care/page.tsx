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

export const metadata: Metadata = {
  title: "ベーシックケアトリミング｜健康管理まで考えた基本コース",
  description:
    "わんnessのベーシックケアトリミングは、身体の左右差・可動域の確認、スキンケア、シャンプー・カットまでを一つの基本コースにした出張トリミングです。健康管理を考えたトリミングをお探しの方へ。那覇市を中心に沖縄本島全域へ訪問します。",
  alternates: { canonical: "/basic-care" },
  openGraph: {
    title: "ベーシックケアトリミング｜わんness",
    description:
      "見た目を整えるだけでなく、身体と皮膚の状態を確認することから始める出張型の基本コース。",
    url: "/basic-care",
    images: [{ url: "/images/trimming/ear-trim.jpg" }],
  },
};

const flow = [
  {
    title: "カウンセリング",
    text: "普段の生活の様子、気になっていること、皮膚や身体の状態、これまでのトリミング経験などを伺います。",
  },
  {
    title: "身体の左右差の確認",
    text: "立ち姿や身体の使い方を観察し、左右のバランスの違いを確認します。",
  },
  {
    title: "関節の動かしやすさ・可動域の確認",
    text: "無理のない範囲で関節の動かしやすさを確かめ、不調を感じやすい箇所がないか確認します。",
  },
  {
    title: "背筋を伸ばすやさしいケア",
    text: "背中まわりを中心に、やさしく身体を整えるケアを行います。簡単な整体・マッサージケアを含みますが、医療行為ではありません。",
  },
  {
    title: "皮膚・被毛に合わせたスキンケア",
    text: "乾燥・赤み・ベタつきなど、その日の皮膚と被毛の状態に合わせたスキンケアを選びます。",
  },
  {
    title: "シャンプー",
    text: "皮膚の状態に合わせたシャンプーで、負担の少ない洗い方を心がけます。",
  },
  {
    title: "犬種に応じたカット",
    text: "犬種やライフスタイル、ご希望に合わせてカットします。カット設定のない犬種はシャンプーコースをご利用ください。",
  },
  {
    title: "基本のお手入れ",
    text: "爪切り・耳そうじ・足裏カット・足まわりカット・肛門腺しぼりまで、基本コースに含まれています。",
  },
  {
    title: "施術後の共有・ホームケア提案",
    text: "その日の身体や皮膚の様子をお伝えし、ご自宅でできる簡単なケアをご提案します。気になる変化があった場合は、主治医への相談をおすすめすることもあります。",
  },
];

const includes = [
  "カウンセリング",
  "身体の左右差の確認",
  "関節の動かしやすさ・可動域の確認",
  "不調を感じやすい箇所の確認",
  "背筋を伸ばすためのやさしいケア",
  "簡単な整体・コンディショニングケア",
  "皮膚や被毛の状態に合わせたスキンケア",
  "シャンプー",
  "犬種に応じたカット",
  "爪切り",
  "耳そうじ",
  "足裏カット",
  "足まわりカット",
  "肛門腺しぼり",
];

export default function BasicCarePage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "ベーシックケアトリミング",
          description:
            "身体の左右差・可動域の確認、スキンケア、シャンプー・カットまでを一つの基本コースにした出張トリミング。",
          path: "/basic-care",
        })}
      />
      <Breadcrumbs items={[{ name: "ベーシックケアトリミング", path: "/basic-care" }]} />
      <PageHero
        title="ベーシックケアトリミング"
        description="見た目を整えるだけでなく、身体と皮膚の状態を確認することから始めます。"
      />

      {/* ベーシックケアとは */}
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
        <div>
          <SectionTitle
            label="ベーシックケアとは"
            title="「整えるケア」まで含めて、基本コース。"
            align="left"
          />
          <Reveal>
            <div className="space-y-4 text-sm leading-loose text-ink/85 md:text-base">
              <p>
                一般的なトリミングは、シャンプー・カット・爪切りなど「見た目を整えること」が中心です。
              </p>
              <p>
                わんnessのベーシックケアトリミングは、そこに「身体と皮膚の状態を確認し、整えること」を加えた基本コースです。ボディケアをオプションとして追加するのではなく、<strong className="font-semibold text-cocoa">身体と皮膚の状態まで考えたケアそのものが、わんnessの基本</strong>です。
              </p>
              <p>
                トリミングのたびに身体の状態を確認することで、小さな変化に気づくきっかけが生まれます。気になる変化があれば飼い主さまへ共有し、必要に応じて主治医への相談をおすすめしています。
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="zoom-media overflow-hidden rounded-[2.5rem] rounded-bl-[6rem] shadow-lg shadow-cocoa/10">
          <Image
            src="/images/trimming/ear-trim.jpg"
            alt="自宅トリミングでビションフリーゼの耳まわりをハサミで丁寧に整える様子"
            width={1108}
            height={1477}
            sizes="(min-width: 768px) 45vw, 100vw"
            className="aspect-[4/3] h-auto w-full object-cover md:aspect-auto"
          />
        </Reveal>
      </section>

      {/* コースに含まれる内容 */}
      <section className="bg-surface">
        <div className="mx-auto w-full max-w-5xl px-4 py-14 md:py-20">
          <SectionTitle
            label="コース内容"
            title="ベーシックケアトリミングに含まれるもの"
            description="以下すべてが基本コースに含まれます。"
          />
          <Reveal>
            <ul className="grid gap-2.5 sm:grid-cols-2 md:grid-cols-3">
              {includes.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 text-sm text-cocoa"
                >
                  <PawMarker tone="mimosa" size="sm" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="mt-6">
            <p className="rounded-2xl border border-sky/30 bg-skylight/50 p-5 text-xs leading-relaxed text-ink/75 md:text-sm">
              ※ベーシックケアトリミングに含まれる整体・マッサージケアは、リラクゼーションと日々の健康管理を目的としたものであり、病気やケガの診断・治療などの医療行為ではありません。治療中のわんちゃんは、必要に応じて主治医へご相談ください。
            </p>
          </Reveal>
        </div>
      </section>

      {/* 施術の流れ */}
      <section className="mx-auto w-full max-w-4xl px-4 py-14 md:py-20">
        <SectionTitle
          label="施術の流れ"
          title="当日のケアの流れ"
          description="その子の様子に合わせて、順番や時間配分を調整しながら進めます。"
        />
        <ol className="space-y-4">
          {flow.map((step, i) => (
            <Reveal as="li" key={step.title} delay={Math.min(i * 0.04, 0.2)}>
              <div className="flex gap-4 rounded-3xl border border-cocoa/10 bg-white p-6 md:gap-6 md:p-7">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand font-serif text-sm font-bold text-white md:h-11 md:w-11">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-serif text-base font-semibold text-cocoa md:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-loose text-ink/80">
                    {step.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <OutlineLink href="/price">料金表を見る</OutlineLink>
          <OutlineLink href="/flow">ご利用の流れを見る</OutlineLink>
        </Reveal>
      </section>

      <CtaSection
        title={"トリミングの日を、\n健康を見つめる日に。"}
        message="皮膚のこと、身体のこと、年齢のこと。気になっていることを、そのままお聞かせください。"
      />
    </>
  );
}
