"use client";

import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name:    (form.elements.namedItem("name")    as HTMLInputElement).value,
      email:   (form.elements.namedItem("email")   as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-12">
      <h1 className="mb-2 text-4xl font-black text-slate-900 tracking-tight fade-up">Contact</h1>
      <p className="mb-12 font-mono text-sm font-semibold tracking-widest text-white fade-up fade-up-delay-1">お問い合わせ</p>

      <div className="text-sm text-slate-100 leading-relaxed mb-8 fade-up fade-up-delay-2">
        <p>案件のご相談・その他お問い合わせはこちらから。</p>
        <p>通常 2〜3 営業日以内にご返信します。</p>
      </div>

      <div className="glass-card p-8 fade-up fade-up-delay-3">
        {status === "done" ? (
          <div className="text-center py-8">
            <p className="text-2xl mb-3">✅</p>
            <p className="font-bold text-slate-800 mb-1">送信しました！</p>
            <p className="text-sm text-slate-500">内容を確認次第、ご返信いたします。</p>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                お名前 <span className="text-red-400">*</span>
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="山田 太郎"
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-slate-800 placeholder-slate-300 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all text-sm"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                メールアドレス <span className="text-red-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="example@email.com"
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-slate-800 placeholder-slate-300 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all text-sm"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">
                件名 <span className="text-red-400">*</span>
              </label>
              <input
                id="subject"
                type="text"
                required
                placeholder="案件のご相談"
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-slate-800 placeholder-slate-300 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all text-sm"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                メッセージ <span className="text-red-400">*</span>
              </label>
              <textarea
                id="message"
                rows={6}
                required
                placeholder="お問い合わせ内容をご記入ください"
                className="w-full rounded-xl border border-slate-200 bg-white/80 px-4 py-3 text-slate-800 placeholder-slate-300 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all resize-none text-sm"
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-red-500">送信に失敗しました。時間をおいて再度お試しください。</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary w-full justify-center disabled:opacity-60"
            >
              {status === "sending" ? "送信中..." : "送信する →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
