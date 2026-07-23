/**
 * わんness サイト共通設定
 *
 * 電話番号・住所・営業時間・SNS・LINE URL などの基本情報は
 * 必ずこのファイルから参照すること（各コンポーネントへの直書き禁止）。
 */

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://wanness.example.com";

/** 公式LINE URL（未設定の場合は null → 各UIは電話・フォーム案内へフォールバック） */
export const lineUrl: string | null =
  process.env.NEXT_PUBLIC_LINE_URL && process.env.NEXT_PUBLIC_LINE_URL !== ""
    ? process.env.NEXT_PUBLIC_LINE_URL
    : null;

export const site = {
  name: "わんness",
  nameReading: "ワンネス",
  tagline: "那覇市の出張トリミング・犬のボディケア",
  concept: "わんこと人が、元気に、心地よく。支え想い合って暮らせる毎日を。",
  brandCopy: "犬の健康寿命を、のばしたい。",

  representative: {
    name: "佐々木 那菜",
    nameReading: "ささき なな",
    /**
     * 保有資格：確認できているもののみ掲載。
     * 追加の資格・経歴が確定したらここへ追記する。
     */
    qualifications: ["犬の理学療法インストラクター師範"],
  },

  tel: "080-9063-0207",
  telLink: "tel:080-9063-0207",

  address: {
    postalCode: "900-0013",
    prefecture: "沖縄県",
    city: "那覇市",
    street: "牧志2丁目17-27",
    full: "〒900-0013 沖縄県那覇市牧志2丁目17-27",
  },

  businessHours: {
    open: "9:00",
    close: "22:00",
    text: "9:00～22:00",
    note: "時間外の場合も、お気軽にお問い合わせください。",
  },

  serviceArea: "那覇市を中心とした沖縄本島全域",

  instagram: {
    id: "@wan1ness",
    url: "https://www.instagram.com/wan1ness/",
  },

  /** 第一種動物取扱業 登録情報 */
  animalHandlingBusiness: {
    label: "第一種動物取扱業",
    officeName: "わんness",
    address: "沖縄県那覇市牧志2丁目17-27",
    category: "保管",
    registrationNumber: "沖動保第1435号",
    registrationDate: "令和8年3月12日",
    expirationDate: "令和13年3月11日",
    manager: "佐々木 那菜",
  },

  /** 出張費の計算ルール */
  travelFee: {
    freeArea: "那覇市内",
    freeRadiusKm: 5,
    baseLocation: "牧志2丁目",
    perKmYen: 100,
    note: "高速道路・有料駐車場等を利用する場合は、実費を別途ご負担いただく場合があります。",
    example:
      "牧志2丁目から北谷町のお客さま宅まで15kmの場合、無料範囲（5km）を超えた10km分として出張費1,000円",
  },
} as const;

export type Site = typeof site;
