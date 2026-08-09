/**
 * わんness 毎日ブログ自動生成スクリプト
 *
 * Claude API で記事を1本生成し、既存コラム（content/column/）へ
 * Markdownとして保存する。GitHub Actions（.github/workflows/daily-blog.yml）
 * から毎日実行され、mainへ直接コミット → Vercelが自動公開する。
 *
 * 使い方:
 *   ANTHROPIC_API_KEY=sk-... npx tsx scripts/generate-daily-post.ts
 *   DRY_RUN=1 npx tsx scripts/generate-daily-post.ts   ← API を呼ばず動作確認
 *
 * モデル:
 *   既定は claude-haiku-4-5-20251001（コスト削減のため）。
 *   環境変数 ANTHROPIC_MODEL が設定されている場合はそちらを優先する。
 */

import fs from "node:fs";
import path from "node:path";
import Anthropic from "@anthropic-ai/sdk";

const MODEL = process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001";
const CONTENT_DIR = path.join(process.cwd(), "content", "column");
const MAX_ATTEMPTS = 3;

/** カテゴリーは既存コラムと揃える（一覧の絞り込みに使われる） */
type Category =
  | "出張トリミング"
  | "シニアケア"
  | "皮膚・被毛ケア"
  | "身体のケア"
  | "犬との暮らし";

type Topic = {
  /** 記事テーマ（プロンプトに渡す） */
  theme: string;
  /** 固定slug（英数字とハイフンのみ）。重複防止の判定にも使う */
  slug: string;
  category: Category;
  keywords: string[];
};

/**
 * トピックプール。
 * slugが content/column/ に既に存在するテーマはスキップされるため、
 * 同じテーマが重複して生成されることはない。
 * 全テーマ消化後は、日付サフィックス付きで別アングルの記事を生成する。
 */
const TOPICS: Topic[] = [
  { theme: "沖縄の出張トリミングという選択肢", slug: "okinawa-visiting-trimming-guide", category: "出張トリミング", keywords: ["沖縄 出張トリミング", "訪問トリミング"] },
  { theme: "沖縄でのトリミング選びで大切にしたいこと", slug: "okinawa-trimming-choice", category: "出張トリミング", keywords: ["沖縄 トリミング", "トリミングサロン 選び方"] },
  { theme: "那覇市で出張トリミングを利用するメリット", slug: "naha-visiting-trimming", category: "出張トリミング", keywords: ["那覇 出張トリミング", "那覇 トリミング"] },
  { theme: "浦添市で出張トリミングを利用するには", slug: "urasoe-visiting-trimming", category: "出張トリミング", keywords: ["浦添 出張トリミング", "浦添 トリミング"] },
  { theme: "宜野湾市で出張トリミングを利用するには", slug: "ginowan-visiting-trimming", category: "出張トリミング", keywords: ["宜野湾 出張トリミング", "宜野湾 トリミング"] },
  { theme: "沖縄本島の犬のトリミング事情と訪問型ケア", slug: "okinawa-honto-dog-trimming", category: "出張トリミング", keywords: ["沖縄本島 犬 トリミング", "沖縄 出張トリマー"] },
  { theme: "出張トリミングとは（基本のしくみ）", slug: "what-is-visiting-trimming", category: "出張トリミング", keywords: ["出張トリミングとは"] },
  { theme: "出張トリミングのメリットまとめ", slug: "visiting-trimming-merits", category: "出張トリミング", keywords: ["出張トリミング メリット"] },
  { theme: "自宅で犬のトリミングを受けるメリット", slug: "home-trimming-merits", category: "出張トリミング", keywords: ["自宅 犬 トリミング", "自宅でトリミング"] },
  { theme: "シニア犬と出張トリミング", slug: "senior-dog-visiting-trimming", category: "シニアケア", keywords: ["シニア犬 出張トリミング", "老犬 トリミング"] },
  { theme: "高齢犬のトリミングで気をつけたいこと", slug: "senior-dog-trimming", category: "シニアケア", keywords: ["高齢犬 トリミング"] },
  { theme: "病気や体調に不安のある犬のトリミングとの向き合い方", slug: "sick-dog-trimming-care", category: "シニアケア", keywords: ["病気の犬 トリミング", "持病 犬 トリミング"] },
  { theme: "大型犬と出張トリミング", slug: "large-dog-visiting-trimming", category: "出張トリミング", keywords: ["大型犬 出張トリミング", "大型犬 トリミング"] },
  { theme: "多頭飼いのご家庭と出張トリミング", slug: "multiple-dogs-visiting-trimming", category: "出張トリミング", keywords: ["多頭飼い 出張トリミング"] },
  { theme: "子犬の初めてのトリミング", slug: "puppy-first-trimming", category: "犬との暮らし", keywords: ["子犬 初めてのトリミング", "パピー トリミング"] },
  { theme: "犬の爪切りの大切さと自宅での注意点", slug: "dog-nail-care", category: "犬との暮らし", keywords: ["犬 爪切り"] },
  { theme: "犬の足裏カットが必要な理由", slug: "dog-paw-pad-care", category: "犬との暮らし", keywords: ["犬 足裏カット", "犬 足裏の毛"] },
  { theme: "犬の肛門腺絞りの基礎知識", slug: "dog-anal-gland-care", category: "犬との暮らし", keywords: ["犬 肛門腺絞り", "犬 肛門腺"] },
  { theme: "犬のシャンプー頻度の考え方", slug: "dog-shampoo-frequency", category: "皮膚・被毛ケア", keywords: ["犬 シャンプー頻度"] },
  { theme: "犬の毛玉対策", slug: "dog-matted-hair-care", category: "皮膚・被毛ケア", keywords: ["犬 毛玉対策", "犬 毛玉 取り方"] },
  { theme: "犬の抜け毛対策", slug: "dog-shedding-care", category: "皮膚・被毛ケア", keywords: ["犬 抜け毛対策", "犬 換毛期"] },
  { theme: "トリミングが苦手な犬への配慮", slug: "trimming-shy-dog-care", category: "犬との暮らし", keywords: ["トリミング 苦手 犬", "トリミング 嫌がる"] },
  { theme: "サロンに連れて行けない犬のトリミングという課題", slug: "cannot-go-salon-trimming", category: "出張トリミング", keywords: ["トリミングサロンに行けない", "サロン 連れて行けない"] },
  { theme: "車移動が苦手な犬のケア", slug: "car-shy-dog-care", category: "犬との暮らし", keywords: ["犬 車移動 苦手", "犬 車酔い"] },
  { theme: "飼い主が忙しいときのトリミングの工夫", slug: "busy-owner-trimming", category: "出張トリミング", keywords: ["忙しい トリミング 送迎", "トリミング 時間がない"] },
  { theme: "沖縄の暑さと犬の被毛ケア", slug: "okinawa-heat-coat-care", category: "皮膚・被毛ケア", keywords: ["沖縄 犬 暑さ対策", "犬 被毛ケア"] },
  { theme: "梅雨時期の犬の皮膚ケア", slug: "rainy-season-skin-care", category: "皮膚・被毛ケア", keywords: ["梅雨 犬 皮膚", "犬 湿気 皮膚ケア"] },
  { theme: "夏場の犬のトリミングで意識したいこと", slug: "summer-dog-trimming", category: "皮膚・被毛ケア", keywords: ["夏 犬 トリミング", "犬 サマーカット"] },
  { theme: "自宅トリミングとサロントリミングの違い", slug: "home-vs-salon-trimming", category: "出張トリミング", keywords: ["自宅トリミング サロン 違い"] },
  { theme: "犬のトリミング前に準備しておきたいこと", slug: "trimming-preparation", category: "出張トリミング", keywords: ["トリミング 前 準備"] },
  { theme: "出張トリミングの流れ", slug: "visiting-trimming-flow", category: "出張トリミング", keywords: ["出張トリミング 流れ"] },
  { theme: "出張トリミングを依頼する前の確認ポイント", slug: "visiting-trimming-checklist", category: "出張トリミング", keywords: ["出張トリミング 確認", "出張トリミング 選び方"] },
];

/** カテゴリー別のサムネイル候補（public内の実在画像のみ） */
const THUMBNAILS: Record<Category, string[]> = {
  出張トリミング: [
    "/images/trimming/clipper-poodle.jpg",
    "/images/trimming/ear-trim.jpg",
    "/images/trimming/comb-bichon.jpg",
    "/images/trimming/after-flowers.jpg",
  ],
  シニアケア: [
    "/images/care/senior-golden-face.jpg",
    "/images/care/golden-check.jpg",
    "/images/care/golden-hold.jpg",
  ],
  "皮膚・被毛ケア": [
    "/images/trimming/bath-shower.jpg",
    "/images/trimming/face-wash.jpg",
    "/images/trimming/bath-smile.jpg",
  ],
  身体のケア: [
    "/images/care/golden-back-care.jpg",
    "/images/care/golden-stretch.jpg",
    "/images/care/golden-relax.jpg",
  ],
  犬との暮らし: [
    "/images/trimming/bichon-table.jpg",
    "/images/trimming/paw-care.jpg",
    "/images/trimming/after-mix.jpg",
  ],
};

/** サイトの事実情報。記事内容がこれと矛盾しないようプロンプトへ渡す */
const SITE_FACTS = `
- 事業名: わんness（ワンネス）。沖縄県那覇市牧志を拠点とする出張トリミング＆犬のボディケア専門
- サイトURL: https://www.wan1ness.com
- 対応エリア: 那覇市を中心とした沖縄本島全域（浦添市・宜野湾市・豊見城市・南風原町・西原町・北谷町・沖縄市・うるま市など）。地域や日程によっては対応が難しい場合がある
- 基本コースは「ベーシックケアトリミング」: シャンプー・カットに加え、身体の左右差や筋肉の付き方・可動域の確認、皮膚と被毛に合わせたスキンケア、爪切り・耳そうじ・足裏/足まわりカット・肛門腺しぼりまで含む
- そのほかのメニュー: ボディコンディショニング（30分）、お散歩代行サポート、オプション（スキンケアコース/ボディコンディショニングコース/ウェルネスケアコース）
- 営業: 完全予約制。営業時間は火・水・日曜日 9:00～22:00、その他の曜日・時間帯は要相談
- 予約・相談はLINEが最優先。電話も可
- 出張は軽自動車で伺う。那覇市内・牧志2丁目から5km以内は出張費無料、超過分は1kmにつき100円
- 代表: 佐々木那菜（トリマー・犬の理学療法インストラクター師範）。第一種動物取扱業登録済み（沖動保第1435号）
- サイト内では犬のことを「わんちゃん」、飼い主の犬を「愛犬ちゃん」と表記する
- 医療行為・治療は行わない。体調や持病がある子は、かかりつけの獣医師さんへの相談を促す
`.trim();

/** 実在する内部リンク先（存在するページのみ） */
const INTERNAL_LINKS = `
- /basic-care …… ベーシックケアトリミングの詳細
- /visiting-trimming …… 出張トリミングの詳細
- /body-care …… ボディコンディショニング・お散歩代行
- /price …… 料金案内（犬種別料金・オプション・出張費）
- /area …… 対応エリア・出張費
- /flow …… ご利用の流れ
- /first …… 初めての方へ（当日の準備・お願い）
- /faq …… よくある質問
- /contact …… お問い合わせ・ご予約
`.trim();

/** 公開前チェック: 断定・誇大・医療表現をブロックする */
const BANNED_PATTERNS: RegExp[] = [
  /治り(ます|ました)/,
  /完治/,
  /必ず(治|きれい|よくな)/,
  /絶対(に)?(安全|大丈夫|きれい)/,
  /診断(し|でき)ます/,
  /治療(し|でき)ます/,
  /改善(し|され|でき)ます/,
  /予防できます/,
  /免疫力が(上がり|アップ)/,
  /沖縄(で|県内)?(一番|No\.?1|ナンバーワン|唯一|初)/i,
  /100[%％]/,
];

function todayJst(): { iso: string; compact: string } {
  const now = new Date(Date.now() + 9 * 60 * 60 * 1000);
  const iso = now.toISOString().slice(0, 10);
  return { iso, compact: iso.replaceAll("-", "") };
}

function existingSlugs(): Set<string> {
  if (!fs.existsSync(CONTENT_DIR)) return new Set();
  return new Set(
    fs
      .readdirSync(CONTENT_DIR)
      .filter((f) => f.endsWith(".md"))
      .map((f) => f.replace(/\.md$/, "")),
  );
}

function pickTopic(): { topic: Topic; slug: string; freshAngle: boolean } {
  const used = existingSlugs();
  const unused = TOPICS.filter((t) => !used.has(t.slug));
  if (unused.length > 0) {
    const topic = unused[Math.floor(Math.random() * unused.length)];
    return { topic, slug: topic.slug, freshAngle: false };
  }
  // 全テーマ消化後: 別アングルで再訪（slugに日付を付けて重複回避）
  const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];
  return { topic, slug: `${topic.slug}-${todayJst().compact}`, freshAngle: true };
}

function buildPrompt(topic: Topic, freshAngle: boolean): string {
  return `あなたは沖縄県那覇市の出張トリミング「わんness」の公式ブログを執筆する、経験豊富なトリマー兼ライターです。以下の条件で記事を1本書いてください。

【テーマ】
${topic.theme}${freshAngle ? "（過去に同テーマの記事があるため、切り口・構成・具体例を変えた別アングルの記事にすること）" : ""}

【対策キーワード】
${topic.keywords.join(" / ")}（本文の見出しや文中に不自然にならない範囲で自然に含める。羅列や過剰な繰り返しは禁止）

【サイトの事実情報（矛盾する内容を書かない）】
${SITE_FACTS}

【内部リンク（この中から2〜3個だけ、本文の流れに合う箇所へMarkdownリンクとして自然に入れる）】
${INTERNAL_LINKS}

【文章の条件】
- 日本語。全体で2,000〜3,000文字程度
- 構成: 導入文（150〜250字。読者の悩みに寄り添う）→ H2見出し3〜5個（必要に応じてH3）→ まとめ（H2「まとめ」）
- ペットサービスらしい、やさしく自然な語り口。です・ます調
- 犬は「わんちゃん」、読者の犬は「愛犬ちゃん」と表記する
- AIっぽい定型文（「いかがでしたか」「〜について解説します。それでは見ていきましょう」等）は禁止
- 根拠のないNo.1表現・「沖縄で一番」「唯一」などの断定は禁止。過剰な煽りも禁止
- 医療断定表現（治る・改善する・診断・治療・予防できる等）は禁止。皮膚トラブル・持病・投薬中・ケガ等に触れる場合は、かかりつけの動物病院・獣医師さんへの相談を促す
- 料金の具体的な金額、施術時間、対応可否を断定しない。料金の話題は /price へ誘導する
- わんちゃんの体調・性格・年齢によって対応が変わる可能性を自然に含める
- 沖縄・那覇などの地域性（気候・暮らし）をテーマに合う範囲で織り込む

【出力形式】
次のJSONだけを出力してください。コードブロックや説明文は不要です。
{
  "title": "記事タイトル（32字以内。キーワードを自然に含む）",
  "description": "メタディスクリプション（80〜120字）",
  "tags": ["タグ1", "タグ2", "タグ3"],
  "body": "Markdown本文（frontmatterなし・タイトルのH1なし・H2から始める。導入文はH2より前に書く）"
}`;
}

function extractJson(text: string): { title: string; description: string; tags: string[]; body: string } {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("モデル出力からJSONを抽出できませんでした");
  }
  const parsed = JSON.parse(text.slice(start, end + 1));
  if (!parsed.title || !parsed.description || !parsed.body) {
    throw new Error("JSONに必須フィールド（title/description/body）がありません");
  }
  return {
    title: String(parsed.title).trim(),
    description: String(parsed.description).trim(),
    tags: Array.isArray(parsed.tags) ? parsed.tags.map(String).slice(0, 6) : [],
    body: String(parsed.body).trim(),
  };
}

function validate(article: { title: string; description: string; body: string }): string | null {
  const full = `${article.title}\n${article.description}\n${article.body}`;
  for (const pattern of BANNED_PATTERNS) {
    const match = full.match(pattern);
    if (match) return `禁止表現を検出: 「${match[0]}」`;
  }
  if (article.body.length < 1200) {
    return `本文が短すぎます（${article.body.length}文字）`;
  }
  if (!/^##\s/m.test(article.body)) {
    return "H2見出しがありません";
  }
  return null;
}

function pickThumbnail(category: Category, slug: string): string {
  const pool = THUMBNAILS[category];
  // slugから安定的に選ぶ（同カテゴリー内でばらける）
  const hash = [...slug].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return pool[hash % pool.length];
}

function composeMarkdown(
  topic: Topic,
  slug: string,
  article: { title: string; description: string; tags: string[]; body: string },
): string {
  const { iso } = todayJst();
  const quote = (s: string) => JSON.stringify(s);
  const tags = article.tags.length > 0 ? article.tags : topic.keywords;
  return `---
title: ${quote(article.title)}
slug: ${slug}
description: ${quote(article.description)}
date: "${iso}"
publishedAt: "${iso}"
category: ${topic.category}
tags:
${tags.map((t) => `  - ${quote(t)}`).join("\n")}
author: 佐々木 那菜
thumbnail: ${pickThumbnail(topic.category, slug)}
relatedKeywords:
${topic.keywords.map((k) => `  - ${quote(k)}`).join("\n")}
---

${article.body}
`;
}

async function main() {
  const { topic, slug, freshAngle } = pickTopic();
  console.log(`model: ${MODEL}`);
  console.log(`topic: ${topic.theme}`);
  console.log(`slug: ${slug}`);

  if (process.env.DRY_RUN) {
    console.log("DRY_RUN のためAPI呼び出しをスキップしました（ファイルは生成されません）");
    return;
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("ERROR: 環境変数 ANTHROPIC_API_KEY が設定されていません");
    process.exit(1);
  }

  const client = new Anthropic();
  const prompt = buildPrompt(topic, freshAngle);

  let lastError = "";
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    console.log(`generate attempt ${attempt}/${MAX_ATTEMPTS} ...`);
    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content:
            attempt === 1
              ? prompt
              : `${prompt}\n\n【前回の出力の問題点（必ず修正すること）】\n${lastError}`,
        },
      ],
    });

    const text = response.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("");

    let article;
    try {
      article = extractJson(text);
    } catch (error) {
      lastError = `出力形式エラー: ${(error as Error).message}。指定のJSON形式だけを出力すること。`;
      console.warn(lastError);
      continue;
    }

    const problem = validate(article);
    if (problem) {
      lastError = problem;
      console.warn(`validation failed: ${problem}`);
      continue;
    }

    fs.mkdirSync(CONTENT_DIR, { recursive: true });
    const filePath = path.join(CONTENT_DIR, `${slug}.md`);
    fs.writeFileSync(filePath, composeMarkdown(topic, slug, article), "utf-8");
    console.log(`generated: content/column/${slug}.md`);
    console.log(`title: ${article.title}`);
    console.log(`chars: ${article.body.length}`);
    return;
  }

  console.error(`ERROR: ${MAX_ATTEMPTS}回試行しましたが有効な記事を生成できませんでした（${lastError}）`);
  process.exit(1);
}

main().catch((error) => {
  console.error("ERROR:", error);
  process.exit(1);
});
