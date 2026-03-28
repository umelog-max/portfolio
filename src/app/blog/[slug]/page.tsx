import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/microcms";
import { getCategoryStyle } from "@/lib/mock-data";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ draftKey?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const post = await getPost(slug);
    const keywords = post.tags ? post.tags.split(",").map((t) => t.trim()) : [];
    return {
      title: post.title,
      description: post.excerpt,
      keywords,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: "article",
        publishedTime: post.publishedAt,
        url: `https://www.umeblog.com/blog/${slug}`,
        images: [{ url: "/og.png", width: 1200, height: 630, alt: post.title }],
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
        images: ["/og.png"],
      },
    };
  } catch {
    return {};
  }
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.id }));
}

export default async function BlogPostPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { draftKey } = await searchParams;

  let post;
  try {
    post = await getPost(slug, draftKey);
  } catch {
    notFound();
  }

  const cat = getCategoryStyle(post.category);
  const tags = post.tags ? post.tags.split(",").map((t) => t.trim()) : [];

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-white hover:text-orange-300 transition-colors mb-10"
      >
        ← ブログ一覧に戻る
      </Link>

      {/* Header */}
      <div className="glass-card p-8 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-xs text-slate-400">{post.publishedAt?.slice(0, 10) ?? "下書き"}</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-snug mb-4">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <span className={`font-mono text-xs font-semibold px-2 py-0.5 rounded border ${cat.bg} ${cat.text} ${cat.border}`}>
            {cat.label}
          </span>
          {tags.map((tag) => (
            <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.umeblog.com" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://www.umeblog.com/blog" },
              { "@type": "ListItem", position: 3, name: post.title, item: `https://www.umeblog.com/blog/${post.id}` },
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
            author: {
              "@type": "Person",
              name: "Umeda",
              url: "https://www.umeblog.com/about",
            },
            publisher: {
              "@type": "Organization",
              name: "Ume.Blog",
              url: "https://www.umeblog.com",
            },
            url: `https://www.umeblog.com/blog/${post.id}`,
            image: "https://www.umeblog.com/og.png",
          }),
        }}
      />

      {/* Content */}
      <div
        className="glass-card p-8 prose prose-slate max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
}
