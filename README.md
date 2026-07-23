# わんness 公式サイト

沖縄県那覇市を拠点とする出張トリミング＆ボディケア「わんness」の公式サイト。

## 技術構成

- Next.js（App Router）+ TypeScript
- Tailwind CSS v4
- コラム記事：Markdown（`content/column/*.md`）

## 開発

```bash
npm install
npm run dev    # 開発サーバー
npm run lint   # ESLint
npm run build  # 本番ビルド
```

## 環境変数

`.env.example` を `.env.local` にコピーして設定する。

| 変数 | 用途 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 本番URL（canonical / OGP / sitemap） |
| `NEXT_PUBLIC_LINE_URL` | 公式LINEのURL。未設定時、LINEボタンは電話・フォーム案内に切り替わる |
| `CONTACT_EMAIL` | フォームの送信先メールアドレス |
| `RESEND_API_KEY` | Resend のAPIキー（フォーム送信用） |
| `CONTACT_FROM` | Resend の送信元アドレス（任意） |

フォームは `CONTACT_EMAIL` と `RESEND_API_KEY` の両方が設定されるまで、送信時にLINE・電話への案内を表示する（送信成功を装わない）。

## よく編集するファイル

| 内容 | ファイル |
| --- | --- |
| 電話・住所・営業時間・SNS・動物取扱業登録 | `src/config/site.ts` |
| 料金（トリミング・ボディケア・出張費の注記） | `src/data/pricing.ts`（資料間差異のメモあり） |
| よくある質問 | `src/data/faq.ts` |
| 対応エリア | `src/data/areas.ts` |
| サービス紹介 | `src/data/services.ts` |
| ナビゲーション | `src/data/navigation.ts` |

## コラム記事の追加

`content/column/` に Markdown ファイルを追加するだけで、一覧・詳細・サイトマップへ自動反映される。フロントマターの必須項目は `title` / `slug` / `description` / `publishedAt` / `category` / `tags` / `author`。任意で `updatedAt` / `thumbnail` / `relatedKeywords`。

GitHub Actions + Claude API による自動投稿は、Markdown を生成してこのディレクトリへコミットする形で追加可能。

## 画像

`public/images/` 配下に整理済み（`logo/` `flyer/` `care/` `trimming/`）。
`public/LINE_ALBUM_～.jpg` は納品時の元素材（重複含む）。
