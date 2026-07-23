/**
 * 犬の足跡アイコン（SVG）
 *
 * 「こんなお悩みはありませんか」などのリスト項目で使う、
 * わんnessの世界観（ナチュラル・上品・やさしい）に合わせた足跡モチーフ。
 * 色は currentColor を使うため、親要素の text-* クラスで調整する。
 */
export default function PawIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {/* 外側の指球 */}
      <ellipse cx="4.9" cy="10.4" rx="1.9" ry="2.5" transform="rotate(-24 4.9 10.4)" />
      <ellipse cx="19.1" cy="10.4" rx="1.9" ry="2.5" transform="rotate(24 19.1 10.4)" />
      {/* 内側の指球 */}
      <ellipse cx="9.3" cy="6.9" rx="2" ry="2.7" transform="rotate(-9 9.3 6.9)" />
      <ellipse cx="14.7" cy="6.9" rx="2" ry="2.7" transform="rotate(9 14.7 6.9)" />
      {/* 掌球（メインパッド） */}
      <path d="M12 11.6c2.6 0 5.1 1.7 5.4 4.2.2 1.9-1 3.4-2.6 3.9-1 .3-1.9.1-2.8-.2-.4-.1-.8-.1-1.2 0-.9.3-1.8.5-2.8.2-1.6-.5-2.8-2-2.6-3.9.3-2.5 2.8-4.2 5.4-4.2Z" />
    </svg>
  );
}

/**
 * 丸背景付きの足跡アイコン。
 * リスト項目の行頭マーカーとして使う（薄い水色の丸背景＋ブラウンの足跡）。
 */
export function PawMarker({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-skylight/70 md:h-10 md:w-10 ${className}`}
    >
      <PawIcon className="h-[17px] w-[17px] -rotate-6 text-cocoa/70 md:h-[19px] md:w-[19px]" />
    </span>
  );
}
