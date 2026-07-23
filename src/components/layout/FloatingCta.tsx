import { lineUrl, site } from "@/config/site";
import { LineIcon, PhoneIcon } from "@/components/ui/Buttons";
import Link from "next/link";

/**
 * スマートフォン：下部固定の「LINEで相談」「電話する」バー
 * PC：右下の小さなLINE相談ボタン
 */
export default function FloatingCta() {
  return (
    <>
      {/* スマートフォン */}
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-px border-t border-cocoa/10 bg-cocoa/10 md:hidden">
        {lineUrl ? (
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-line py-4 text-sm font-bold text-white"
          >
            <LineIcon className="h-5 w-5" />
            LINEで相談
          </a>
        ) : (
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 bg-line py-4 text-sm font-bold text-white"
          >
            <LineIcon className="h-5 w-5" />
            ご相談はこちら
          </Link>
        )}
        <a
          href={site.telLink}
          className="flex items-center justify-center gap-2 bg-brand py-4 text-sm font-bold text-white"
        >
          <PhoneIcon className="h-4 w-4" />
          電話する
        </a>
      </div>

      {/* PC：右下のLINEボタン */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        {lineUrl ? (
          <a
            href={lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-line px-5 py-3 text-sm font-bold text-white shadow-lg shadow-line/25 transition hover:scale-105"
          >
            <LineIcon className="h-5 w-5" />
            LINEで相談
          </a>
        ) : (
          <Link
            href="/contact"
            className="flex items-center gap-2 rounded-full bg-line px-5 py-3 text-sm font-bold text-white shadow-lg shadow-line/25 transition hover:scale-105"
          >
            <LineIcon className="h-5 w-5" />
            ご相談はこちら
          </Link>
        )}
      </div>
    </>
  );
}
