import Link from "next/link";
import Image from "next/image";
import { OutlineLink } from "@/components/ui/Buttons";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-24 text-center md:py-32">
      <Image
        src="/images/logo/logo-mark.jpg"
        alt=""
        width={96}
        height={96}
        className="h-24 w-24 rounded-full object-cover opacity-80"
      />
      <h1 className="mt-8 font-serif text-2xl font-semibold text-cocoa md:text-3xl">
        ページが見つかりませんでした
      </h1>
      <p className="mt-4 text-sm leading-loose text-ink/80 md:text-base">
        お探しのページは、移動または削除された可能性があります。
        <br />
        お手数ですが、トップページからご覧ください。
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <OutlineLink href="/">トップページへ戻る</OutlineLink>
        <Link
          href="/sitemap"
          className="text-sm text-ink/70 underline transition hover:text-brand"
        >
          サイトマップを見る
        </Link>
      </div>
    </div>
  );
}
