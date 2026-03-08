"use client";

import Link from "next/link";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <p className="font-mono text-sm font-semibold tracking-widest text-white mb-4 fade-up">
        500 INTERNAL SERVER ERROR
      </p>
      <h1
        className="text-8xl font-black tracking-tight mb-6 fade-up fade-up-delay-1"
        style={{ background: "linear-gradient(135deg, #f97316, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
      >
        500
      </h1>
      <p className="text-slate-100 mb-10 fade-up fade-up-delay-2">
        予期しないエラーが発生しました。
      </p>
      <div className="flex justify-center gap-4 fade-up fade-up-delay-3">
        <button onClick={reset} className="btn-primary">
          再試行 →
        </button>
        <Link href="/" className="btn-primary" style={{ background: "transparent", border: "2px solid #1A1A1A", color: "#1A1A1A" }}>
          トップへ戻る
        </Link>
      </div>
    </div>
  );
}
