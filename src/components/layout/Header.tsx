"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { headerNav } from "@/data/navigation";
import { lineUrl, site } from "@/config/site";
import { LineIcon } from "@/components/ui/Buttons";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ページ遷移時にメニューを閉じる
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // メニュー表示中は背面のスクロールを止める
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const lineHref = lineUrl ?? "/contact";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-white/95 shadow-sm shadow-cocoa/5 backdrop-blur"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 md:h-20">
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="わんness トップページ"
        >
          <Image
            src="/images/logo/logo-mark.jpg"
            alt=""
            width={44}
            height={44}
            priority
            className="h-10 w-10 rounded-full object-cover md:h-11 md:w-11"
          />
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-lg font-bold tracking-wide text-cocoa">
              わんness
            </span>
            <span className="text-[10px] tracking-widest text-ink/60">
              出張トリミング＆ボディケア
            </span>
          </span>
        </Link>

        {/* PCナビゲーション */}
        <nav aria-label="グローバルナビゲーション" className="hidden lg:block">
          <ul className="flex items-center gap-5">
            {headerNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-sm transition hover:text-brand ${
                    pathname === item.href ? "font-semibold text-brand" : "text-ink/80"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href={lineHref}
                {...(lineUrl
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="inline-flex items-center gap-1.5 rounded-full bg-line px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
              >
                <LineIcon className="h-4 w-4" />
                LINEで相談
              </a>
            </li>
          </ul>
        </nav>

        {/* ハンバーガー */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full lg:hidden"
        >
          <span
            className={`h-0.5 w-6 rounded bg-cocoa transition-transform ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 rounded bg-cocoa transition-opacity ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 rounded bg-cocoa transition-transform ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* モバイルメニュー */}
      <div
        id="mobile-menu"
        className={`lg:hidden ${menuOpen ? "block" : "hidden"} max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-cocoa/10 bg-white`}
      >
        <nav aria-label="モバイルナビゲーション" className="px-4 py-6">
          <ul className="space-y-1">
            {[{ label: "トップページ", href: "/" }, ...headerNav].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-xl px-3 py-3 text-sm font-medium text-cocoa transition hover:bg-surface"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/first"
                className="block rounded-xl px-3 py-3 text-sm font-medium text-cocoa transition hover:bg-surface"
              >
                初めての方へ
              </Link>
            </li>
            <li>
              <Link
                href="/column"
                className="block rounded-xl px-3 py-3 text-sm font-medium text-cocoa transition hover:bg-surface"
              >
                コラム
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block rounded-xl px-3 py-3 text-sm font-medium text-cocoa transition hover:bg-surface"
              >
                お問い合わせ
              </Link>
            </li>
          </ul>
          <div className="mt-5 space-y-2 border-t border-cocoa/10 pt-5">
            <a
              href={lineHref}
              {...(lineUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex items-center justify-center gap-2 rounded-full bg-line px-5 py-3.5 text-sm font-bold text-white"
            >
              <LineIcon className="h-5 w-5" />
              LINEで相談する
            </a>
            <a
              href={site.telLink}
              className="flex items-center justify-center gap-2 rounded-full border-2 border-brand bg-white px-5 py-3 text-sm font-bold text-brand"
            >
              {site.tel}
            </a>
            <p className="text-center text-xs text-ink/60">
              営業時間 {site.businessHours.text}
            </p>
          </div>
        </nav>
      </div>
    </header>
  );
}
