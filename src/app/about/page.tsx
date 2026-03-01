import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "このサイトについて・経験案件・資格一覧",
};

const timeline = [
  {
    period: "経験案件1",
    role: "PMO補佐、サーバー保守",
    project: "大規模官公庁プロジェクト",
    description: "Linuxサーバーの保守、ヘルプデスク、エンドユーザー対応、エンドユーザー向けマニュアルの作成",
  },
  {
    period: "経験案件2",
    role: "サーバー構築、テスト",
    project: "Avaya製品での音声基盤構築",
    description: "Avaya製品の構築（ACM、CMS、AgentMAP、CMSWebService、AMS、AES、SMGR、WebLM）",
  },
  {
    period: "経験案件3",
    role: "DB管理",
    project: "Grafanaを用いたリソース可視化推進業務",
    description: "Grafanaの運用保守",
  },
  {
    period: "経験案件4",
    role: "社内SE（他社）",
    project: "Microsoft Entra IDプロジェクト支援",
    description: "Microsoft Entra IDを中心とした認証に関する新機能の導入や既存機能、サービスの改善作業、プロジェクトPM支援、各機能利用プロセスの改善支援、新機能・新サービスの調査、動作検証、調査・検証結果まとめ",
  },
  {
    period: "経験案件5",
    role: "SNSマーケター",
    project: "Instagramの運用代行",
    description: "コンテンツの提案作成から数値分析まで（フォロワー400から2000まで増加）",
  },
];

const certifications = [
  "AWS Certified Cloud Practitioner",
  "AWS Certified Solutions Architect - Associate (SAA)",
  "Microsoft Azure Fundamentals (AZ-900)",
  "普通自動車免許",
  "普通自動二輪免許",
  "第二級陸上特殊無線技士",
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
            <h2 className="text-xl font-black text-slate-900">Umeda</h2>
            <p className="text-sm font-medium" style={{ color: "#f97316" }}>
              Engineer
            </p>
          </div>
        </div>
        <div className="text-slate-600 text-sm leading-relaxed mb-4 space-y-2">
          <p>このサイトは、日々の学びや生活を発信するための、いわば「遊び場」です。</p>
          <p>現在は、AWSの資格取得に向けて学習を進めながら、AIを活用した個人開発に勤しんでいます。</p>
          <p>煮詰まったときは、散歩やサウナで心身を整えるのがルーティンです。</p>
        </div>
        <ul className="space-y-1 text-slate-600 text-sm">
          <li className="font-semibold text-slate-700">■ 趣味</li>
          <li>・散歩</li>
          <li>・筋トレ</li>
          <li>・ラーメン</li>
          <li>・ガジェット</li>
          <li>・アニメ/漫画</li>
        </ul>
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
                  <p className="text-sm text-orange-500 font-medium mb-2">{item.project}</p>
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
