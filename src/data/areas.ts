/**
 * 対応エリアデータ
 *
 * 将来的に地域別ページ（/area/[slug]）を追加できる構造。
 * 地域別ページを作成する場合は、hasPage を true にし、
 * 固有の説明・訪問イメージ・出張費の考え方・FAQを各ページへ用意すること
 * （内容の薄いページの大量生成は行わない方針）。
 */

export type Area = {
  slug: string;
  name: string;
  /** 出張費の目安に関するメモ（表示用） */
  feeNote: string;
  /** 地域別ページを公開しているか（現状はすべて false） */
  hasPage: boolean;
};

export const areas: Area[] = [
  { slug: "naha", name: "那覇市", feeNote: "出張費無料", hasPage: false },
  { slug: "urasoe", name: "浦添市", feeNote: "距離により算出", hasPage: false },
  { slug: "ginowan", name: "宜野湾市", feeNote: "距離により算出", hasPage: false },
  { slug: "tomigusuku", name: "豊見城市", feeNote: "距離により算出", hasPage: false },
  { slug: "itoman", name: "糸満市", feeNote: "距離により算出", hasPage: false },
  { slug: "nanjo", name: "南城市", feeNote: "距離により算出", hasPage: false },
  { slug: "haebaru", name: "南風原町", feeNote: "距離により算出", hasPage: false },
  { slug: "nishihara", name: "西原町", feeNote: "距離により算出", hasPage: false },
  { slug: "chatan", name: "北谷町", feeNote: "距離により算出", hasPage: false },
  { slug: "okinawa-city", name: "沖縄市", feeNote: "距離により算出", hasPage: false },
  { slug: "uruma", name: "うるま市", feeNote: "距離により算出", hasPage: false },
  {
    slug: "okinawa-honto",
    name: "その他沖縄本島内",
    feeNote: "距離により算出",
    hasPage: false,
  },
];

export const areaPolicy =
  "沖縄本島内はできる限り対応します。地域や日程によっては対応が難しい場合があります。";
