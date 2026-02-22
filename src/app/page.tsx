import Link from "next/link";
import { posts, works, categoryStyles } from "@/lib/mock-data";

const skills = [
  { name: "Go", percent: 80 },
  { name: "AWS", percent: 85 },
  { name: "Terraform", percent: 70 },
  { name: "Python", percent: 72 },
  { name: "Docker", percent: 75 },
  { name: "Next.js", percent: 65 },
];

export default function Home() {
  const recentLogs = posts.slice(0, 5);
  const featuredWorks = works.slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">

      {/* Hero */}
      <section className="py-16">
        <p className="mb-3 font-mono text-xs tracking-widest text-slate-400 uppercase">
          Backend & Infrastructure Engineer
        </p>
        <h1 className="mb-5 text-5xl font-black text-slate-900 leading-tight tracking-tighter">
          コードで、インフラで、<br />
          <span className="gradient-text">価値をつくる。</span>
        </h1>
        <p className="mb-8 max-w-lg text-base text-slate-500 leading-relaxed">
          Go・Python でバックエンドを設計し、AWS でスケーラブルなインフラを構築するエンジニアです。
          日々の学びや趣味もここに残していきます。
        </p>
        <div className="flex gap-3">
          <Link href="/works" className="btn-primary">
            Works を見る →
          </Link>
          <Link href="/blog" className="btn-secondary">
            ログを読む
          </Link>
        </div>
      </section>

      {/* 2カラム: Works + Skills */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">

        {/* Recent Works */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-black text-slate-900 tracking-tight">WORKS</h2>
            <Link href="/works" className="text-xs text-orange-500 hover:text-orange-600 font-medium transition-colors">
              ALL →
            </Link>
          </div>
          <div className="space-y-3">
            {featuredWorks.map((work) => (
              <Link
                key={work.slug}
                href={`/works/${work.slug}`}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-orange-50 transition-colors group"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800 group-hover:text-orange-500 transition-colors">
                    {work.title}
                  </p>
                  <div className="flex gap-1 mt-1">
                    {work.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="text-slate-300 group-hover:text-orange-400 transition-colors text-sm">→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="glass-card p-6">
          <h2 className="font-black text-slate-900 tracking-tight mb-5">SKILLS</h2>
          <div className="space-y-3">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">{skill.name}</span>
                  <span className="font-mono text-xs text-slate-400">{skill.percent}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${skill.percent}%`,
                      background: "linear-gradient(90deg, #f97316, #06b6d4)",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Logs */}
      <section className="py-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-black text-slate-900 tracking-tight">RECENT LOGS</h2>
          <Link href="/blog" className="text-xs text-orange-500 hover:text-orange-600 font-medium transition-colors">
            ALL LOGS →
          </Link>
        </div>
        <div className="glass-card divide-y divide-slate-100">
          {recentLogs.map((post) => {
            const cat = categoryStyles[post.category];
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex items-center gap-4 px-5 py-4 hover:bg-orange-50/50 transition-colors group"
              >
                <span className={`shrink-0 font-mono text-xs font-semibold px-2 py-0.5 rounded border ${cat.bg} ${cat.text} ${cat.border}`}>
                  {cat.label}
                </span>
                <span className="flex-1 text-sm font-medium text-slate-700 group-hover:text-orange-500 transition-colors">
                  {post.title}
                </span>
                <span className="hidden sm:block shrink-0 font-mono text-xs text-slate-400">
                  {post.date}
                </span>
                <span className="text-slate-300 group-hover:text-orange-400 transition-colors text-sm shrink-0">→</span>
              </Link>
            );
          })}
        </div>
      </section>

    </div>
  );
}
