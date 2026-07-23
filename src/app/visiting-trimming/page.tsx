import type { Metadata } from "next";
import Image from "next/image";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageHero from "@/components/ui/PageHero";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import CtaSection from "@/components/ui/CtaSection";
import JsonLd from "@/components/seo/JsonLd";
import { OutlineLink } from "@/components/ui/Buttons";
import { serviceJsonLd } from "@/lib/jsonld";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "出張トリミング｜自宅で受けられる訪問型トリミング",
  description:
    "サロンへの移動が難しいわんちゃんへ。わんnessの出張トリミングは、那覇市を中心に沖縄本島全域のご自宅へ伺う訪問型です。シニア犬、多頭飼い、車がないご家庭、他の犬が苦手な子もご相談ください。",
  alternates: { canonical: "/visiting-trimming" },
  openGraph: {
    title: "出張トリミング｜わんness",
    description:
      "慣れたご自宅で受けられる訪問型トリミング。移動が難しいわんちゃん・ご家庭もご相談ください。",
    url: "/visiting-trimming",
    images: [{ url: "/images/trimming/clipper-poodle.jpg" }],
  },
};

const suitableFor = [
  {
    title: "シニア犬と暮らしている方",
    text: "移動や待ち時間の負担を抑え、慣れた環境のまま施術できます。体調や持病について事前に伺い、無理のない内容をご相談します。",
  },
  {
    title: "車がない・送迎が難しい方",
    text: "こちらからご自宅へ伺うため、送迎は不要です。お仕事・育児・介護などで時間が取りにくい方もご利用いただきやすい形です。",
  },
  {
    title: "多頭飼いのご家庭",
    text: "複数のわんちゃんを連れての移動は大変です。ご自宅で1頭ずつ順番に、それぞれのペースでケアできます。",
  },
  {
    title: "他の犬や慣れない場所が苦手な子",
    text: "店舗型サロンと違い、ほかのわんちゃんと接触しにくい環境です。音や環境の変化に敏感な子もご相談ください。",
  },
  {
    title: "皮膚や身体の状態も見てほしい方",
    text: "出張トリミングでも、身体の左右差・可動域の確認とスキンケアを含むベーシックケアトリミングとして施術します。",
  },
  {
    title: "生活環境も含めて相談したい方",
    text: "普段過ごしているお部屋の様子を踏まえて、日常のケアや過ごし方について一緒に考えられるのは訪問型ならではです。",
  },
];

const preparations = [
  {
    title: "作業スペース",
    text: "テーブルを置ける程度のスペースをお借りする場合があります。必要な広さはご自宅の状況に合わせてご案内します。",
  },
  {
    title: "水道・電源",
    text: "シャンプーの際に浴室やお湯、ドライヤー用の電源をお借りする場合があります。具体的な条件はご予約時に確認します。",
  },
  {
    title: "駐車スペース",
    text: "お車で伺うため、駐車できる場所の有無を事前に確認させてください。有料駐車場を利用する場合は実費をご負担いただく場合があります。",
  },
];

export default function VisitingTrimmingPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: "出張トリミング",
          description:
            "那覇市を中心に沖縄本島全域のご自宅へ伺う訪問型トリミング。移動が難しいわんちゃん・ご家庭に。",
          path: "/visiting-trimming",
        })}
      />
      <Breadcrumbs
        items={[{ name: "出張トリミング", path: "/visiting-trimming" }]}
      />
      <PageHero
        title="出張トリミング"
        description="いつものお家で、いつもの安心を。那覇市を中心に沖縄本島全域のご自宅へ、わんnessが伺います。"
      />

      {/* 出張トリミングとは */}
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
        <Reveal className="zoom-media order-2 overflow-hidden rounded-[2.5rem] rounded-tr-[6rem] shadow-lg shadow-cocoa/10 md:order-1">
          <Image
            src="/images/trimming/clipper-poodle.jpg"
            alt="ご自宅でトイプードルの被毛をバリカンで整える出張トリミングの様子"
            width={1517}
            height={1081}
            sizes="(min-width: 768px) 45vw, 100vw"
            className="h-auto w-full object-cover"
          />
        </Reveal>
        <div className="order-1 md:order-2">
          <SectionTitle
            label="出張トリミングとは"
            title="ご自宅が、その子のトリミングルームに。"
            align="left"
          />
          <Reveal>
            <div className="space-y-4 text-sm leading-loose text-ink/85 md:text-base">
              <p>
                出張トリミングは、トリマーが道具を持ってご自宅へ伺い、住み慣れた環境の中で施術する訪問型のトリミングです。
              </p>
              <p>
                サロンまでの移動、車内での緊張、待ち時間、ほかの犬との接触。店舗へ行くことに伴う負担を減らせるため、シニアの子や環境の変化が苦手な子、多頭飼いのご家庭に選ばれています。
              </p>
              <p>
                わんnessの出張トリミングは、身体と皮膚の確認までを含む
                <strong className="font-semibold text-cocoa">ベーシックケアトリミング</strong>
                として行います。飼い主さまがそばで様子を見られるのも、訪問型ならではの安心です。
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* こんな方に */}
      <section className="bg-surface">
        <div className="mx-auto w-full max-w-6xl px-4 py-14 md:py-20">
          <SectionTitle
            label="おすすめの方"
            title="こんなわんちゃん・ご家庭におすすめです"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {suitableFor.map((item, i) => (
              <Reveal key={item.title} delay={Math.min(i * 0.06, 0.3)}>
                <div className="h-full rounded-3xl border border-cocoa/10 bg-white p-6">
                  <h3 className="font-serif text-base font-semibold text-cocoa md:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-loose text-ink/80">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8">
            <p className="mx-auto max-w-3xl rounded-2xl border border-sky/30 bg-skylight/50 p-5 text-center text-xs leading-relaxed text-ink/75 md:text-sm">
              すべてのわんちゃんに必ず対応できるわけではありません。年齢・体調・性格などを事前に確認し、安全に施術できるかどうかを一緒に判断させていただきます。安全を最優先し、内容の変更や中止をご提案する場合があります。
            </p>
          </Reveal>
        </div>
      </section>

      {/* ご自宅の準備 */}
      <section className="mx-auto w-full max-w-5xl px-4 py-14 md:py-20">
        <SectionTitle
          label="ご準備"
          title="ご自宅にお願いする可能性があるもの"
          description="トリミング設備がなくても大丈夫です。ご自宅の環境を事前に伺い、必要なものをご案内します。"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {preparations.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl bg-sagelight p-6">
                <h3 className="font-serif text-base font-semibold text-cocoa">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-loose text-ink/80">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 text-center">
          <p className="text-sm text-ink/70">
            対応エリアは{site.serviceArea}。出張費は那覇市内・
            {site.travelFee.baseLocation}から{site.travelFee.freeRadiusKm}km以内無料です。
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <OutlineLink href="/area">対応エリア・出張費を見る</OutlineLink>
            <OutlineLink href="/first">初めての方へ</OutlineLink>
          </div>
        </Reveal>
      </section>

      <CtaSection
        title={"移動がむずかしくても、\nあきらめなくて大丈夫。"}
        message="わんちゃんの状態やご自宅の環境を伺いながら、無理のないご利用方法をご案内します。"
      />
    </>
  );
}
