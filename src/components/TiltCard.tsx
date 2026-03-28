"use client";
import Link from "next/link";
import { useRef } from "react";

export default function TiltCard({
  href,
  label,
  description,
  bgColor,
}: {
  href: string;
  label: string;
  description: string;
  bgColor: string;
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

  const handleTouchStart = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(600px) rotateY(5deg) rotateX(-5deg) translateY(-6px)";
    card.style.transition = "transform 0.15s ease-out";
  };

  const handleTouchEnd = () => {
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
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
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
