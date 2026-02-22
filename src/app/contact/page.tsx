import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "お問い合わせ・案件のご相談はこちらから",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-12">
      <p className="font-mono text-xs tracking-widest text-slate-400 uppercase mb-2">Contact</p>
      <h1 className="mb-4 text-4xl font-black text-slate-900 tracking-tight">Get in touch</h1>
      <p className="mb-12 text-slate-500 leading-relaxed">
        案件のご相談・取材・その他お問い合わせはこちらから。
        通常 2〜3 営業日以内にご返信します。
      </p>

      <div className="glass-card p-8">
        <form className="space-y-5">
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

          <button type="submit" className="btn-primary w-full justify-center">
            送信する →
          </button>
        </form>
      </div>
    </div>
  );
}
