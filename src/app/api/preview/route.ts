import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
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

  redirect(slug);
}
