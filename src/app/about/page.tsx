import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "バックエンド・インフラエンジニアのプロフィールと経歴",
};

const timeline = [
  {
    period: "2024年〜現在",
    role: "バックエンドエンジニア",
    company: "株式会社〇〇",
    description: "Go を用いたマイクロサービス設計・開発。AWS 上のインフラ構築・運用。Terraform による IaC 推進。",
  },
  {
    period: "2022年〜2024年",
    role: "サーバーサイドエンジニア",
    company: "株式会社△△",
    description: "Python / Django による Web アプリ開発。RDS・ElastiCache の設計・運用。",
  },
  {
    period: "2020年〜2022年",
    role: "インフラエンジニア",
    company: "株式会社□□",
    description: "オンプレ〜AWS への移行プロジェクトを担当。EC2・VPC・S3 の設計・構築。",
  },
];

const certifications = [
  { name: "AWS Certified Solutions Architect - Professional", icon: "🥇" },
  { name: "AWS Certified DevOps Engineer - Professional", icon: "🥇" },
  { name: "AWS Certified Developer - Associate", icon: "🥈" },
];

const techStacks = [
  { category: "バックエンド", items: ["Go", "Python", "Node.js", "REST API", "gRPC"] },
  { category: "インフラ / クラウド", items: ["AWS (EC2/ECS/Lambda/RDS/S3)", "Terraform", "Docker", "GitHub Actions"] },
  { category: "データベース", items: ["PostgreSQL", "MySQL", "DynamoDB", "Redis"] },
  { category: "フロントエンド", items: ["Next.js", "TypeScript", "Tailwind CSS"] },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <p className="font-mono text-xs tracking-widest text-slate-400 uppercase mb-2">Profile</p>
      <h1 className="mb-12 text-4xl font-black text-slate-900 tracking-tight">About Me</h1>

      {/* Profile Card */}
      <section className="glass-card p-8 mb-8">
        <div className="flex items-center gap-6 mb-6">
          <div
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-white text-2xl font-black"
            style={{ background: "linear-gradient(135deg, #f97316, #06b6d4)" }}
          >
            YU
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Yuta Umeda</h2>
            <p className="text-sm font-medium" style={{ color: "#f97316" }}>
              Backend & Infrastructure Engineer
            </p>
            <p className="text-sm text-slate-400 mt-1 font-mono">Tokyo, Japan · 6yr exp</p>
          </div>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Go・Python を中心としたバックエンド開発と、AWS を使ったクラウドインフラ設計・構築を得意としています。
          スケーラブルで運用しやすいシステムを作ることにこだわりを持っています。
          仕事以外では、サウナとロードバイクで気分転換しながら個人開発に取り組んでいます。
        </p>
      </section>

      {/* Career */}
      <section className="mb-8">
        <h2 className="text-xl font-black text-slate-900 tracking-tight mb-6">Career History</h2>
        <div className="glass-card p-6">
          <div className="relative">
            {timeline.map((item, index) => (
              <div key={index} className={`flex gap-4 ${index < timeline.length - 1 ? "pb-8" : ""}`}>
                <div className="flex flex-col items-center">
                  <div className="h-4 w-4 rounded-full bg-white border-2 border-slate-300 hover:border-orange-500 transition-colors shrink-0 mt-1" />
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 flex-1 bg-slate-200 mt-1" />
                  )}
                </div>
                <div>
                  <p className="font-mono text-xs text-slate-400 mb-1">{item.period}</p>
                  <h3 className="font-bold text-slate-900">{item.role}</h3>
                  <p className="text-sm text-orange-500 font-medium mb-2">{item.company}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="mb-8">
        <h2 className="text-xl font-black text-slate-900 tracking-tight mb-6">Tech Stack</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {techStacks.map((stack) => (
            <div key={stack.category} className="glass-card p-5">
              <h3 className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-3">
                {stack.category}
              </h3>
              <ul className="space-y-1.5">
                {stack.items.map((item) => (
                  <li key={item} className="text-sm text-slate-600 flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-slate-300 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section>
        <h2 className="text-xl font-black text-slate-900 tracking-tight mb-6">Certifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {certifications.map((cert) => (
            <div key={cert.name} className="glass-card p-5 text-center">
              <span className="text-3xl mb-3 block">{cert.icon}</span>
              <p className="text-xs text-slate-600 leading-relaxed">{cert.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
