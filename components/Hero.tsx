"use client";

import { useEffect, useState } from "react";

const HEADLINE = "Words that\nmove people.";

export default function Hero() {
  const [typedCount, setTypedCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTypedCount((count) => {
        const next = count + 1;
        if (next >= HEADLINE.length) clearInterval(timer);
        return Math.min(next, HEADLINE.length);
      });
    }, 65);
    return () => clearInterval(timer);
  }, []);

  const typed = HEADLINE.slice(0, typedCount);
  const [line1, line2] = typed.split("\n");
  const cursorOnLine1 = line2 === undefined;
  const cursorOnLine2 = line2 !== undefined;

  return (
    <header className="relative mb-10 animate-fade-in-up overflow-hidden">
      <div
        className="absolute -inset-[10%] z-0 opacity-50 mix-blend-multiply blur-[48px]"
        style={{
          background:
            "radial-gradient(45% 38% at 28% 24%, var(--color-accent-500) 0%, transparent 70%), radial-gradient(50% 42% at 78% 66%, var(--color-accent-2-400) 0%, transparent 70%), radial-gradient(38% 34% at 68% 18%, var(--color-accent-2-200) 0%, transparent 72%), radial-gradient(55% 48% at 24% 82%, var(--color-accent-700) 0%, transparent 70%)",
          maskImage: "radial-gradient(75% 75% at 50% 42%, black 35%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(75% 75% at 50% 42%, black 35%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(to bottom, transparent 55%, var(--color-neutral-200) 100%)",
        }}
      />
      <div className="relative z-[1] flex min-h-[60vh] flex-col items-center justify-center px-5 py-14 text-center sm:px-8 sm:py-20 lg:px-16 lg:py-24">
        <span className="mb-5 block text-[13px] tracking-[0.08em] uppercase">Copywriter</span>
        <h1 className="mb-6 min-h-[2.2em] max-w-[18ch] font-heading text-[clamp(38px,6.5vw,72px)] leading-[1.08] tracking-[-0.01em]">
          {line1 || ""}
          <span
            className="ml-[0.06em] inline-block h-[0.85em] w-[0.4ch] animate-cursor-blink bg-current align-middle"
            style={{ display: cursorOnLine1 ? "inline-block" : "none" }}
          />
          <br />
          {line2 || ""}
          <span
            className="ml-[0.06em] inline-block h-[0.85em] w-[0.4ch] animate-cursor-blink bg-current align-middle"
            style={{ display: cursorOnLine2 ? "inline-block" : "none" }}
          />
        </h1>
        <p className="mx-auto mb-8 max-w-[52ch] text-[16.5px] leading-[1.65] text-text/90">
          Copy that keeps them there — emails, ads, product pages, landing pages, technical docs.
          Whatever the project needs, in whatever format gets it read.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="#contact" className="btn border-none bg-neutral-100 text-accent-900">
            Get in touch
          </a>
        </div>
      </div>
    </header>
  );
}
