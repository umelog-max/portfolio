import type { Metadata } from "next";
import { getPosts } from "@/lib/microcms";
import BlogFilter from "@/components/BlogFilter";

export const metadata: Metadata = {
  title: "Blog",
  description: "エンジニアの日常・技術メモ・ラーメン探訪まで、気づいたことを書き殴るブログ。",
  alternates: { canonical: "/blog" },
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-2 text-4xl font-black text-slate-900 tracking-tight fade-up">Blog</h1>
      <p className="mb-10 font-mono text-sm font-semibold tracking-widest text-white fade-up fade-up-delay-1">雑多な日記</p>

      <div className="fade-up fade-up-delay-2">
        {posts.length === 0 ? (
          <div className="glass-card px-5 py-10 text-center text-slate-400 text-sm">
            まだ記事がありません
          </div>
        ) : (
          <BlogFilter posts={posts} />
        )}
      </div>
    </div>
  );
}
