import type { Metadata } from "next";
import Link from "next/link";
import { getWorks } from "@/lib/microcms";

export const metadata: Metadata = {
  title: "Works",
  description: "個人開発・制作実績の一覧",
};

export default async function WorksPage() {
  const works = await getWorks();

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <p className="font-mono text-xs tracking-widest text-slate-400 uppercase mb-2">Portfolio</p>
      <h1 className="mb-4 text-4xl font-black text-slate-900 tracking-tight">Works</h1>
      <p className="mb-12 text-slate-500">個人開発・制作実績</p>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {works.map((work) => (
          <Link
            key={work.id}
            href={`/works/${work.id}`}
            className="glass-card p-6 flex flex-col group"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="font-mono text-xs text-slate-400">{work.period}</span>
              <span className="text-slate-300 group-hover:text-orange-400 transition-colors text-sm">→</span>
            </div>
            <h2 className="font-bold text-slate-900 group-hover:text-orange-500 transition-colors mb-3">
              {work.title}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-4">
              {work.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {work.tags.map((tag) => (
                <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
