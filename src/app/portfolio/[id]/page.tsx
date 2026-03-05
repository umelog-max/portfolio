import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWork, getWorks } from "@/lib/microcms";

export const revalidate = 60;

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  try {
    const work = await getWork(id);
    return {
      title: work.title,
      description: work.description,
      openGraph: {
        title: work.title,
        description: work.description,
        url: `https://www.umeblog.com/portfolio/${id}`,
      },
    };
  } catch {
    return {};
  }
}

export async function generateStaticParams() {
  const works = await getWorks();
  return works.map((work) => ({ id: work.id }));
}

export default async function PortfolioDetailPage({ params }: Props) {
  const { id } = await params;

  let work;
  try {
    work = await getWork(id);
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/portfolio"
        className="inline-flex items-center gap-2 text-sm text-white hover:text-orange-300 transition-colors mb-10"
      >
        ← Portfolio 一覧に戻る
      </Link>

      {/* Header */}
      <div className="glass-card p-8 mb-6">
        {work.thumbnail && (
          <div className="relative w-full mb-6 rounded-lg overflow-hidden bg-slate-900 flex items-center justify-center">
            <Image
              src={work.thumbnail.url}
              alt={work.title}
              width={work.thumbnail.width}
              height={work.thumbnail.height}
              className="w-full h-auto"
            />
          </div>
        )}
        <span className="font-mono text-xs text-slate-400">{work.period}</span>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-snug mt-2 mb-4">
          {work.title}
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">
          {work.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {work.tags.map((tag) => (
            <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          {work.demo && (
            <a
              href={work.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition-colors"
            >
              デモを見る →
            </a>
          )}
          {work.github && (
            <a
              href={work.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg transition-colors"
            >
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* Body */}
      {work.content && (
        <div
          className="glass-card p-8 prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: work.content }}
        />
      )}
    </div>
  );
}
