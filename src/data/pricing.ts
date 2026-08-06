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
    /** 体重別料金（30分） */
    tiers: [
      { label: "小型犬", weight: "～4kg台", price: 3500 },
      { label: "小型犬", weight: "5kg～10kg台", price: 4000 },
      { label: "中型犬", weight: "11kg～20kg台", price: 4500 },
      { label: "大型犬", weight: "21kg～30kg台", price: 5000 },
    ],
    /** トリミングと同日のご利用は上記から1,000円OFF */
    sameDayDiscount: 1000,
  },
  walkSupport: {
    name: "お散歩代行サポート",
    duration: "30分＋ケア",
    price: { min: 3500 },
  },
} as const;

/**
 * ベーシックケアトリミングに追加できるオプションコース
 * （チラシ「トリミングオプション」より。表現は医療広告に配慮して調整済み）
 */
export const optionPricing = {
  note: "ベーシックケアトリミングに追加できるオプションコースです。詳しい内容は、InstagramまたはLINEにてご案内しています。",
  disclaimer:
    "オプションコースは病気の診断・治療を目的とした医療行為ではありません。治療中・通院中の子は、必要に応じて主治医へご相談のうえでお申し込みください。",
  options: [
    {
      code: "A",
      name: "スキンケアコース",
      price: { min: 2000 },
      catch: "お肌を「守る」「育てる」を大切にした集中スキンケア",
      description:
        "獣医療向けスキンケア製品「N'S DRIVE」を中心に、その子の皮膚と被毛の状態に合わせた製品を選んで使用し、皮膚のうるおいとバリア機能を守るケアを行います。トラブルを起こしにくい、健やかな皮膚を保つことを目指すコースです。",
      recommendedFor: [
        "慢性的なかゆみが気になる子",
        "赤みやフケが出やすい子",
        "脱毛や皮膚トラブルを繰り返しやすい子",
        "脂っぽさ・乾燥が気になる子",
      ],
      tone: "sky",
    },
    {
      code: "B",
      name: "ボディコンディショニングコース",
      price: { min: 2500 },
      catch: "動きやすい身体づくりをサポートするボディケア",
      description:
        "筋肉のこわばりをやさしく緩め、姿勢や身体の使い方のクセに目を向けながら整えるコースです。気になることがある子はもちろん、元気なうちからのメンテナンスとしてもご利用いただけます。",
      recommendedFor: [
        "背中の丸まりが気になる子",
        "足腰の衰えを感じ始めた子",
        "動きにくそうな様子がある子",
        "元気なうちからメンテナンスをしたい子",
      ],
      tone: "mimosa",
    },
    {
      code: "A＆B",
      name: "ウェルネスケアコース",
      price: { min: 4000 },
      catch: "お肌も身体も、より深く整えるトータルケア",
      description:
        "スキンケアとボディコンディショニングを組み合わせ、皮膚・筋肉・姿勢と全身のバランスに目を向けるコースです。予防からケアまで、その子に合わせたオーダーメイドのトータルケアを行います。",
      recommendedFor: [
        "元気なうちから身体を整えたい子",
        "シニア期の健康維持を考えたい子",
        "涙やけや耳汚れを繰り返しやすい子",
        "なんとなく気になる様子が続いている子",
      ],
      tone: "sage",
    },
  ],
} as const;

/** 金額の表示用フォーマット（例: 7,800円～9,000円 / 9,000円） */
export function formatPrice(p: { min: number; max?: number } | null): string {
  if (!p) return "—";
  const f = (n: number) => n.toLocaleString("ja-JP");
  return p.max ? `${f(p.min)}円～${f(p.max)}円` : `${f(p.min)}円`;
}
