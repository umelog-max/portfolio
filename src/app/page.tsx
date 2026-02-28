"use client";
import Link from "next/link";
import { useRef, useCallback } from "react";
import ParticleCanvas from "@/components/ParticleCanvas";

const sections = [
  { href: "/about", label: "About", description: "プロフィール・経歴・スキル" },
  { href: "/portfolio", label: "Portfolio", description: "個人開発・制作実績" },
  { href: "/blog", label: "Blog", description: "技術・個人開発・日常の記録" },
];

function TiltCard({ href, label, description }: { href: string; label: string; description: string }) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateY(-6px)`;
    card.style.transition = "transform 0.05s ease-out";
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "";
    card.style.transition = "transform 0.4s ease-out";
  };

  return (
    <Link
      ref={cardRef}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card p-8 flex flex-col items-center text-center group h-full w-full"
    >
      <h2 className="text-xl font-black text-slate-900 group-hover:text-orange-500 transition-colors mb-2 tracking-tight">
        {label}
      </h2>
      <p className="text-sm text-slate-400 leading-relaxed">
        {description}
      </p>
      <span className="mt-4 text-slate-300 group-hover:text-orange-400 transition-colors">
        →
      </span>
    </Link>
  );
}

export default function Home() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!titleRef.current) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 16;
    const y = (e.clientY / window.innerHeight - 0.5) * 16;
    titleRef.current.style.transform = `translate(${x}px, ${y}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!titleRef.current) return;
    titleRef.current.style.transform = "";
  }, []);

  return (
    <div
      className="mx-auto max-w-3xl px-6 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <ParticleCanvas />

      <div className="text-center mb-16 fade-up">
        <h1
          ref={titleRef}
          className="text-8xl font-black tracking-tighter gradient-text pb-2"
          style={{ transition: "transform 0.1s ease-out" }}
        >
          Ume.log
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
        {sections.map((section, i) => (
          <div key={section.href} className={`fade-up fade-up-delay-${i + 2}`}>
            <TiltCard {...section} />
          </div>
        ))}
      </div>
    </div>
  );
}
