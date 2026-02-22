import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/microcms";
import { categoryStyles } from "@/lib/mock-data";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPost(slug);
    return { title: post.title, description: post.excerpt };
  } catch {
    return {};
  }
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.id }));
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let post;
  try {
    post = await getPost(slug);
  } catch {
    notFound();
  }

  const cat = categoryStyles[post.category];
  const tags = post.tags ? post.tags.split(",").map((t) => t.trim()) : [];

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
          <span className="font-mono text-xs text-slate-400">{post.publishedAt.slice(0, 10)}</span>
          <span className="font-mono text-xs text-slate-400">{post.readTime} min read</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-snug mb-4">
          {post.title}
        </h1>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div
        className="glass-card p-8 prose prose-slate max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
