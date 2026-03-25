import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "案件のご相談・お問い合わせはこちら。通常 2〜3 営業日以内にご返信します。",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-12">
      <h1 className="mb-2 text-4xl font-black text-slate-900 tracking-tight fade-up">Contact</h1>
      <p className="mb-12 font-mono text-sm font-semibold tracking-widest text-white fade-up fade-up-delay-1">お問い合わせ</p>

      <div className="text-sm text-slate-100 leading-relaxed mb-8 fade-up fade-up-delay-2">
        <p>案件のご相談・その他お問い合わせはこちらから。</p>
        <p>通常 2〜3 営業日以内にご返信します。</p>
      </div>

      <ContactForm />
    </div>
  );
}
