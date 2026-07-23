"use client";

import { useState } from "react";
import { lineUrl, site } from "@/config/site";

type Status = "idle" | "sending" | "success" | "not_configured" | "error";

const inputClass =
  "w-full rounded-xl border border-cocoa/20 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink/35 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

const serviceOptions = [
  "ベーシックケアトリミング（シャンプー）",
  "ベーシックケアトリミング（カット）",
  "ボディコンディショニング",
  "お散歩代行サポート",
  "トリミング＋ボディケア（同日）",
  "その他・相談したい",
];

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, agree: data.agree === "on" }),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
        return;
      }
      const body = (await res.json().catch(() => null)) as {
        reason?: string;
      } | null;
      setStatus(body?.reason === "not_configured" ? "not_configured" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-sage/40 bg-sagelight p-8 text-center">
        <p className="font-serif text-lg font-semibold text-cocoa">
          送信が完了しました
        </p>
        <p className="mt-3 text-sm leading-loose text-ink/85">
          お問い合わせありがとうございます。内容を確認のうえ、順次ご連絡いたします。
          <br />
          お急ぎの場合は、お電話（{site.tel}）またはLINEをご利用ください。
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
      {/* ハニーポット（ボット対策・視覚的に非表示） */}
      <div className="hidden" aria-hidden="true">
        <label>
          会社名
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-cocoa">
            お名前 <RequiredBadge />
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="tel" className="mb-1.5 block text-sm font-medium text-cocoa">
            電話番号 <RequiredBadge />
          </label>
          <input id="tel" name="tel" type="tel" required autoComplete="tel" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-cocoa">
            メールアドレス
          </label>
          <input id="email" name="email" type="email" autoComplete="email" className={inputClass} />
        </div>
        <div>
          <label htmlFor="lineName" className="mb-1.5 block text-sm font-medium text-cocoa">
            LINE表示名
          </label>
          <input id="lineName" name="lineName" type="text" className={inputClass} />
        </div>
        <div>
          <label htmlFor="city" className="mb-1.5 block text-sm font-medium text-cocoa">
            訪問先の市町村
          </label>
          <input id="city" name="city" type="text" placeholder="例：那覇市" className={inputClass} />
        </div>
        <div>
          <label htmlFor="breed" className="mb-1.5 block text-sm font-medium text-cocoa">
            犬種
          </label>
          <input id="breed" name="breed" type="text" placeholder="例：トイ・プードル" className={inputClass} />
        </div>
        <div>
          <label htmlFor="age" className="mb-1.5 block text-sm font-medium text-cocoa">
            年齢
          </label>
          <input id="age" name="age" type="text" placeholder="例：12歳" className={inputClass} />
        </div>
        <div>
          <label htmlFor="weight" className="mb-1.5 block text-sm font-medium text-cocoa">
            体重
          </label>
          <input id="weight" name="weight" type="text" placeholder="例：4kg" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="health" className="mb-1.5 block text-sm font-medium text-cocoa">
          現在の健康状態
        </label>
        <input
          id="health"
          name="health"
          type="text"
          placeholder="例：持病なし／皮膚の乾燥が気になる など"
          className={inputClass}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm font-medium text-cocoa">
            希望サービス
          </label>
          <select id="service" name="service" className={inputClass} defaultValue="">
            <option value="">選択してください</option>
            {serviceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="preferredDate" className="mb-1.5 block text-sm font-medium text-cocoa">
            希望日時
          </label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="text"
            placeholder="例：平日午前／◯月◯日ごろ"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-cocoa">
          相談内容 <RequiredBadge />
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="愛犬の様子や気になっていること、ご希望をご自由にお書きください。"
          className={inputClass}
        />
      </div>

      <div className="rounded-2xl bg-surface p-5">
        <label className="flex items-start gap-3 text-sm leading-relaxed text-ink/85">
          <input
            type="checkbox"
            name="agree"
            required
            className="mt-1 h-4 w-4 accent-brand"
          />
          <span>
            <a href="/privacy" className="underline transition hover:text-brand">
              プライバシーポリシー
            </a>
            に同意のうえ送信します <RequiredBadge />
          </span>
        </label>
      </div>

      {status === "not_configured" && (
        <div className="rounded-2xl border border-brand/40 bg-mimosa/15 p-5 text-sm leading-loose text-ink/85">
          <p className="font-semibold text-cocoa">
            現在、フォームからの送信を準備中です
          </p>
          <p className="mt-1">
            お手数ですが、
            {lineUrl ? "LINE" : "お電話"}
            でのご相談をお願いします。
            {lineUrl && (
              <>
                {" "}
                <a
                  href={lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-line underline"
                >
                  LINEで相談する
                </a>
              </>
            )}
            {" "}お電話：
            <a href={site.telLink} className="font-semibold underline">
              {site.tel}
            </a>
            （{site.businessHours.text}）
          </p>
        </div>
      )}

      {status === "error" && (
        <p className="rounded-2xl border border-brand/40 bg-mimosa/15 p-5 text-sm leading-loose text-ink/85">
          送信に失敗しました。お手数ですが、時間をおいて再度お試しいただくか、LINE・お電話（{site.tel}）でご連絡ください。
        </p>
      )}

      <div className="text-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center rounded-full bg-brand px-10 py-4 text-sm font-bold text-white shadow-md shadow-brand/20 transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 md:text-base"
        >
          {status === "sending" ? "送信中…" : "この内容で送信する"}
        </button>
      </div>
    </form>
  );
}

function RequiredBadge() {
  return (
    <span className="ml-1 rounded bg-brand/10 px-1.5 py-0.5 text-[10px] font-bold text-brand">
      必須
    </span>
  );
}
