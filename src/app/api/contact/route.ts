import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { NextRequest, NextResponse } from "next/server";

const ses = new SESClient({
  region: process.env.SES_REGION!,
  credentials: {
    accessKeyId: process.env.SES_ACCESS_KEY_ID!,
    secretAccessKey: process.env.SES_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 });
  }

  const toAddress = process.env.CONTACT_TO_EMAIL!;
  const fromAddress = process.env.CONTACT_FROM_EMAIL!;

  try {
    await ses.send(
      new SendEmailCommand({
        Destination: { ToAddresses: [toAddress] },
        Message: {
          Subject: { Data: `[Ume.log お問い合わせ] ${subject}`, Charset: "UTF-8" },
          Body: {
            Text: {
              Data: `お名前: ${name}\nメール: ${email}\n\n${message}`,
              Charset: "UTF-8",
            },
          },
        },
        Source: fromAddress,
        ReplyToAddresses: [email],
      })
    );

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "送信に失敗しました" }, { status: 500 });
  }
}
