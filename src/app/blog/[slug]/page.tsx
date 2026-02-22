import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, categoryStyles } from "@/lib/mock-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const cat = categoryStyles[post.category];

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-orange-500 transition-colors mb-10"
      >
        ← ブログ一覧に戻る
      </Link>

      {/* Header */}
      <div className="glass-card p-8 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <span className={`font-mono text-xs font-semibold px-2 py-0.5 rounded border ${cat.bg} ${cat.text} ${cat.border}`}>
            {cat.label}
          </span>
          <span className="font-mono text-xs text-slate-400">{post.date}</span>
          <span className="font-mono text-xs text-slate-400">{post.readTime} min read</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-snug mb-4">
          {post.title}
        </h1>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="glass-card p-8 text-slate-600 leading-relaxed">
        <p className="mb-4">{post.excerpt}</p>
        <p className="text-slate-400 text-sm font-mono border-t border-slate-100 pt-4 mt-8">
          ※ この記事は現在準備中です。microCMS と連携後に本文が表示されます。
        </p>
      </div>
    </div>
  );
}
