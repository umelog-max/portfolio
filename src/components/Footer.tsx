import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-sm py-8 mt-16">
      <div className="mx-auto max-w-5xl px-6 flex flex-col items-center gap-3 text-sm">
        <Link href="/privacy" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
          プライバシーポリシー
        </Link>
        <p className="text-sm font-medium text-slate-500">© 2026 Ume.Blog</p>
      </div>
    </footer>
  );
}
