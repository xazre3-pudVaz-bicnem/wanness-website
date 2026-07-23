import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageHero from "@/components/ui/PageHero";
import FaqList from "@/components/ui/FaqList";
import Reveal from "@/components/ui/Reveal";
import CtaSection from "@/components/ui/CtaSection";
import JsonLd from "@/components/seo/JsonLd";
import { OutlineLink } from "@/components/ui/Buttons";
import { faqJsonLd } from "@/lib/jsonld";
import { faqItems } from "@/data/faq";

export const metadata: Metadata = {
  title: "よくある質問｜シニア犬・通院中・設備・料金のご質問",
  description:
    "わんnessの出張トリミングに寄せられるよくある質問。シニア犬や通院中の子の利用、対応エリア、自宅の設備、他の犬が苦手な子、料金や予約方法、営業時間外の相談などにお答えします。",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "よくある質問｜わんness",
    description:
      "シニア犬の利用、対応エリア、設備、料金、予約方法など、よくいただくご質問にお答えします。",
    url: "/faq",
  },
};

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqItems)} />
      <Breadcrumbs items={[{ name: "よくある質問", path: "/faq" }]} />
      <PageHero
        title="よくある質問"
        description="ご利用前によくいただくご質問をまとめました。ここにない疑問は、LINEまたはお電話でお気軽にお尋ねください。"
      />

      <section className="mx-auto w-full max-w-4xl px-4 py-14 md:py-20">
        <FaqList items={faqItems} />
        <Reveal className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <OutlineLink href="/first">初めての方へ</OutlineLink>
          <OutlineLink href="/flow">ご利用の流れを見る</OutlineLink>
        </Reveal>
      </section>

      <CtaSection
        title={"解決しない疑問は、\n直接お尋ねください。"}
        message="わんちゃんの状態に関わることは、実際の様子を伺いながらお答えするのがいちばん確実です。"
      />
    </>
  );
}
