"use client";
import { useRef, useCallback } from "react";

export default function HomeTitle() {
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
    <div
      className="mb-8 sm:mb-16 fade-up mx-auto w-fit"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
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
  );
}
