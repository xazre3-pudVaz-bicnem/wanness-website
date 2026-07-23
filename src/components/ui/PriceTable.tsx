import { priceRows, priceNotes, formatPrice, type PriceRow } from "@/data/pricing";

/**
 * 料金表。
 * md以上はテーブル、スマートフォンでは犬種ごとのカード表示に切り替え、
 * 画面外へのはみ出しを防ぐ。
 */
export default function PriceTable({ rows = priceRows }: { rows?: PriceRow[] }) {
  return (
    <div>
      {/* PC・タブレット：テーブル */}
      <div className="hidden overflow-hidden rounded-2xl border border-cocoa/10 md:block">
        <table className="w-full border-collapse bg-white text-left">
          <caption className="sr-only">
            ベーシックケアトリミング 犬種別料金表
          </caption>
          <thead>
            <tr className="bg-surface text-sm text-cocoa">
              <th scope="col" className="px-6 py-4 font-semibold">
                犬種
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                シャンプーコース
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                カットコース
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.breeds.join("-")}
                className="border-t border-cocoa/10 text-sm"
              >
                <th scope="row" className="px-6 py-4 font-medium text-cocoa">
                  {row.breeds.join("、")}
                </th>
                <td className="px-6 py-4 tabular-nums">{formatPrice(row.shampoo)}</td>
                <td className="px-6 py-4 tabular-nums">{formatPrice(row.cut)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* スマートフォン：カード表示 */}
      <ul className="space-y-3 md:hidden">
        {rows.map((row) => (
          <li
            key={row.breeds.join("-")}
            className="rounded-2xl border border-cocoa/10 bg-white p-5"
          >
            <p className="font-medium leading-relaxed text-cocoa">
              {row.breeds.join("、")}
            </p>
            <dl className="mt-3 space-y-1.5 text-sm">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-ink/70">シャンプーコース</dt>
                <dd className="font-semibold tabular-nums text-cocoa">
                  {formatPrice(row.shampoo)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-ink/70">カットコース</dt>
                <dd className="font-semibold tabular-nums text-cocoa">
                  {formatPrice(row.cut)}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>

      <ul className="mt-6 space-y-1.5 text-xs leading-relaxed text-ink/70">
        {priceNotes.map((note) => (
          <li key={note} className="flex gap-2">
            <span aria-hidden="true">※</span>
            {note}
          </li>
        ))}
      </ul>
    </div>
  );
}
