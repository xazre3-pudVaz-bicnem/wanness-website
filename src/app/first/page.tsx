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
    "わんnessの出張トリミングを初めてご利用になる方へ。完全予約制、ワクチン接種後の期間、お食事のタイミング、当日のご準備（駐車スペース・タオル・掃除機など）、施術をお受けできない場合について、ご利用前に知っておいていただきたいことをまとめました。",
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
    title: "事前に愛犬ちゃんの状態を確認します",
    text: "犬種・年齢・性格・持病・皮膚の状態・普段のトリミング状況などを事前に伺います。正確にお知らせいただくことが、安全なケアにつながります。",
  },
  {
    title: "ご予約確定後に、カルテの入力をお願いします",
    text: "ご予約確定後にLINEからカルテをお送りします。分かる範囲で構いませんので、ご入力にご協力ください。",
  },
  {
    title: "ワクチン接種・予防薬投与後は、1週間以上空けてください",
    text: "わんちゃんの体調を最優先するため、ワクチン接種や予防薬の投与後は、1週間以上空けてのご利用をお願いしています。接種予定が近い場合は、日程をご相談ください。",
  },
  {
    title: "施術はお食事から2時間以上空けてください",
    text: "身体への負担を抑えるため、施術はお食事から2時間以上空けてのご利用をお願いしています。",
  },
  {
    title: "治療中・通院中の場合",
    text: "通院治療中の子は、事前にかかりつけの獣医師さんへのご相談をおすすめしています。状態や治療内容によっては、獣医師さんへの確認をお願いする場合があります。当サービスは動物医療の代わりになるものではありません。",
  },
  {
    title: "噛み癖・興奮しやすい傾向がある場合",
    text: "軽度であっても噛み癖や、興奮しやすい傾向がある場合は、必ず事前にお伝えください。施術できる方法やお互いの安全対策を考えたうえで、施術がどこまでできるか等、その子のその日の様子をみながら判断していきます。",
  },
  {
    title: "「慣れること」からゆっくり始める場合があります",
    text: "わんちゃんによっては、まずは「慣れること」からゆっくり始める場合があります。特に怖がりさん・シニアさん・緊張しやすい子は無理に進めず、その子のペースを大切にします。訪問中は“頑張らせる時間”ではなく、“安心できる時間”になることを目指しています。",
  },
  {
    title: "安全に施術できないと判断した場合",
    text: "わんちゃんの体調や様子によっては、施術を中止することがあります。無理に続けることはせず、その子の安全と負担の少なさを最優先します。",
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

const preparations = [
  {
    title: "駐車スペースのご協力",
    text: "軽自動車でお伺いします。ご自宅の駐車スペースのご協力をお願いします。近隣のコインパーキングを利用する場合は、恐れ入りますが駐車料金のご負担をお願いしています。",
  },
  {
    title: "コンセント付近のスペース",
    text: "トリミングテーブル・カットスペースとして、コンセント付近のスペースをお借りします。",
  },
  {
    title: "タオルのご用意",
    text: "シャンプー後に使用するタオルを、数枚ご用意ください。",
  },
  {
    title: "掃除機のお借り",
    text: "カット後のお掃除に使用するため、掃除機をお借りします。",
  },
  {
    title: "レジャーシート等（任意）",
    text: "毛の飛散が気になる方は、テーブルの下に敷くレジャーシート等をご用意ください。",
  },
];

const notAvailable = [
  "発熱・感染症・急性炎症など、体調が不安定なとき",
  "術後・療養中・安静指示があるとき",
  "重度の心疾患がある場合",
  "強い痛みや熱感を伴う急性症状があるとき",
  "極度の興奮や攻撃性があり、お互いの安全確保が難しい場合",
];

export default function FirstPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "初めての方へ", path: "/first" }]} />
      <PageHero
        title="初めての方へ"
        description="安心してご利用いただくために、ご利用前に知っておいていただきたいことをまとめました。ご不明な点は、ご予約前にお気軽にお尋ねください。"
      />

      {/* ご利用にあたってのお願い */}
      <section className="mx-auto w-full max-w-4xl px-4 py-14 md:py-20">
        <SectionTitle
          label="ご利用前のご案内"
          title="ご利用にあたってのお願い"
        />
        <div className="space-y-4">
          {guidelines.map((item, i) => (
            <Reveal key={item.title} delay={Math.min(i * 0.03, 0.15)}>
              <div className="rounded-3xl border border-cocoa/10 bg-white p-6 md:p-7">
                <h3 className="flex items-start gap-3 font-serif text-base font-semibold text-cocoa md:text-lg">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-sagelight text-xs font-bold text-sage"
                  >
                    {i + 1}
                  </span>
                  {item.title}
                </h3>
                <p className="mt-2 pl-10 text-sm leading-loose text-ink/85 md:text-base">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 当日のご準備のお願い */}
      <section className="bg-surface">
        <div className="mx-auto w-full max-w-4xl px-4 py-14 md:py-20">
          <SectionTitle
            label="当日のご準備"
            title="出張トリミング当日のご準備のお願い"
            description="特別な設備は必要ありません。当日は次の5点にご協力をお願いします。"
          />
          <ol className="space-y-4">
            {preparations.map((item, i) => (
              <Reveal as="li" key={item.title} delay={Math.min(i * 0.04, 0.2)}>
                <div className="flex gap-4 rounded-3xl border border-cocoa/10 bg-white p-6 md:p-7">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sky font-serif text-sm font-bold text-white md:h-11 md:w-11">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-serif text-base font-semibold text-cocoa md:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-loose text-ink/80 md:text-base">
                      {item.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-6">
            <p className="text-center text-xs leading-relaxed text-ink/60 md:text-sm">
              ご不明な点は、お気軽にご相談ください。
            </p>
          </Reveal>
        </div>
      </section>

      {/* 施術をお受けできない場合 */}
      <section className="mx-auto w-full max-w-4xl px-4 py-14 md:py-20">
        <SectionTitle
          label="安全のために"
          title="施術をお受けできない場合"
          description="わんちゃんの心と身体への負担を最優先に考えています。安心・安全のために、以下に該当する場合は施術をお受けできないことがあります。"
        />
        <Reveal>
          <ul className="space-y-2.5 rounded-3xl border border-sky/30 bg-skylight/50 p-7 text-sm leading-loose text-ink/85 md:p-9 md:text-base">
            {notAvailable.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span aria-hidden="true" className="text-sky">・</span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="mt-5">
          <div className="space-y-3 text-sm leading-loose text-ink/85 md:text-base">
            <p>
              また、癌・てんかん発作歴のある子は、事前にかかりつけの獣医師さんへのご相談をお願いしています。
            </p>
            <p className="rounded-2xl bg-surface p-5 text-xs leading-relaxed text-ink/70 md:text-sm">
              ※わんnessのケアは、病気の診断・治療を目的とした医療行為ではありません。ご不安なことがあれば、小さなことでもお気軽にご相談ください。
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
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
