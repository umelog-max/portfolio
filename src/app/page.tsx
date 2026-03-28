import type { Metadata } from "next";
import Link from "next/link";
import PixelBg from "@/components/PixelBg";
import HomeTitle from "@/components/HomeTitle";
import TiltCard from "@/components/TiltCard";
import { getPosts } from "@/lib/microcms";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const sections = [
  { href: "/about",     label: "About",     description: "このサイトについて",   bgColor: "#F5E6C3" },
  { href: "/portfolio", label: "Portfolio",  description: "個人開発・制作実績",   bgColor: "#FFFFFF" },
  { href: "/blog",      label: "Blog",       description: "日常の記録",           bgColor: "#F5D66A" },
];

export default async function Home() {
  let latestPosts: Awaited<ReturnType<typeof getPosts>> = [];
  try {
    const all = await getPosts();
    latestPosts = all.slice(0, 3);
  } catch {
    // microCMS取得失敗時はセクション非表示
  }

  return (
    <>
      <PixelBg />

      {/* ヒーローセクション */}
      <div className="mx-auto max-w-3xl px-6 pt-12 sm:pt-0 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">
        <HomeTitle />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
          {sections.map((section, i) => (
            <div key={section.href} className={`fade-up fade-up-delay-${i + 2}`}>
              <TiltCard {...section} />
            </div>
          ))}
        </div>
      </div>

      {/* サイト紹介 + 最新記事 */}
      <div className="mx-auto max-w-3xl px-6 pb-24">

        {/* 一言紹介 */}
        <section className="glass-card p-6 mb-8 text-center">
          <p className="text-base leading-relaxed" style={{ color: "#333" }}>
            気づいたらラーメン屋の前にいるエンジニア <strong>Ume</strong> が、技術と日常を書き殴るブログ。
          </p>
          <p className="text-sm mt-2" style={{ color: "#555" }}>
            インフラ・個人開発・日常のことを気ままに発信しています。
          </p>
        </section>

        {/* 最新記事 */}
        {latestPosts.length > 0 && (
          <section>
            <h2 className="text-lg font-black mb-4 tracking-tight" style={{ color: "#1A1A1A" }}>
              最新記事
            </h2>
            <div className="flex flex-col gap-3">
              {latestPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.id}`}
                  className="glass-card p-4 block hover:opacity-80 transition-opacity"
                >
                  <div className="text-xs mb-1" style={{ color: "#888" }}>
                    {new Date(post.publishedAt).toLocaleDateString("ja-JP", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="font-bold text-sm sm:text-base" style={{ color: "#1A1A1A" }}>
                    {post.title}
                  </div>
                  {post.excerpt && (
                    <div className="text-xs mt-1 line-clamp-2" style={{ color: "#555" }}>
                      {post.excerpt}
                    </div>
                  )}
                </Link>
              ))}
            </div>
            <div className="mt-4 text-right">
              <Link
                href="/blog"
                className="text-sm font-bold hover:opacity-70 transition-opacity"
                style={{ color: "#E85544" }}
              >
                すべての記事を見る →
              </Link>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
