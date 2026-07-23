/**
 * ベーシックケアトリミング 料金データ
 *
 * 表示用コンポーネントへ金額を直書きせず、必ずこのファイルを参照すること。
 * 料金改定はこのファイルの修正のみで全ページへ反映される。
 *
 * ─── 開発者向けメモ（資料間の差異） ───────────────────────
 * ・フレンチブルドッグ、パグ：
 *   料金表画像では ¥7,000、チラシ（CARE MENU面）では ¥6,800 の表記あり。
 *   → 暫定で ¥7,000 を採用。確定後に shampoo の値を修正すること。
 * ・ゴールデン・レトリバーのカット：
 *   料金表画像では ¥20,000、チラシ（CARE MENU面）では ¥22,000 の表記あり。
 *   → 暫定で ¥20,000 を採用。確定後に cut の値を修正すること。
 * ─────────────────────────────────────────────
 */

export type PriceRow = {
  /** 犬種（複数犬種をまとめる場合は配列） */
  breeds: string[];
  /** シャンプーコース料金（円）。幅がある場合は min/max */
  shampoo: { min: number; max?: number };
  /** カットコース料金（円）。設定がない犬種は null */
  cut: { min: number; max?: number } | null;
  /** トップページの抜粋表示に使う犬種 */
  featured?: boolean;
};

export const priceRows: PriceRow[] = [
  {
    breeds: ["ミニチュア・ピンシャー", "スムースチワワ"],
    shampoo: { min: 6800 },
    cut: null,
  },
  {
    breeds: ["ロングチワワ"],
    shampoo: { min: 7500 },
    cut: { min: 8000 },
    featured: true,
  },
  {
    breeds: ["トイ・プードル"],
    shampoo: { min: 9000 },
    cut: { min: 11000 },
    featured: true,
  },
  {
    breeds: ["ポメラニアン"],
    shampoo: { min: 7800, max: 9000 },
    cut: { min: 9000 },
  },
  {
    breeds: ["マルチーズ", "ヨークシャー・テリア", "パピヨン", "ロングダックス"],
    shampoo: { min: 7800 },
    cut: { min: 9000 },
  },
  {
    breeds: ["フレンチブルドッグ", "パグ"],
    shampoo: { min: 7000 },
    cut: null,
  },
  {
    breeds: ["シーズー", "シュナウザー"],
    shampoo: { min: 8000 },
    cut: { min: 10000 },
  },
  {
    breeds: ["柴犬"],
    shampoo: { min: 9000 },
    cut: null,
    featured: true,
  },
  {
    breeds: ["アメリカン・コッカー・スパニエル", "ビション・フリーゼ"],
    shampoo: { min: 9000 },
    cut: { min: 11000 },
  },
  {
    breeds: ["ラブラドール・レトリバー"],
    shampoo: { min: 12000 },
    cut: null,
  },
  {
    breeds: ["ゴールデン・レトリバー"],
    shampoo: { min: 19000 },
    cut: { min: 20000 },
  },
];

/** 料金に関する共通注意書き */
export const priceNotes = [
  "料金表は目安です。大きさ・毛量・毛玉・抜け毛・状態・性格・施術内容などにより前後する場合があります。",
  "上記以外の犬種・ミックス犬もご相談ください。",
  "訪問地域によって別途出張費がかかる場合があります。詳しくは対応エリア・出張費のページをご覧ください。",
] as const;

/** ボディケア・お散歩代行の料金 */
export const carePricing = {
  bodyConditioning: {
    name: "ボディコンディショニング",
    duration: "30分",
    price: { min: 3500 },
    withTrimming: { min: 2500 },
    note: "トリミングと同日のご利用の場合は2,500円～",
  },
  walkSupport: {
    name: "お散歩代行サポート",
    duration: "30分＋ケア",
    price: { min: 3500 },
  },
} as const;

/** 金額の表示用フォーマット（例: 7,800円～9,000円 / 9,000円） */
export function formatPrice(p: { min: number; max?: number } | null): string {
  if (!p) return "—";
  const f = (n: number) => n.toLocaleString("ja-JP");
  return p.max ? `${f(p.min)}円～${f(p.max)}円` : `${f(p.min)}円`;
}
