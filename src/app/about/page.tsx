import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "プロフィールと経歴",
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
  "AWS Certified Solutions Architect - Associate (SAA)",
  "AWS Certified Cloud Practitioner",
  "Microsoft Azure Fundamentals (AZ-900)",
  "普通自動車免許",
  "普通自動二輪免許",
  "食品衛生責任者",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-2 text-4xl font-black text-slate-900 tracking-tight fade-up">About</h1>
      <p className="mb-12 font-mono text-sm font-semibold tracking-widest text-white fade-up fade-up-delay-1">このサイトについて</p>

      {/* Profile Card */}
      <section className="glass-card p-8 mb-8 fade-up fade-up-delay-2">
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
              Engineer
            </p>
          </div>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Go・Python を中心としたバックエンド開発と、AWS を使ったクラウドインフラ設計・構築を得意としています。
          スケーラブルで運用しやすいシステムを作ることにこだわりを持っています。
          仕事以外では、サウナとロードバイクで気分転換しながら個人開発に取り組んでいます。
        </p>
      </section>

      {/* Career */}
      <section className="mb-8 fade-up fade-up-delay-3">
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

      {/* Certifications */}
      <section className="fade-up fade-up-delay-4">
        <h2 className="text-xl font-black text-slate-900 tracking-tight mb-6">Certifications</h2>
        <div className="glass-card p-6">
          <ul className="space-y-3">
            {certifications.map((cert) => (
              <li key={cert} className="flex items-center gap-3 text-sm text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                {cert}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
