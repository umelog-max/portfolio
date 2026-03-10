import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  const draftKey = request.nextUrl.searchParams.get("draftKey");

  if (!slug) {
    return NextResponse.json({ message: "Missing slug" }, { status: 400 });
  }

  // Next.js Draft Mode を有効化
  (await draftMode()).enable();

  // draftKey をセキュアなクッキーに保存してページ側で参照できるようにする
  if (draftKey) {
    (await cookies()).set("previewDraftKey", draftKey, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60, // 1時間
    });
  }

  // Amplify Lambda では request.nextUrl.origin が localhost になるため
  // x-forwarded-host / host ヘッダーから正しいオリジンを組み立てる
  const host =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    "www.umeblog.com";
  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  const origin = `${proto}://${host}`;

  return NextResponse.redirect(new URL(slug, origin));
}
