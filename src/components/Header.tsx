"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Top" },
  { href: "/about", label: "About" },
  { href: "/works", label: "Works" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="glass-header fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-orange-500 text-xl">🔥</span>
          <span className="font-black text-lg text-slate-900 tracking-tight group-hover:text-orange-500 transition-colors">
            Ume.log
          </span>
          <span className="font-mono text-xs text-slate-400">.v1</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                pathname === link.href
                  ? "text-orange-500"
                  : "text-slate-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Status */}
        <div className="hidden md:flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-xs text-slate-400 font-mono">ONLINE</span>
        </div>
      </div>
    </header>
  );
}
