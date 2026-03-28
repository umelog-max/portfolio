import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <p className="font-mono text-sm font-semibold tracking-widest text-white mb-4 fade-up">
        404 NOT FOUND
      </p>
      <h1 className="text-8xl font-black tracking-tight mb-6 fade-up fade-up-delay-1"
        style={{ background: "linear-gradient(135deg, #f97316, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
      >
        404
      </h1>
      <p className="text-slate-100 mb-10 fade-up fade-up-delay-2">
        お探しのページは見つかりませんでした。
      </p>
      <div className="fade-up fade-up-delay-3">
        <Link href="/" className="btn-primary">
          トップへ戻る →
        </Link>
      </div>
    </div>
  );
}
