import { NextResponse } from "next/server";

/**
 * お問い合わせフォーム送信API
 *
 * 必要な環境変数：
 * - CONTACT_EMAIL   … 送信先メールアドレス
 * - RESEND_API_KEY  … Resend のAPIキー（https://resend.com）
 * - CONTACT_FROM    … 送信元アドレス（任意。未設定時は onboarding@resend.dev）
 *
 * 環境変数が未設定の場合は 503 を返し、フロント側でLINE・電話への案内へ
 * 切り替える（送信成功を装わない）。
 */

type ContactPayload = {
  name?: string;
  tel?: string;
  email?: string;
  lineName?: string;
  city?: string;
  breed?: string;
  age?: string;
  weight?: string;
  health?: string;
  service?: string;
  preferredDate?: string;
  message?: string;
  agree?: boolean;
  /** ハニーポット（ボット対策。人間には見えない入力欄） */
  company?: string;
};

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL;

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { ok: false, reason: "invalid_request" },
      { status: 400 },
    );
  }

  // ハニーポットに入力があればボットとみなし、静かに終了
  if (payload.company) {
    return NextResponse.json({ ok: true });
  }

  if (!payload.name || !payload.tel || !payload.message || !payload.agree) {
    return NextResponse.json(
      { ok: false, reason: "missing_fields" },
      { status: 400 },
    );
  }

  if (!apiKey || !to) {
    return NextResponse.json(
      { ok: false, reason: "not_configured" },
      { status: 503 },
    );
  }

  const lines = [
    ["お名前", payload.name],
    ["電話番号", payload.tel],
    ["メールアドレス", payload.email],
    ["LINE表示名", payload.lineName],
    ["訪問先の市町村", payload.city],
    ["犬種", payload.breed],
    ["年齢", payload.age],
    ["体重", payload.weight],
    ["現在の健康状態", payload.health],
    ["希望サービス", payload.service],
    ["希望日時", payload.preferredDate],
    ["相談内容", payload.message],
  ]
    .filter(([, value]) => value)
    .map(([label, value]) => `【${label}】\n${value}`)
    .join("\n\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "onboarding@resend.dev",
      to: [to],
      reply_to: payload.email || undefined,
      subject: `【わんness】サイトからのお問い合わせ（${payload.name}様）`,
      text: `わんness公式サイトのお問い合わせフォームから送信されました。\n\n${lines}`,
    }),
  });

  if (!res.ok) {
    return NextResponse.json(
      { ok: false, reason: "send_failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
