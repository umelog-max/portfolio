"use client";
import Link from "next/link";
import { useRef, useCallback } from "react";
import PixelBg from "@/components/PixelBg";

const sections = [
  { href: "/about",     label: "About",     description: "このサイトについて",   bgColor: "#F5E6C3" },
  { href: "/portfolio", label: "Portfolio",  description: "個人開発・制作実績",   bgColor: "#FFFFFF" },
  { href: "/blog",      label: "Blog",       description: "日常の記録",           bgColor: "#F5D66A" },
];

function TiltCard({
  href, label, description, bgColor,
}: {
  href: string; label: string; description: string; bgColor: string;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-6px)`;
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
      className="p-8 flex flex-col items-center text-center h-full w-full rounded-xl group"
      style={{
        backgroundColor: bgColor,
        border: "2.5px solid #1A1A1A",
        boxShadow: "5px 5px 0px #1A1A1A",
      }}
    >
      <h2
        className="text-xl font-black mb-2 tracking-tight group-hover:opacity-70 transition-opacity"
        style={{ color: "#1A1A1A" }}
      >
        {label}
      </h2>
      <p className="text-sm leading-relaxed" style={{ color: "#444444" }}>
        {description}
      </p>
      <span
        className="mt-4 font-bold text-lg group-hover:translate-x-1 transition-transform inline-block"
        style={{ color: "#E85544" }}
      >
        →
      </span>
    </Link>
  );
}

export default function Home() {
  const titleRef = useRef<HTMLDivElement>(null);

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
    <>
      <PixelBg />

      <div
        className="mx-auto max-w-3xl px-6 pt-12 sm:pt-0 flex flex-col items-center justify-center min-h-[calc(100vh-8rem)]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="mb-8 sm:mb-16 fade-up mx-auto w-fit">
          <div
            ref={titleRef}
            className="px-6 py-4 sm:px-10 sm:py-5 rounded-xl"
            style={{
              border: "2.5px solid #1A1A1A",
              boxShadow: "8px 8px 0px #1A1A1A",
              transition: "transform 0.1s ease-out",
            }}
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter pb-2 gradient-text">
              Ume.Blog
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
          {sections.map((section, i) => (
            <div key={section.href} className={`fade-up fade-up-delay-${i + 2}`}>
              <TiltCard {...section} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
