"use client";

import { useState } from "react";

type FieldErrors = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

function validate(data: { name: string; email: string; subject: string; message: string }): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.name.trim()) errors.name = "お名前を入力してください";
  if (!data.email.trim()) {
    errors.email = "メールアドレスを入力してください";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "正しいメールアドレスの形式で入力してください";
  }
  if (!data.subject.trim()) errors.subject = "件名を入力してください";
  if (!data.message.trim()) {
    errors.message = "メッセージを入力してください";
  } else if (data.message.trim().length < 10) {
    errors.message = "メッセージは10文字以上入力してください";
  }
  return errors;
}

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = {
      name:    (form.elements.namedItem("name")    as HTMLInputElement).value,
      email:   (form.elements.namedItem("email")   as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    const errors = validate(data);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setStatus("sending");

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

  const inputClass = (hasError: boolean) =>
    `w-full rounded-xl border px-4 py-3 text-slate-800 placeholder-slate-300 focus:outline-none focus:ring-2 transition-all text-sm bg-white/80 ${
      hasError
        ? "border-red-400 focus:border-red-400 focus:ring-red-100"
        : "border-slate-200 focus:border-orange-400 focus:ring-orange-100"
    }`;

  return (
    <div className="glass-card p-8 fade-up fade-up-delay-3">
      {status === "done" ? (
        <div className="flex flex-col items-center py-8">
          <div
            className="w-16 h-16 border-[3px] border-slate-800 bg-orange-50 flex items-center justify-center mb-5"
            style={{ boxShadow: "4px 4px 0px #1A1A1A" }}
          >
            <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke="#EA580C" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
              <polyline points="4,13 9,18 20,7" />
            </svg>
          </div>
          <p className="font-black text-slate-800 text-xl mb-2">送信しました！</p>
          <p className="text-sm text-slate-600 mb-1">自動返信メールをお送りしましたのでご確認ください。</p>
          <p className="text-sm text-slate-600">内容を確認次第、ご返信いたします。</p>
        </div>
      ) : (
        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
              お名前 <span className="text-red-400">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="山田 太郎"
              className={inputClass(!!fieldErrors.name)}
            />
            {fieldErrors.name && <p className="text-xs text-red-500 mt-1">{fieldErrors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
              メールアドレス <span className="text-red-400">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@email.com"
              className={inputClass(!!fieldErrors.email)}
            />
            {fieldErrors.email && <p className="text-xs text-red-500 mt-1">{fieldErrors.email}</p>}
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-slate-700 mb-2">
              件名 <span className="text-red-400">*</span>
            </label>
            <input
              id="subject"
              type="text"
              placeholder="案件のご相談"
              className={inputClass(!!fieldErrors.subject)}
            />
            {fieldErrors.subject && <p className="text-xs text-red-500 mt-1">{fieldErrors.subject}</p>}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
              メッセージ <span className="text-red-400">*</span>
            </label>
            <textarea
              id="message"
              rows={6}
              placeholder="お問い合わせ内容をご記入ください"
              className={inputClass(!!fieldErrors.message) + " resize-none"}
            />
            {fieldErrors.message && <p className="text-xs text-red-500 mt-1">{fieldErrors.message}</p>}
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
  );
}
