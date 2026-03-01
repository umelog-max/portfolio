"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import WeatherTicker from "@/components/WeatherTicker";

const navLinks = [
  { href: "/", label: "Top" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="glass-header fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span
            className="font-black text-lg tracking-tight gradient-text px-3 py-1 rounded-lg"
            style={{
              border: "2px solid #1A1A1A",
              boxShadow: "4px 4px 0px #1A1A1A",
            }}
          >
            UmeBlog
          </span>
        </Link>

        {/* Nav（PC） */}
        <nav className="hidden sm:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                pathname === link.href ? "text-orange-500" : "text-slate-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Weather Ticker（PC） */}
        <WeatherTicker />

        {/* ハンバーガーボタン（モバイル） */}
        <button
          className="sm:hidden flex flex-col justify-center items-center gap-1.5 p-2"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="メニュー"
        >
          <span
            className={`block w-5 h-0.5 bg-slate-700 transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-slate-700 transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-slate-700 transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* モバイルメニュー */}
      {menuOpen && (
        <nav className="sm:hidden border-t border-slate-100 bg-white/95 backdrop-blur-sm px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium transition-colors hover:text-orange-500 ${
                pathname === link.href ? "text-orange-500" : "text-slate-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
