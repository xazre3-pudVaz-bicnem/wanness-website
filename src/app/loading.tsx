import Image from "next/image";
import PawIcon from "@/components/ui/PawIcon";

/** ページ読み込み中の表示（ロゴ＋足跡の控えめなアニメーション） */
export default function Loading() {
  return (
    <div
      className="flex min-h-[70svh] flex-col items-center justify-center gap-6 bg-cream px-4"
      role="status"
      aria-label="読み込み中"
    >
      <div className="loading-logo">
        <Image
          src="/images/logo/logo-mark.jpg"
          alt=""
          width={112}
          height={112}
          priority
          className="h-24 w-24 rounded-full object-cover shadow-lg shadow-brand/10 md:h-28 md:w-28"
        />
      </div>
      <p className="font-serif text-xl font-bold tracking-wide text-cocoa">
        わんness
      </p>
      <div className="flex items-center gap-2.5" aria-hidden="true">
        <PawIcon className="loading-paw h-4 w-4 -rotate-12 text-brand" />
        <PawIcon className="loading-paw h-4 w-4 text-brand" />
        <PawIcon className="loading-paw h-4 w-4 rotate-12 text-brand" />
      </div>
      <span className="sr-only">読み込み中です</span>
    </div>
  );
}
