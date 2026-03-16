"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { MicroCMSPost } from "@/lib/microcms";
import { getCategoryStyle } from "@/lib/mock-data";

export default function BlogFilter({ posts }: { posts: MicroCMSPost[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // ユニークカテゴリ一覧を抽出
  const categories = useMemo(() => {
    const labels = posts.map((p) => getCategoryStyle(p.category).label);
    return Array.from(new Set(labels)).filter(Boolean);
  }, [posts]);

  // フィルタリング
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      const cat = getCategoryStyle(post.category).label;
      if (activeCategory !== "all" && cat !== activeCategory) return false;
      if (!q) return true;
      return (
        post.title.toLowerCase().includes(q) ||
        (post.excerpt ?? "").toLowerCase().includes(q) ||
        (post.tags ?? "").toLowerCase().includes(q)
      );
    });
  }, [posts, query, activeCategory]);

  return (
    <div>
      {/* 検索バー */}
      <div className="relative mb-4">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">🔍</span>
        <input
          type="text"
          placeholder="キーワードで検索..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white/80 text-slate-800 text-sm font-medium placeholder-slate-400 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
          >
            ✕
          </button>
        )}
      </div>

      {/* カテゴリフィルター */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveCategory("all")}
            className={`font-mono text-xs font-semibold px-3 py-1 rounded-full border transition ${
              activeCategory === "all"
                ? "bg-slate-800 text-white border-slate-800"
                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
            }`}
          >
            すべて
          </button>
          {categories.map((cat) => {
            const style = getCategoryStyle(cat);
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(isActive ? "all" : cat)}
                className={`font-mono text-xs font-semibold px-3 py-1 rounded-full border transition ${
                  isActive
                    ? `${style.bg} ${style.text} ${style.border} ring-2 ring-offset-1 ring-current`
                    : `bg-white ${style.text} ${style.border} hover:${style.bg}`
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      {/* 件数表示 */}
      {(query || activeCategory !== "all") && (
        <p className="text-xs text-slate-400 font-mono mb-4">
          {filtered.length} 件 / {posts.length} 件
        </p>
      )}

      {/* 記事一覧 */}
      {filtered.length === 0 ? (
        <div className="glass-card px-5 py-10 text-center text-slate-400 text-sm">
          該当する記事がありません
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((post) => {
            const cat = getCategoryStyle(post.category);
            const tags = post.tags ? post.tags.split(",").map((t) => t.trim()) : [];
            return (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="glass-card flex flex-col gap-2 px-5 py-5 hover:bg-orange-50/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-xs font-semibold px-2 py-0.5 rounded border ${cat.bg} ${cat.text} ${cat.border}`}>
                    {cat.label}
                  </span>
                  <span className="font-mono text-xs text-slate-400">{post.publishedAt?.slice(0, 10) ?? "下書き"}</span>
                </div>
                <p className="font-semibold text-slate-800 group-hover:text-orange-500 transition-colors">
                  {post.title}
                </p>
                <p className="text-sm text-slate-600 line-clamp-2">{post.excerpt}</p>
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
