import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageHero from "@/components/ui/PageHero";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import CtaSection from "@/components/ui/CtaSection";
import LeafDecoration from "@/components/ui/LeafDecoration";
import { OutlineLink } from "@/components/ui/Buttons";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "わんnessについて｜想い・コンセプト",
  description:
    "わんnessは沖縄県那覇市を拠点とする出張トリミング・犬のボディケアサービスです。「わんこと人が、元気に、心地よく。支え想い合って暮らせる毎日を。」を大切に、身体と皮膚の状態まで考えたケアをお届けします。",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "わんnessについて｜わんness",
    description:
      "「わんこと人が、元気に、心地よく。」出張トリミングとボディケアを通して、愛犬ちゃんの健やかな毎日を支えます。",
    url: "/about",
    images: [{ url: "/images/care/golden-back-care.jpg" }],
  },
};

const commitments = [
  {
    title: "トリミングを、健康を見つめる時間に",
    text: "わんnessのトリミングは、キレイに整えるだけの時間ではありません。カウンセリングで普段の様子を伺い、身体の左右差や関節の動かしやすさ、皮膚や被毛の状態を確認しながら進めます。トリミングの日が、愛犬ちゃんの身体を見つめ直す日になるように。",
  },
  {
    title: "自然な身体で、その子らしく",
    text: "自然療法やナチュラルケア、身体のコンディショニングという考え方を取り入れながら、その子が本来持っている自然な身体の使い方で、心地よく過ごせることを目指したケアを行います。",
  },
  {
    title: "ご家庭でのケアにつなげる",
    text: "施術後には、その日の身体や皮膚の状態を飼い主さまへ共有し、ご自宅でできる簡単なケアもお伝えしています。月に一度のトリミングだけで終わらせず、毎日の暮らしの中の健康管理につなげることを大切にしています。",
  },
];

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "わんnessについて", path: "/about" }]} />
      <PageHero
        title="わんnessについて"
        description="わんness（ワンネス）は、沖縄県那覇市を拠点に沖縄本島全域へ伺う、出張トリミング＆ボディケアサービスです。"
      />

      {/* コンセプト */}
      <section className="relative mx-auto w-full max-w-5xl px-4 py-14 md:py-20">
        <LeafDecoration className="pointer-events-none absolute right-0 top-6 hidden h-28 w-28 text-sage/40 md:block" />
        <Reveal className="text-center">
          <p className="text-sm font-medium tracking-widest text-brand">コンセプト</p>
          <p className="mt-4 font-serif text-2xl font-semibold leading-loose text-cocoa md:text-3xl md:leading-relaxed">
            わんこと人が、元気に、心地よく。
            <br />
            支え想い合って暮らせる毎日を。
          </p>
          <div className="mx-auto mt-8 max-w-3xl space-y-4 text-left text-sm leading-loose text-ink/85 md:text-base">
            <p>
              「わんness」という名前には、わんちゃんの健やかさ（wellness）を支えたいという想いを込めています。
            </p>
            <p>
              見た目を整えるだけのトリミングではなく、日々のケアを通じて愛犬ちゃんの身体・皮膚・動きの状態を確認し、飼い主さまと一緒に健康管理を支えていくこと。それが、わんnessの役割だと考えています。
            </p>
            <p>
              ブランドコピーである「犬の健康寿命を、のばしたい。」は、効果をお約束する言葉ではなく、わんnessが目指し続ける願いです。その願いのために、一頭一頭に向き合うケアを積み重ねていきます。
            </p>
          </div>
        </Reveal>
      </section>

      {/* 写真とメッセージ */}
      <section className="bg-surface">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
          <Reveal className="zoom-media overflow-hidden rounded-[2.5rem] rounded-tr-[6rem] shadow-lg shadow-cocoa/10">
            <Image
              src="/images/care/golden-back-care.jpg"
              alt="芝生の上でシニアのゴールデンレトリバーの背中へやさしく手を当てるボディケアの様子"
              width={1141}
              height={1429}
              sizes="(min-width: 768px) 45vw, 100vw"
              className="aspect-[4/3] h-auto w-full object-cover"
            />
          </Reveal>
          <div>
            <SectionTitle
              label="わんnessの考え方"
              title="動物医療とホームケアは、役割が異なります"
              align="left"
            />
            <Reveal>
              <div className="space-y-4 text-sm leading-loose text-ink/85 md:text-base">
                <p>
                  わんnessが行うのは、病気の診断や治療ではありません。動物医療と日々のホームケアは、それぞれ役割が異なります。
                </p>
                <p>
                  わんnessは日常的なケアを通じて、身体や皮膚の変化に気づくきっかけをつくり、必要なときにはかかりつけの獣医師さんへ相談していただけるようお伝えする。そんな、動物医療と毎日の暮らしの間を支える存在でありたいと考えています。
                </p>
                <p>
                  治療中のわんちゃんは、必要に応じてかかりつけの獣医師さんへご相談のうえでご利用ください。
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 大切にしていること */}
      <section className="mx-auto w-full max-w-5xl px-4 py-14 md:py-20">
        <SectionTitle label="約束" title="わんnessが大切にしていること" />
        <div className="space-y-6">
          {commitments.map((item, i) => (
            <Reveal key={item.title} delay={Math.min(i * 0.08, 0.24)}>
              <div className="rounded-3xl border border-cocoa/10 bg-white p-7 md:p-9">
                <h3 className="font-serif text-lg font-semibold text-cocoa md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-loose text-ink/85 md:text-base">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <OutlineLink href="/basic-care">ベーシックケアトリミングへ</OutlineLink>
            <OutlineLink href="/profile">代表者・事業者情報へ</OutlineLink>
          </div>
        </Reveal>
      </section>

      {/* 基本情報 */}
      <section className="bg-skylight/40">
        <div className="mx-auto w-full max-w-4xl px-4 py-14 md:py-20">
          <SectionTitle label="基本情報" title="事業概要" />
          <Reveal>
            <dl className="divide-y divide-cocoa/10 overflow-hidden rounded-3xl border border-cocoa/10 bg-white text-sm md:text-base">
              {[
                ["事業名", site.name],
                ["代表者", site.representative.name],
                ["所在地", `${site.address.full}（出張型サービスの事業所です）`],
                ["電話番号", site.tel],
                ["営業時間", `${site.businessHours.text}（${site.businessHours.note}）`],
                ["対応エリア", site.serviceArea],
              ].map(([label, value]) => (
                <div key={label} className="grid grid-cols-[7rem_1fr] gap-4 px-6 py-4 md:grid-cols-[10rem_1fr]">
                  <dt className="font-medium text-ink/60">{label}</dt>
                  <dd className="text-ink/90">{value}</dd>
                </div>
              ))}
              <div className="grid grid-cols-[7rem_1fr] gap-4 px-6 py-4 md:grid-cols-[10rem_1fr]">
                <dt className="font-medium text-ink/60">Instagram</dt>
                <dd>
                  <a
                    href={site.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-brand underline underline-offset-2 transition hover:opacity-70"
                  >
                    {site.instagram.id}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
