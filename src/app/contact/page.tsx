import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageHero from "@/components/ui/PageHero";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import { LineButton, TelButton } from "@/components/ui/Buttons";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "お問い合わせ・ご予約｜LINE・電話・フォーム",
  description:
    "わんnessへのお問い合わせ・ご予約はLINEが便利です。愛犬の写真や状態も送れます。お電話（080-9063-0207、火・水・日曜9:00～22:00）、フォームでのご相談も受け付けています。那覇市を中心に沖縄本島全域へ出張します。",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "お問い合わせ・ご予約｜わんness",
    description:
      "LINE・電話・フォームでご相談を受け付けています。営業日・時間外もまずはお問い合わせください。",
    url: "/contact",
  },
};

const requestInfo = [
  "犬種・年齢・体重",
  "性格（怖がり・興奮しやすい など）",
  "持病・治療中の内容（あれば）",
  "皮膚の状態・気になっていること",
  "普段のトリミング状況",
  "希望するサービス",
  "訪問先の住所（市町村まででも可）",
  "駐車場所の有無",
  "希望日時",
];

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "お問い合わせ", path: "/contact" }]} />
      <PageHero
        title="お問い合わせ・ご予約"
        description="ご予約・ご相談はLINEがいちばんスムーズです。愛犬の写真や気になる箇所の様子も、そのまま送っていただけます。"
      />

      {/* LINE・電話 */}
      <section className="mx-auto w-full max-w-4xl px-4 py-14 md:py-20">
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col items-center rounded-3xl border-2 border-line/30 bg-white p-8 text-center">
              <p className="rounded-full bg-line/10 px-4 py-1 text-xs font-bold text-line">
                いちばんおすすめ
              </p>
              <h2 className="mt-3 font-serif text-xl font-semibold text-cocoa">
                LINEで相談する
              </h2>
              <p className="mt-2 flex-1 text-sm leading-loose text-ink/80">
                写真や動画を添えて相談できるので、状態の共有がスムーズです。
                「まだ検討中」の段階でもお気軽にどうぞ。
              </p>
              <LineButton className="mt-5 w-full" />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="flex h-full flex-col items-center rounded-3xl border border-cocoa/10 bg-white p-8 text-center">
              <p className="rounded-full bg-brand/10 px-4 py-1 text-xs font-bold text-brand">
                お急ぎの方
              </p>
              <h2 className="mt-3 font-serif text-xl font-semibold text-cocoa">
                電話で相談する
              </h2>
              <p className="mt-2 flex-1 text-sm leading-loose text-ink/80">
                営業時間は{site.businessHours.text}。
                {site.businessHours.note}
                施術中は電話に出られない場合があります。
              </p>
              <TelButton className="mt-5 w-full" />
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-8">
          <div className="rounded-3xl bg-surface p-7 md:p-8">
            <h2 className="font-serif text-lg font-semibold text-cocoa">
              ご予約時に教えていただきたいこと
            </h2>
            <p className="mt-2 text-sm text-ink/70">
              分かる範囲で大丈夫です。以下をお知らせいただくと、ご案内がスムーズになります。
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {requestInfo.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-white px-4 py-1.5 text-xs text-ink/80 md:text-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* フォーム */}
      <section className="bg-surface">
        <div className="mx-auto w-full max-w-3xl px-4 py-14 md:py-20">
          <SectionTitle
            label="フォーム"
            title="お問い合わせフォーム"
            description="LINEやお電話が難しい方は、こちらのフォームをご利用ください。"
          />
          <Reveal>
            <div className="rounded-3xl border border-cocoa/10 bg-white p-6 md:p-9">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
