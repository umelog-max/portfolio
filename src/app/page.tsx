import Link from "next/link";

const sections = [
  {
    href: "/about",
    label: "About",
    description: "プロフィール・経歴・スキル",
  },
  {
    href: "/works",
    label: "Works",
    description: "個人開発・制作実績",
  },
  {
    href: "/blog",
    label: "Blog",
    description: "技術・個人開発・日常の記録",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]">

      {/* Title */}
      <div className="text-center mb-16">
        <h1 className="text-8xl font-black tracking-tighter">
          <span className="text-slate-900">Ume</span>
          <span className="gradient-text">.log</span>
        </h1>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="glass-card p-8 flex flex-col items-center text-center group"
          >
            <h2 className="text-xl font-black text-slate-900 group-hover:text-orange-500 transition-colors mb-2 tracking-tight">
              {section.label}
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              {section.description}
            </p>
            <span className="mt-4 text-slate-300 group-hover:text-orange-400 transition-colors">
              →
            </span>
          </Link>
        ))}
      </div>

    </div>
  );
}
