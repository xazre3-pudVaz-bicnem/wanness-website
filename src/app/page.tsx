import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import LeafDecoration from "@/components/ui/LeafDecoration";
import { PawMarker } from "@/components/ui/PawIcon";
import FaqList from "@/components/ui/FaqList";
import JsonLd from "@/components/seo/JsonLd";
import { WaveBottom } from "@/components/ui/PageHero";
import { LineButton, OutlineLink, TelButton } from "@/components/ui/Buttons";
import { itemListJsonLd } from "@/lib/jsonld";
import { site, siteUrl } from "@/config/site";
import { services } from "@/data/services";
import { featuredFaq } from "@/data/faq";
import { priceRows, formatPrice } from "@/data/pricing";

export const metadata: Metadata = {
  title: {
    absolute: "那覇市の出張トリミング・犬のボディケア｜わんness",
  },
  description:
    "沖縄県那覇市を中心に沖縄本島へ訪問する、わんnessの出張トリミング。身体の左右差や動かしやすさを確認し、スキンケアとボディケアを取り入れたベーシックケアトリミングを提供しています。シニア犬や外出が難しいわんちゃんもご相談ください。",
  keywords: [
    "那覇 出張トリミング",
    "沖縄 出張トリミング",
    "沖縄 訪問トリミング",
    "那覇 トリミング",
    "沖縄 シニア犬 トリミング",
    "沖縄 犬 ボディケア",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "那覇市の出張トリミング・犬のボディケア｜わんness",
    description:
      "身体の左右差や動かしやすさを確認し、スキンケアとボディケアを取り入れた出張型のベーシックケアトリミング。那覇市を中心に沖縄本島全域へ訪問します。",
    url: "/",
    images: [{ url: "/images/care/golden-check.jpg", width: 1163, height: 1163 }],
  },
};

const worries = [
  "高齢になり、サロンまで連れて行くのが心配",
  "車がなく、店舗への移動が難しい",
  "他の犬や慣れない環境が苦手",
  "皮膚の乾燥や赤みが気になる",
  "最近、歩き方や姿勢が変わった気がする",
  "トリミングと一緒に身体のケアも相談したい",
  "多頭飼いで移動の負担が大きい",
  "忙しく、送迎の時間が取れない",
];

const visitingBenefits = [
  {
    title: "慣れた自宅で受けられる",
    text: "いつもの環境のまま施術できるため、わんちゃんの緊張をやわらげやすくなります。",
  },
  {
    title: "移動による負担を抑えられる",
    text: "車移動や待ち時間がなく、シニアの子や外出が苦手な子の負担を減らせます。",
  },
  {
    title: "他の犬と接触しにくい",
    text: "店舗型サロンと違い、ほかのわんちゃんとの接触を避けられるため、ストレスやノミ・ダニ、感染症のリスク低減につながります。",
  },
  {
    title: "施術の様子を確認しやすい",
    text: "飼い主さまがそばで様子を見守れるので、初めてでも安心してご利用いただけます。",
  },
  {
    title: "生活環境も踏まえて相談できる",
    text: "お困りであれば、普段過ごしているお部屋や床の状態なども見ながら、日常のケアをご提案できます。",
  },
  {
    title: "外出が難しいご家庭も相談しやすい",
    text: "育児・介護・お仕事などで時間の取りにくい方も、ご自宅で完結します。",
  },
];

const values = [
  "その子のペースを優先する",
  "性格・年齢・体質・犬種だけで一括りにしない",
  "皮膚や全身の状態を確認する",
  "その子の状態に合わせ、健康につながるよう調整しながら施術する",
  "飼い主さまとの会話を大切にし、わんちゃんとご家族にとってのベストスタイルを一緒に探す",
  "継続的なホームケアを通して、飼い主さまとわんちゃんが最高のパートナーであり続けられるようサポートする",
];

const instagramTopics = [
  "施術の様子",
  "トリミング事例",
  "健康ケア情報",
  "スキンケア情報",
  "ボディケア",
  "犬との暮らしに役立つ情報",
];

const instagramGrid = [
  { src: "/images/trimming/after-mix.jpg", alt: "トリミング後にリボンを付けたミックス犬" },
  { src: "/images/trimming/bath-smile.jpg", alt: "自宅での温浴ケア中のビションフリーゼと笑顔のトリマー" },
  { src: "/images/care/golden-back-care.jpg", alt: "ゴールデンレトリバーへのボディケアの様子" },
  { src: "/images/trimming/comb-bichon.jpg", alt: "コームで毛並みを整えるトリミングの様子" },
  { src: "/images/care/golden-stretch.jpg", alt: "犬の前足をやさしく支えて動きを確認する様子" },
  { src: "/images/trimming/clipper-poodle.jpg", alt: "バリカンで足まわりを整えるトリミングの様子" },
];

export default function HomePage() {
  const featuredPrices = priceRows.filter((row) => row.featured);

  return (
    <>
      <JsonLd
        data={itemListJsonLd({
          name: "わんnessのサービス",
          items: services.map((s) => ({
            name: s.name,
            url: `${siteUrl}${s.href.split("#")[0]}`,
          })),
        })}
      />

      {/* ===== ファーストビュー（全面写真） ===== */}
      <section className="relative -mt-16 flex h-[86svh] max-h-[920px] min-h-[540px] items-end overflow-hidden md:-mt-20 md:h-[88vh] md:min-h-[620px]">
        <Image
          src="/hero.png"
          alt="トリミングを終えてタオルの上でくつろぐトイプードル"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center] md:object-[center_40%]"
        />
        {/* 文字の可読性を保つ、下からのクリーム色のグラデーション（明るい世界観を維持） */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-cream via-cream/45 to-transparent md:via-cream/25"
        />
        <div className="relative mx-auto w-full max-w-6xl px-4 pb-10 md:pb-16">
          <Reveal>
            <p className="text-xs font-medium tracking-[0.25em] text-cocoa/70 md:text-sm">
              わんness｜出張トリミング＆ボディケア
            </p>
            <h1 className="mt-4 font-serif text-[1.85rem] font-bold leading-snug text-cocoa md:mt-5 md:text-5xl md:leading-snug">
              キレイにするだけじゃない。
              <br />
              お家で&ldquo;整えるケア&rdquo;を。
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-loose text-ink/80 md:mt-5 md:text-base">
              那覇市を中心に沖縄本島全域へ訪問。
              <br className="md:hidden" />
              身体と皮膚の状態まで考えた出張トリミングです。
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== ブランドメッセージ ===== */}
      <section className="relative bg-surface">
        <div className="mx-auto w-full max-w-4xl px-4 py-16 text-center md:py-24">
          <Reveal>
            <p className="font-serif text-xl font-semibold leading-loose text-cocoa md:text-3xl md:leading-relaxed">
              わんこと人が、元気に、心地よく。
              <br />
              支え想い合って暮らせる毎日を。
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-sm leading-loose text-ink/80 md:text-base">
              見た目の美しさだけではなく、皮膚や身体の状態にも目を向けながら、
              愛犬の健やかな毎日を支えるケアをお届けします。
            </p>
          </Reveal>
        </div>
        <WaveBottom />
      </section>

      {/* ===== こんなお悩みはありませんか ===== */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
        <SectionTitle
          label="お悩み"
          title="こんなお悩みはありませんか？"
        />
        <ul className="grid gap-3 sm:grid-cols-2">
          {worries.map((worry, i) => (
            <Reveal as="li" key={worry} delay={Math.min(i * 0.05, 0.35)}>
              <div className="flex h-full items-center gap-3.5 rounded-2xl border border-cocoa/10 bg-white py-4 pl-4 pr-5 text-sm leading-relaxed transition-shadow duration-300 hover:shadow-sm md:gap-4 md:pl-5 md:text-base">
                <PawMarker />
                <span className="flex-1">{worry}</span>
              </div>
            </Reveal>
          ))}
        </ul>
        <Reveal className="mt-10 text-center">
          <p className="font-serif text-lg font-semibold text-cocoa md:text-2xl">
            いつものお家へ、こちらから伺います。
          </p>
        </Reveal>
      </section>

      {/* ===== ベーシックケアトリミング（比較） ===== */}
      <section className="relative overflow-hidden bg-skylight/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
          <SectionTitle
            label="わんnessの基本コース"
            title="わんnessのベーシックケアトリミング"
            description="わんnessでは、身体と皮膚の確認まで含めたケアを基本としています。「トリミングにケアを追加する」のではなく、整えることまで含めてひとつのコースです。"
          />
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-cocoa/10 bg-white/80 p-7 md:p-9">
                <p className="text-sm font-medium tracking-wide text-ink/60">
                  一般的なトリミング
                </p>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed md:text-base">
                  {["シャンプー", "カット", "爪切り・耳そうじなどのお手入れ"].map(
                    (item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink/30"
                        />
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative h-full rounded-3xl border-2 border-brand/40 bg-white p-7 shadow-lg shadow-brand/10 md:p-9">
                <p className="inline-flex rounded-full bg-brand px-4 py-1 text-xs font-bold text-white md:text-sm">
                  わんnessのベーシックケアトリミング
                </p>
                <ul className="mt-5 space-y-3 text-sm leading-relaxed md:text-base">
                  {[
                    "身体の左右差を確認",
                    "関節の動かしやすさ・可動域を確認",
                    "背筋を伸ばすやさしいケア",
                    "皮膚と被毛に合わせたスキンケア",
                    "シャンプー・犬種に応じたカット",
                    "日常ケアの相談・ホームケア提案",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <PawMarker tone="mimosa" size="sm" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
          <Reveal className="mt-8 text-center">
            <p className="mx-auto max-w-2xl text-xs leading-relaxed text-ink/60 md:text-sm">
              ※ベーシックケアトリミングは医療行為・治療ではありません。日々の健康管理を支えるためのケアです。
            </p>
            <OutlineLink href="/basic-care" className="mt-5">
              ベーシックケアトリミングを詳しく見る
            </OutlineLink>
          </Reveal>
        </div>
        <WaveBottom />
      </section>

      {/* ===== 出張トリミングだからできること ===== */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
        <SectionTitle
          label="出張型の強み"
          title="出張トリミングだからできること"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visitingBenefits.map((benefit, i) => (
            <Reveal key={benefit.title} delay={Math.min(i * 0.06, 0.3)}>
              <div className="h-full rounded-3xl border border-cocoa/10 bg-white p-6">
                <p className="font-serif text-base font-semibold text-cocoa md:text-lg">
                  {benefit.title}
                </p>
                <p className="mt-2 text-sm leading-loose text-ink/80">
                  {benefit.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 text-center">
          <p className="text-xs leading-relaxed text-ink/60 md:text-sm">
            ※わんちゃんの状態によっては安全を最優先し、事前確認のうえで内容の変更・お断りをさせていただく場合があります。
          </p>
        </Reveal>
      </section>

      {/* ===== 3つのサービス ===== */}
      <section className="bg-surface">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
          <SectionTitle
            label="サービス"
            title="わんnessの3つのサービス"
            description="トリミングも、身体のケアも、お散歩も。その子の毎日に合わせて組み合わせられます。"
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={Math.min(i * 0.08, 0.24)}>
                <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-cocoa/10 bg-white">
                  <Link
                    href={service.href}
                    className="zoom-media block aspect-[4/3] overflow-hidden"
                  >
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      width={800}
                      height={600}
                      sizes="(min-width: 1024px) 30vw, 100vw"
                      className="h-full w-full object-cover"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <h3 className="font-serif text-lg font-semibold text-cocoa md:text-xl">
                      {service.name}
                    </h3>
                    <p className="mt-1.5 text-sm font-medium text-brand">
                      {service.catch}
                    </p>
                    <p className="mt-3 text-sm leading-loose text-ink/80">
                      {service.description}
                    </p>
                    <div className="mt-4">
                      <p className="text-xs font-semibold text-ink/60">
                        こんな子・ご家庭に
                      </p>
                      <ul className="mt-1.5 space-y-1 text-xs leading-relaxed text-ink/75">
                        {service.target.map((t) => (
                          <li key={t} className="flex gap-1.5">
                            <span aria-hidden="true" className="text-sage">・</span>
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-auto pt-5">
                      <Link
                        href={service.href}
                        className="text-sm font-medium text-brand transition hover:opacity-70"
                      >
                        詳しく見る →
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
        <WaveBottom />
      </section>

      {/* ===== 大切にしていること ===== */}
      <section className="relative mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
        <LeafDecoration className="pointer-events-none absolute right-2 top-10 hidden h-32 w-32 text-mimosa/50 md:block" />
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal className="zoom-media order-2 overflow-hidden rounded-[2.5rem] rounded-bl-[6rem] shadow-lg shadow-cocoa/10 md:order-1">
            <Image
              src="/images/care/senior-golden-face.jpg"
              alt="ご自宅でくつろぐシニアのゴールデンレトリバー"
              width={1108}
              height={1477}
              sizes="(min-width: 768px) 45vw, 100vw"
              className="aspect-[4/3] h-auto w-full object-cover md:aspect-[5/4]"
            />
          </Reveal>
          <div className="order-1 md:order-2">
            <SectionTitle
              label="施術方針"
              title="わんnessが大切にしていること"
              align="left"
            />
            <ul className="space-y-3">
              {values.map((value, i) => (
                <Reveal as="li" key={value} delay={Math.min(i * 0.05, 0.3)}>
                  <div className="flex items-start gap-3 rounded-2xl bg-sagelight px-4 py-3.5 text-sm font-medium leading-relaxed text-cocoa md:px-5 md:text-base">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sage text-xs text-white"
                    >
                      {i + 1}
                    </span>
                    <span className="flex-1">{value}</span>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== 料金の一部 ===== */}
      <section className="bg-skylight/40">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
          <SectionTitle
            label="料金"
            title="料金の目安"
            description="代表的な犬種の目安料金です。全犬種の料金は料金表をご覧ください。"
          />
          <div className="grid gap-4 sm:grid-cols-3">
            {featuredPrices.map((row, i) => (
              <Reveal key={row.breeds.join("-")} delay={i * 0.08}>
                <div className="rounded-3xl border border-cocoa/10 bg-white p-6 text-center">
                  <p className="font-serif text-lg font-semibold text-cocoa">
                    {row.breeds.join("、")}
                  </p>
                  <dl className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center justify-between border-b border-cocoa/10 pb-2">
                      <dt className="text-ink/70">シャンプー</dt>
                      <dd className="font-bold tabular-nums text-cocoa">
                        {formatPrice(row.shampoo)}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between">
                      <dt className="text-ink/70">カット</dt>
                      <dd className="font-bold tabular-nums text-cocoa">
                        {formatPrice(row.cut)}
                      </dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 text-center">
            <p className="text-xs leading-relaxed text-ink/60 md:text-sm">
              ※料金は目安です。大きさ・毛量・状態・性格などにより前後する場合があります。
            </p>
            <OutlineLink href="/price" className="mt-5">
              料金表を見る
            </OutlineLink>
          </Reveal>
        </div>
        <WaveBottom />
      </section>

      {/* ===== 出張費 ===== */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
        <SectionTitle
          label="出張費"
          title="出張費について"
          description="那覇市内と牧志2丁目から5km以内は出張費無料。それを超える場合も、分かりやすい距離計算です。"
        />
        <div className="grid gap-4 md:grid-cols-3">
          <Reveal>
            <div className="h-full rounded-3xl bg-mimosa/25 p-7 text-center">
              <p className="text-sm font-medium text-ink/70">{site.travelFee.freeArea}</p>
              <p className="mt-2 font-serif text-3xl font-bold text-brand">無料</p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-3xl bg-mimosa/25 p-7 text-center">
              <p className="text-sm font-medium text-ink/70">
                {site.travelFee.baseLocation}から{site.travelFee.freeRadiusKm}km以内
              </p>
              <p className="mt-2 font-serif text-3xl font-bold text-brand">無料</p>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="h-full rounded-3xl bg-surface p-7 text-center">
              <p className="text-sm font-medium text-ink/70">
                {site.travelFee.freeRadiusKm}kmを超える距離
              </p>
              <p className="mt-2 font-serif text-2xl font-bold text-cocoa">
                1kmにつき{site.travelFee.perKmYen}円
              </p>
            </div>
          </Reveal>
        </div>
        <Reveal className="mx-auto mt-6 max-w-3xl rounded-2xl border border-cocoa/10 bg-white p-6 text-sm leading-loose text-ink/85">
          <p className="font-semibold text-cocoa">計算例</p>
          <p className="mt-1">{site.travelFee.example}となります。</p>
          <p className="mt-2 text-xs text-ink/60">※{site.travelFee.note}</p>
        </Reveal>
        <Reveal className="mt-6 text-center">
          <OutlineLink href="/area">対応エリア・出張費を詳しく見る</OutlineLink>
        </Reveal>
      </section>

      {/* ===== 代表者紹介 ===== */}
      <section className="bg-surface">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
          <SectionTitle label="代表者" title="代表者紹介" />
          <div className="grid items-center gap-10 md:grid-cols-[2fr_3fr]">
            <Reveal className="zoom-media mx-auto w-full max-w-sm overflow-hidden rounded-[2.5rem] rounded-tl-[6rem] shadow-lg shadow-cocoa/10">
              <Image
                src="/images/trimming/bath-smile.jpg"
                alt="わんness代表 佐々木那菜。自宅での温浴ケア中に笑顔でわんちゃんと向き合う様子"
                width={1108}
                height={1477}
                sizes="(min-width: 768px) 35vw, 100vw"
                className="h-auto w-full object-cover"
              />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-serif text-2xl font-semibold text-cocoa">
                {site.representative.name}
              </p>
              <p className="mt-1.5 text-sm font-medium tracking-wide text-cocoa/80 md:text-base">
                {site.representative.role}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {site.representative.qualifications.map((q) => (
                  <li
                    key={q}
                    className="rounded-full border border-sage/40 bg-sagelight px-4 py-1.5 text-xs font-medium text-sage md:text-sm"
                  >
                    {q}
                  </li>
                ))}
              </ul>
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
              <OutlineLink href="/profile" className="mt-6">
                代表者・事業者情報を見る
              </OutlineLink>
            </Reveal>
          </div>
        </div>
        <WaveBottom />
      </section>

      {/* ===== Instagram ===== */}
      <section className="mx-auto w-full max-w-6xl px-4 py-16 md:py-24">
        <SectionTitle
          label="Instagram"
          title={`Instagramで発信中 ${site.instagram.id}`}
          description="施術の様子やトリミング事例、健康ケア・スキンケア・ボディケアの情報、犬との暮らしに役立つ情報を発信しています。"
        />
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          {instagramGrid.map((item, i) => (
            <Reveal key={item.src} delay={Math.min(i * 0.05, 0.25)}>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="zoom-media block aspect-square overflow-hidden rounded-2xl"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={500}
                  height={500}
                  sizes="(min-width: 768px) 30vw, 33vw"
                  className="h-full w-full object-cover"
                />
              </a>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 text-center">
          <ul className="flex flex-wrap justify-center gap-2">
            {instagramTopics.map((topic) => (
              <li
                key={topic}
                className="rounded-full bg-surface px-4 py-1.5 text-xs text-ink/70 md:text-sm"
              >
                #{topic}
              </li>
            ))}
          </ul>
          <a
            href={site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-cocoa/30 bg-white px-7 py-3.5 text-sm font-medium text-cocoa transition hover:border-brand hover:text-brand"
          >
            Instagramを見る →
          </a>
        </Reveal>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-surface">
        <div className="mx-auto w-full max-w-4xl px-4 py-16 md:py-24">
          <SectionTitle label="よくある質問" title="よくある質問" />
          <FaqList items={featuredFaq} />
          <Reveal className="mt-8 text-center">
            <OutlineLink href="/faq">よくある質問をすべて見る</OutlineLink>
          </Reveal>
        </div>
        <WaveBottom />
      </section>

      {/* ===== 最終メッセージ ===== */}
      <section className="mx-auto w-full max-w-4xl px-4 pb-16 pt-4 text-center md:pb-24">
        <Reveal>
          <h2 className="font-serif text-2xl font-semibold leading-relaxed text-cocoa md:text-4xl">
            いつものお家で、
            <br />
            その子に合ったケアを。
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-loose text-ink/80 md:text-base">
            愛犬の年齢、性格、身体の状態、ご家庭の事情も含めてご相談ください。
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <LineButton />
            <TelButton />
          </div>
        </Reveal>
      </section>
    </>
  );
}
