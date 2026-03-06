import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-sm py-8 mt-16">
      <div className="mx-auto max-w-5xl px-6 flex items-center justify-center gap-3 text-sm">
        <p className="font-medium text-slate-500">© 2026 Ume.Blog</p>
        <span className="text-slate-500">|</span>
        <Link href="/privacy" className="font-medium text-slate-500 hover:text-slate-700 transition-colors">
          プライバシーポリシー
        </Link>
      </div>
    </footer>
  );
}
