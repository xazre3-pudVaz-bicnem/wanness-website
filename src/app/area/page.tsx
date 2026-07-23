import type { Metadata } from "next";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageHero from "@/components/ui/PageHero";
import SectionTitle from "@/components/ui/SectionTitle";
import Reveal from "@/components/ui/Reveal";
import CtaSection from "@/components/ui/CtaSection";
import { OutlineLink } from "@/components/ui/Buttons";
import { areas, areaPolicy } from "@/data/areas";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "対応エリア・出張費｜那覇市を中心に沖縄本島全域へ",
  description:
    "わんnessの出張トリミングは那覇市・浦添市・宜野湾市・豊見城市・南風原町・西原町・北谷町・沖縄市・うるま市など沖縄本島全域に対応。那覇市内と牧志2丁目から5km以内は出張費無料、超過分は1km100円の分かりやすい料金です。",
  alternates: { canonical: "/area" },
  openGraph: {
    title: "対応エリア・出張費｜わんness",
    description:
      "那覇市を中心に沖縄本島全域へ訪問。出張費は那覇市内無料・1km100円の分かりやすい計算です。",
    url: "/area",
  },
};

export default function AreaPage() {
  return (
    <>
      <Breadcrumbs items={[{ name: "対応エリア・出張費", path: "/area" }]} />
      <PageHero
        title="対応エリア・出張費"
        description={`${site.serviceArea}へ伺います。出張費は距離に応じた分かりやすい計算です。`}
      />

      {/* 対応エリア */}
      <section className="mx-auto w-full max-w-5xl px-4 py-14 md:py-20">
        <SectionTitle
          label="対応エリア"
          title="沖縄本島全域へ、できる限り伺います"
          description={areaPolicy}
        />
        <Reveal>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {areas.map((area) => (
              <li
                key={area.slug}
                className="rounded-2xl border border-cocoa/10 bg-white px-4 py-4 text-center"
              >
                <p className="text-sm font-semibold text-cocoa md:text-base">
                  {area.name}
                </p>
                <p className="mt-1 text-xs text-ink/60">{area.feeNote}</p>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="mt-6">
          <p className="text-center text-xs leading-relaxed text-ink/60 md:text-sm">
            上記以外の地域も、日程によってはご案内できる場合があります。まずはお住まいの地域を添えてお問い合わせください。
          </p>
        </Reveal>
      </section>

      {/* 出張費 */}
      <section className="bg-surface">
        <div className="mx-auto w-full max-w-5xl px-4 py-14 md:py-20">
          <SectionTitle
            label="出張費"
            title="出張費の考え方"
            description="事業所（那覇市牧志2丁目）からの距離をもとに計算します。"
          />
          <div className="grid gap-4 md:grid-cols-3">
            <Reveal>
              <div className="h-full rounded-3xl bg-mimosa/30 p-7 text-center">
                <p className="text-sm font-medium text-ink/70">{site.travelFee.freeArea}</p>
                <p className="mt-2 font-serif text-3xl font-bold text-brand">無料</p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full rounded-3xl bg-mimosa/30 p-7 text-center">
                <p className="text-sm font-medium text-ink/70">
                  {site.travelFee.baseLocation}から{site.travelFee.freeRadiusKm}km以内
                </p>
                <p className="mt-2 font-serif text-3xl font-bold text-brand">無料</p>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="h-full rounded-3xl bg-white p-7 text-center">
                <p className="text-sm font-medium text-ink/70">
                  {site.travelFee.freeRadiusKm}kmを超える距離
                </p>
                <p className="mt-2 font-serif text-2xl font-bold text-cocoa">
                  1kmにつき{site.travelFee.perKmYen}円
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-6">
            <div className="rounded-3xl border border-cocoa/10 bg-white p-7 md:p-9">
              <h3 className="font-serif text-lg font-semibold text-cocoa">
                出張費の計算例
              </h3>
              <div className="mt-4 space-y-3 text-sm leading-loose text-ink/85 md:text-base">
                <p>
                  例：{site.travelFee.baseLocation}から北谷町のお客さま宅まで15kmの場合
                </p>
                <div className="rounded-2xl bg-surface p-5 text-center">
                  <p className="font-medium text-cocoa">
                    15km − 無料範囲{site.travelFee.freeRadiusKm}km ＝ 10km
                  </p>
                  <p className="mt-1 font-serif text-xl font-bold text-brand">
                    10km × {site.travelFee.perKmYen}円 ＝ 出張費 1,000円
                  </p>
                </div>
                <p className="text-xs text-ink/60 md:text-sm">
                  ※距離は経路により多少前後します。ご予約時に正確な金額をご案内します。
                  <br />※{site.travelFee.note}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 補足 */}
      <section className="mx-auto w-full max-w-4xl px-4 py-14 md:py-20">
        <Reveal>
          <div className="rounded-3xl border border-sky/30 bg-skylight/50 p-7 text-sm leading-loose text-ink/85 md:p-9 md:text-base">
            <h2 className="font-serif text-lg font-semibold text-cocoa">
              遠方エリアをご検討の方へ
            </h2>
            <p className="mt-3">
              糸満市・南城市・うるま市など那覇市から距離のある地域も、日程を調整しながらできる限り対応しています。同じ地域で複数のご家庭がご利用の場合など、訪問しやすくなるケースもありますので、あきらめる前に一度ご相談ください。
            </p>
          </div>
        </Reveal>
        <Reveal className="mt-8 flex flex-col items-center justify-center gap-3 text-center sm:flex-row">
          <OutlineLink href="/price">料金案内を見る</OutlineLink>
          <OutlineLink href="/flow">ご利用の流れを見る</OutlineLink>
        </Reveal>
      </section>

      <CtaSection
        title={"お住まいの地域を添えて、\nお気軽にご相談ください。"}
        message="住所（市町村まででも大丈夫です）をお知らせいただければ、出張費の目安をすぐにご案内します。"
      />
    </>
  );
}
