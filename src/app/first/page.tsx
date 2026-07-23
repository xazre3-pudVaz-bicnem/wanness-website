import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageHero from "@/components/ui/PageHero";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import CtaSection from "@/components/ui/CtaSection";
import { OutlineLink } from "@/components/ui/Buttons";

export const metadata: Metadata = {
  title: "初めての方へ｜ご利用前に知っておいてほしいこと",
  description:
    "わんnessの出張トリミングを初めてご利用になる方へ。完全予約制であること、事前の状態確認、安全面の考え方、料金・出張費、ご自宅の環境についてなど、ご利用前に知っておいていただきたいことをまとめました。",
  alternates: { canonical: "/first" },
  openGraph: {
    title: "初めての方へ｜わんness",
    description:
      "安心してご利用いただくために、ご利用前に知っておいていただきたいことをまとめました。",
    url: "/first",
  },
};

const guidelines = [
  {
    title: "完全予約制です",
    text: "一頭一頭に時間をかけてケアするため、完全予約制としています。LINEまたはお電話で、事前にご予約をお願いします。",
  },
  {
    title: "事前に愛犬の状態を確認します",
    text: "犬種・年齢・性格・持病・皮膚の状態・普段のトリミング状況などを事前に伺います。正確にお知らせいただくことが、安全なケアにつながります。",
  },
  {
    title: "安全に施術できないと判断した場合",
    text: "わんちゃんの体調や様子によっては、施術を中止することがあります。無理に続けることはせず、その子の安全と負担の少なさを最優先します。",
  },
  {
    title: "治療中・通院中の場合",
    text: "状態や治療内容によっては、主治医への確認をお願いする場合があります。当サービスは動物医療の代わりになるものではありません。",
  },
  {
    title: "噛みつき・極度の興奮がある場合",
    text: "咬み癖や極度に興奮しやすい傾向がある場合は、必ず事前にお伝えください。対応方法を一緒に考えたうえで、施術できるかどうかを判断します。",
  },
  {
    title: "作業スペース・水道・電源について",
    text: "施術内容によって、作業スペースや水道・電源などをお借りする可能性があります。具体的な条件はご予約時に確認します。",
  },
  {
    title: "駐車スペースについて",
    text: "お車で伺うため、駐車スペースの有無を事前に確認させてください。有料駐車場を利用する場合は、実費をご負担いただく場合があります。",
  },
  {
    title: "ノミ・ダニ・感染症等が確認された場合",
    text: "施術中にノミ・ダニ・感染症の疑い等が確認された場合は、施術の中断や内容の変更をご相談し、動物病院の受診をおすすめすることがあります。",
  },
  {
    title: "料金について",
    text: "料金表は目安です。大きさ・毛量・毛玉・状態・性格などにより前後する場合があります。事前にお伝えいただいた情報をもとに、目安をご案内します。",
  },
  {
    title: "出張費について",
    text: "那覇市内・牧志2丁目から5km以内は無料、超えた分は1kmにつき100円です。訪問地域によって出張費が必要になります。",
  },
  {
    title: "犬の負担と安全を最優先します",
    text: "「今日はここまで」と判断する勇気も、プロの仕事だと考えています。その子のペースを最優先に進めることを、あらかじめご理解ください。",
  },
];

export default function FirstPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "初めての方へ", path: "/first" }]} />
      <PageHero
        title="初めての方へ"
        description="安心してご利用いただくために、ご利用前に知っておいていただきたいことをまとめました。ご不明な点は、ご予約前にお気軽にお尋ねください。"
      />

      <section className="mx-auto w-full max-w-4xl px-4 py-14 md:py-20">
        <SectionTitle
          label="ご利用前のご案内"
          title="ご利用にあたってのお願い"
        />
        <div className="space-y-4">
          {guidelines.map((item, i) => (
            <Reveal key={item.title} delay={Math.min(i * 0.03, 0.15)}>
              <div className="rounded-3xl border border-cocoa/10 bg-white p-6 md:p-7">
                <h2 className="flex items-start gap-3 font-serif text-base font-semibold text-cocoa md:text-lg">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sagelight text-xs font-bold text-sage"
                  >
                    {i + 1}
                  </span>
                  {item.title}
                </h2>
                <p className="mt-2 pl-10 text-sm leading-loose text-ink/85 md:text-base">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10">
          <p className="rounded-2xl border border-sky/30 bg-skylight/50 p-5 text-center text-xs leading-relaxed text-ink/75 md:text-sm">
            記載のない条件・詳細については、ご予約時に確認させていただきます。分からないことは、そのままLINEでお尋ねください。
          </p>
        </Reveal>

        <Reveal className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <OutlineLink href="/flow">ご利用の流れを見る</OutlineLink>
          <OutlineLink href="/faq">よくある質問を見る</OutlineLink>
        </Reveal>
      </section>

      <CtaSection
        title={"不安なことは、\n予約の前に全部聞いてください。"}
        message="シニアの子、持病のある子、トリミングが苦手な子。どんなことでも、まずは状態をお聞かせください。"
      />
    </>
  );
}
