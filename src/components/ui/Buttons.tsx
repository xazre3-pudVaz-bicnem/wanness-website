import Link from "next/link";
import { lineUrl, site } from "@/config/site";

/** LINEアイコン（吹き出し） */
function LineIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2.5C6.201 2.5 1.5 6.354 1.5 11.108c0 4.26 3.78 7.826 8.885 8.5.346.074.817.228.936.524.107.268.07.688.034.959l-.151.91c-.047.268-.214 1.05.92.573 1.134-.478 6.118-3.604 8.348-6.17C22.063 14.71 22.5 12.985 22.5 11.107 22.5 6.354 17.799 2.5 12 2.5zM7.29 13.62H5.204a.554.554 0 0 1-.553-.553V8.891a.554.554 0 0 1 1.107 0v3.622H7.29a.554.554 0 0 1 0 1.107zm2.156-.553a.554.554 0 0 1-1.107 0V8.891a.554.554 0 0 1 1.107 0v4.176zm5.025 0a.554.554 0 0 1-.996.332l-2.138-2.91v2.578a.554.554 0 0 1-1.107 0V8.891a.554.554 0 0 1 .996-.332l2.138 2.91V8.891a.554.554 0 0 1 1.107 0v4.176zm3.375-2.642a.554.554 0 0 1 0 1.108h-1.533v.983h1.533a.554.554 0 0 1 0 1.104h-2.086a.554.554 0 0 1-.554-.553V8.891c0-.305.248-.553.554-.553h2.086a.554.554 0 0 1 0 1.107h-1.533v.983h1.533z" />
    </svg>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

type ButtonProps = {
  className?: string;
  label?: string;
};

/**
 * LINE相談ボタン。
 * NEXT_PUBLIC_LINE_URL が未設定の場合はお問い合わせページへ誘導する。
 */
export function LineButton({ className = "", label = "LINEで相談する" }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full bg-line px-7 py-3.5 text-sm font-bold text-white shadow-md shadow-line/20 transition hover:opacity-90 hover:shadow-lg md:text-base";
  if (lineUrl) {
    return (
      <a href={lineUrl} target="_blank" rel="noopener noreferrer" className={`${base} ${className}`}>
        <LineIcon className="h-5 w-5" />
        {label}
      </a>
    );
  }
  return (
    <Link href="/contact" className={`${base} ${className}`}>
      <LineIcon className="h-5 w-5" />
      ご相談はこちら
    </Link>
  );
}

/** 電話ボタン */
export function TelButton({ className = "" }: ButtonProps) {
  return (
    <a
      href={site.telLink}
      className={`inline-flex items-center justify-center gap-2 rounded-full border-2 border-brand bg-white px-7 py-3.5 text-sm font-bold text-brand transition hover:bg-brand hover:text-white md:text-base ${className}`}
    >
      <PhoneIcon className="h-4 w-4" />
      {site.tel}
    </a>
  );
}

/** 汎用のアウトラインリンクボタン */
export function OutlineLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-1 rounded-full border border-cocoa/30 bg-white/70 px-7 py-3.5 text-sm font-medium text-cocoa transition hover:border-brand hover:text-brand md:text-base ${className}`}
    >
      {children}
      <span aria-hidden="true" className="translate-y-px">→</span>
    </Link>
  );
}

export { LineIcon, PhoneIcon };
