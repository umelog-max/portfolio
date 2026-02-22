import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/microcms";
import { categoryStyles, type PostCategory } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Blog",
  description: "技術・個人開発・日常の記録",
};

export const revalidate = 60;

const categories: { key: PostCategory | "ALL"; label: string }[] = [
  { key: "ALL", label: "ALL" },
  { key: "TECH", label: "TECH — 技術" },
  { key: "DEV", label: "DEV — 個人開発" },
  { key: "LIFE", label: "LIFE — 日常・趣味" },
];

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <p className="font-mono text-xs tracking-widest text-slate-400 uppercase mb-2">Log</p>
      <h1 className="mb-4 text-4xl font-black text-slate-900 tracking-tight">Blog</h1>
      <p className="mb-10 text-slate-500">技術・個人開発・日常の記録</p>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <span
            key={cat.key}
            className={`font-mono text-xs font-semibold px-3 py-1.5 rounded-full border cursor-pointer transition-colors ${
              cat.key === "ALL"
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-500 border-slate-200 hover:border-orange-300 hover:text-orange-500"
            }`}
          >
            {cat.label}
          </span>
        ))}
      </div>

      {/* Post List */}
      {posts.length === 0 ? (
        <div className="glass-card px-5 py-10 text-center text-slate-400 text-sm">
          まだ記事がありません
        </div>
      ) : (
        <div className="glass-card divide-y divide-slate-100">
          {posts.map((post) => {
            const cat = categoryStyles[post.category];
            const tags = post.tags ? post.tags.split(",").map((t) => t.trim()) : [];
            return (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="flex items-start gap-4 px-5 py-5 hover:bg-orange-50/50 transition-colors group"
              >
                <span
                  className={`shrink-0 font-mono text-xs font-semibold px-2 py-0.5 rounded border mt-0.5 ${cat.bg} ${cat.text} ${cat.border}`}
                >
                  {cat.label}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 group-hover:text-orange-500 transition-colors mb-1">
                    {post.title}
                  </p>
                  <p className="text-sm text-slate-400 line-clamp-1">{post.excerpt}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <span className="font-mono text-xs text-slate-400">{post.publishedAt.slice(0, 10)}</span>
                    <span className="font-mono text-xs text-slate-400">{post.readTime} min</span>
                    <div className="flex gap-1">
                      {tags.map((tag) => (
                        <span key={tag} className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-slate-300 group-hover:text-orange-400 transition-colors text-sm shrink-0 mt-1">→</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
