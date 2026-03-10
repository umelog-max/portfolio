import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  const draftKey = request.nextUrl.searchParams.get("draftKey");

  if (!slug) {
    return NextResponse.json({ message: "Missing slug" }, { status: 400 });
  }

  // Amplify Lambda では request.nextUrl.origin が localhost になるため
  // x-forwarded-host / host ヘッダーから正しいオリジンを組み立てる
  const host =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    "www.umeblog.com";
  const proto = request.headers.get("x-forwarded-proto") ?? "https";

  const redirectUrl = new URL(slug, `${proto}://${host}`);
  if (draftKey) {
    redirectUrl.searchParams.set("draftKey", draftKey);
  }

  return NextResponse.redirect(redirectUrl);
}
