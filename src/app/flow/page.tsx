import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import CtaSection from "@/components/ui/CtaSection";
import { OutlineLink } from "@/components/ui/Buttons";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "ご利用の流れ｜お問い合わせから施術当日まで",
  description:
    "わんnessの出張トリミングご利用の流れをご案内。LINEまたは電話でのお問い合わせから、愛犬ちゃんの情報確認、日程調整、ご自宅への訪問、カウンセリング、施術、施術後の共有まで7つのステップで分かりやすく説明します。",
  alternates: { canonical: "/flow" },
  openGraph: {
    title: "ご利用の流れ｜わんness",
    description:
      "お問い合わせから施術当日までの流れを7ステップでご案内します。",
    url: "/flow",
  },
};

const checkItems = [
  "犬種",
  "年齢",
  "体重",
  "性格",
  "持病・治療中の内容",
  "皮膚の状態",
  "普段のトリミング状況",
  "希望するサービス",
  "訪問先住所",
  "駐車場所",
  "希望日時",
];

const steps = [
  {
    title: "LINEまたは電話でお問い合わせ",
    text: `まずはLINEまたはお電話（${site.tel}）でご連絡ください。LINEでは、愛犬ちゃんの写真や気になる箇所の様子も一緒にお送りいただけます。営業時間は${site.businessHours.text}。${site.businessHours.note}`,
  },
  {
    title: "愛犬ちゃんの情報を確認",
    text: "安全に施術できるよう、わんちゃんの状態やご自宅の環境について伺います。",
    hasCheckList: true,
  },
  {
    title: "日程と料金目安をご案内",
    text: "伺った内容をもとに、施術内容・料金の目安・出張費・ご訪問日時をご案内します。ご予約確定後はLINEからカルテをお送りしますので、分かる範囲でご入力をお願いします。",
  },
  {
    title: "ご自宅へ訪問",
    text: "ご予約の日時に伺います。作業スペースや水道・電源などをお借りする場合は、事前にご案内した内容に沿って準備をお願いします。",
  },
  {
    title: "カウンセリングと状態確認",
    text: "当日の体調や機嫌、皮膚・被毛の様子、身体の左右差や動かしやすさを確認します。様子によっては、無理をさせないよう内容の調整をご相談します。",
  },
  {
    title: "施術",
    text: "その子のペースに合わせて、ベーシックケアトリミングやボディコンディショニングを行います。ご希望に応じて、施術の様子を見守っていただけます。",
  },
  {
    title: "施術後の状態共有とお会計",
    text: "その日の身体や皮膚の様子、気づいたことをお伝えし、ご自宅でできる簡単なケアをご提案します。お支払い方法は、ご予約時にご確認ください。",
  },
];

export default function FlowPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "ご利用の流れ", path: "/flow" }]} />
      <PageHero
        title="ご利用の流れ"
        description="お問い合わせから施術当日まで、7つのステップでご案内します。初めての方も、この流れに沿って進めれば大丈夫です。"
      />

      <section className="mx-auto w-full max-w-4xl px-4 py-14 md:py-20">
        <ol className="relative space-y-6 before:absolute before:bottom-6 before:left-5 before:top-6 before:w-px before:bg-brand/25 md:before:left-6">
          {steps.map((step, i) => (
            <Reveal as="li" key={step.title} className="relative pl-14 md:pl-16">
              <span className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full bg-brand font-serif text-sm font-bold text-white md:h-12 md:w-12 md:text-base">
                {i + 1}
              </span>
              <div className="rounded-3xl border border-cocoa/10 bg-white p-6 md:p-7">
                <h2 className="font-serif text-lg font-semibold text-cocoa md:text-xl">
                  {step.title}
                </h2>
                <p className="mt-2 text-sm leading-loose text-ink/85 md:text-base">
                  {step.text}
                </p>
                {step.hasCheckList && (
                  <div className="mt-4 rounded-2xl bg-surface p-5">
                    <p className="text-xs font-semibold text-ink/60">確認項目の例</p>
                    <ul className="mt-2 flex flex-wrap gap-2">
                      {checkItems.map((item) => (
                        <li
                          key={item}
                          className="rounded-full bg-white px-3.5 py-1.5 text-xs text-ink/80"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-10">
          <p className="rounded-2xl border border-sky/30 bg-skylight/50 p-5 text-center text-xs leading-relaxed text-ink/75 md:text-sm">
            わんちゃんの安全を最優先しています。当日の体調や様子によっては、施術内容の変更や中止をご提案する場合があります。あらかじめご了承ください。
          </p>
        </Reveal>

        <Reveal className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <OutlineLink href="/first">初めての方へ</OutlineLink>
          <OutlineLink href="/faq">よくある質問を見る</OutlineLink>
        </Reveal>
      </section>

      <CtaSection
        title={"最初の一歩は、\nLINEでのご相談から。"}
        message="「まだ利用するか決めていない」という段階でも大丈夫です。気になることから、お気軽にどうぞ。"
      />
    </>
  );
}
