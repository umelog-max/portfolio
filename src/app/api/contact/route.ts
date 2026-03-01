import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { NextRequest, NextResponse } from "next/server";

const ses = new SESClient({
  region: process.env.SES_REGION!,
  credentials: {
    accessKeyId: process.env.SES_ACCESS_KEY_ID!,
    secretAccessKey: process.env.SES_SECRET_ACCESS_KEY!,
  },
});

function formatJST(): string {
  return new Date().toLocaleString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 });
  }

  const toAddress = process.env.CONTACT_TO_EMAIL!;
  const fromAddress = process.env.CONTACT_FROM_EMAIL!;
  const sentAt = formatJST();

  const notifyBody = [
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "UmeBlog | 新しいお問い合わせ",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "",
    "■ お名前",
    name,
    "",
    "■ メールアドレス",
    email,
    "",
    "■ 件名",
    subject,
    "",
    "■ メッセージ",
    message,
    "",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    `送信日時: ${sentAt} (JST)`,
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  ].join("\n");

  const replyBody = [
    `${name} 様`,
    "",
    "UmeBlog へのお問い合わせありがとうございます。",
    "以下の内容でお問い合わせを受け付けました。",
    "",
    "通常 2〜3 営業日以内にご返信いたします。しばらくお待ちください。",
    "",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "■ 件名",
    subject,
    "",
    "■ メッセージ",
    message,
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "",
    "UmeBlog",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "",
    "※ このメールは自動返信です。このメールへの返信は受け付けておりません。",
  ].join("\n");

  try {
    // 管理者への通知メール
    await ses.send(
      new SendEmailCommand({
        Destination: { ToAddresses: [toAddress] },
        Message: {
          Subject: { Data: `[UmeBlog お問い合わせ] ${subject}`, Charset: "UTF-8" },
          Body: { Text: { Data: notifyBody, Charset: "UTF-8" } },
        },
        Source: fromAddress,
        ReplyToAddresses: [email],
      })
    );

    // 送信者への自動返信（SES サンドボックス環境では未検証アドレスへの送信が失敗する場合あり）
    ses.send(
      new SendEmailCommand({
        Destination: { ToAddresses: [email] },
        Message: {
          Subject: { Data: "【自動返信】お問い合わせを受け付けました", Charset: "UTF-8" },
          Body: { Text: { Data: replyBody, Charset: "UTF-8" } },
        },
        Source: fromAddress,
        ReplyToAddresses: [toAddress],
      })
    ).catch((e) => console.error("Auto-reply failed:", e));

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "送信に失敗しました" }, { status: 500 });
  }
}
