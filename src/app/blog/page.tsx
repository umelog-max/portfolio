import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/microcms";
import { getCategoryStyle } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Blog",
  description: "エンジニアの日常・技術メモ・ラーメン探訪まで、気づいたことを書き殴るブログ。",
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-2 text-4xl font-black text-slate-900 tracking-tight fade-up">Blog</h1>
      <p className="mb-10 font-mono text-sm font-semibold tracking-widest text-white fade-up fade-up-delay-1">雑多な日記</p>

      {/* Post List */}
      {posts.length === 0 ? (
        <div className="glass-card px-5 py-10 text-center text-slate-400 text-sm fade-up fade-up-delay-2">
          まだ記事がありません
        </div>
      ) : (
        <div className="flex flex-col gap-4 fade-up fade-up-delay-2">
          {posts.map((post) => {
            const cat = getCategoryStyle(post.category);
            const tags = post.tags ? post.tags.split(",").map((t) => t.trim()) : [];
            return (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="glass-card flex flex-col gap-2 px-5 py-5 hover:bg-orange-50/50 transition-colors group"
              >
                {/* 1行目: カテゴリバッジ・日付・読了時間 */}
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-xs font-semibold px-2 py-0.5 rounded border ${cat.bg} ${cat.text} ${cat.border}`}
                  >
                    {cat.label}
                  </span>
                  <span className="font-mono text-xs text-slate-400">{post.publishedAt?.slice(0, 10) ?? "下書き"}</span>
                  <span className="font-mono text-xs text-slate-400">{post.readTime} min</span>
                </div>
                {/* 2行目: タイトル */}
                <p className="font-semibold text-slate-800 group-hover:text-orange-500 transition-colors">
                  {post.title}
                </p>
                {/* 3行目: 概要 */}
                <p className="text-sm text-slate-600 line-clamp-2">{post.excerpt}</p>
                {/* 4行目: タグ + 矢印 */}
                <div className="flex items-end justify-between gap-2 mt-1">
                  <div className="flex flex-wrap gap-1">
                    {tags.map((tag) => (
                      <span key={tag} className="text-xs text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-orange-400 group-hover:text-orange-600 transition-colors text-lg shrink-0">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
