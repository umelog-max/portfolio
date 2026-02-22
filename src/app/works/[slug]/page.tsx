import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { works } from "@/lib/mock-data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) return {};
  return { title: work.title, description: work.description };
}

export async function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const work = works.find((w) => w.slug === slug);
  if (!work) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href="/works"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-orange-500 transition-colors mb-10"
      >
        ← Works 一覧に戻る
      </Link>

      <div className="glass-card p-8 mb-6">
        <p className="font-mono text-xs text-slate-400 mb-3">{work.period}</p>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-6">{work.title}</h1>
        <div className="flex flex-wrap gap-2 mb-6">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-3 py-1 rounded-full"
              style={{ background: "#fff7ed", color: "#ea580c", border: "1px solid #fed7aa" }}
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="text-slate-600 leading-relaxed">{work.description}</p>
      </div>

      {(work.github || work.demo) && (
        <div className="flex gap-3">
          {work.github && (
            <a
              href={work.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              GitHub →
            </a>
          )}
          {work.demo && (
            <a
              href={work.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              デモを見る →
            </a>
          )}
        </div>
      )}
    </div>
  );
}
