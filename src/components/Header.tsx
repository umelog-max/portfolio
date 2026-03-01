"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
            Ume.log
          </span>
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

        {/* Weather Ticker */}
        <WeatherTicker />
      </div>
    </header>
  );
}
