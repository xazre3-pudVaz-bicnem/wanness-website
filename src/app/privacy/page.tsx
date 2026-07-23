import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "わんnessのプライバシーポリシー。お問い合わせ・ご予約の際にお預かりする個人情報の利用目的、管理方法、第三者提供についての方針を掲載しています。",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "プライバシーポリシー｜わんness",
    url: "/privacy",
  },
};

const sections = [
  {
    title: "1. 基本方針",
    body: [
      `わんness（代表：${site.representative.name}。以下「当方」といいます）は、お客さまからお預かりする個人情報の重要性を認識し、個人情報の保護に関する法律および関連法令を遵守し、適切な取得・利用・管理に努めます。`,
    ],
  },
  {
    title: "2. 取得する情報",
    body: [
      "当方は、ご予約・お問い合わせ・サービス提供にあたり、次の情報を取得する場合があります。",
    ],
    list: [
      "お名前、電話番号、メールアドレス、LINEアカウント名",
      "ご住所（訪問先）、駐車環境などご自宅に関する情報",
      "愛犬に関する情報（犬種、年齢、体重、性格、健康状態、持病、通院状況など）",
      "お問い合わせ・ご相談の内容",
    ],
  },
  {
    title: "3. 利用目的",
    body: ["取得した個人情報は、次の目的の範囲内で利用します。"],
    list: [
      "ご予約の受付、日程調整、サービスの提供",
      "施術内容の検討および安全確保のための事前確認",
      "料金・出張費のご案内",
      "お問い合わせへの回答、アフターフォロー",
      "サービス向上のための記録・分析",
    ],
  },
  {
    title: "4. 第三者提供",
    body: [
      "法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。",
    ],
  },
  {
    title: "5. 安全管理",
    body: [
      "個人情報への不正アクセス、紛失、漏えい等を防止するため、適切な安全管理措置を講じます。",
    ],
  },
  {
    title: "6. 開示・訂正・削除",
    body: [
      "ご本人から個人情報の開示・訂正・削除のお申し出があった場合は、ご本人確認のうえ、合理的な範囲で速やかに対応します。",
    ],
  },
  {
    title: "7. お問い合わせ窓口",
    body: [
      `個人情報の取り扱いに関するお問い合わせは、下記までお願いします。`,
      `わんness（代表：${site.representative.name}）`,
      `電話：${site.tel}`,
      `所在地：${site.address.full}`,
    ],
  },
  {
    title: "8. 改定",
    body: [
      "本ポリシーの内容は、法令の変更やサービス内容の変更に応じて、予告なく改定する場合があります。改定後の内容は、本ページに掲載した時点から適用されます。",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "プライバシーポリシー", path: "/privacy" }]} />
      <PageHero
        title="プライバシーポリシー"
        description="お客さまと愛犬の情報を、安心してお預けいただくために。"
      />
      <section className="mx-auto w-full max-w-3xl px-4 py-14 md:py-20">
        <div className="space-y-8">
          {sections.map((section) => (
            <Reveal key={section.title}>
              <section>
                <h2 className="font-serif text-lg font-semibold text-cocoa md:text-xl">
                  {section.title}
                </h2>
                {section.body.map((p) => (
                  <p key={p} className="mt-2 text-sm leading-loose text-ink/85 md:text-base">
                    {p}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-3 space-y-1.5 rounded-2xl bg-surface p-5 text-sm leading-relaxed text-ink/85">
                    {section.list.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span aria-hidden="true" className="text-brand">・</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
