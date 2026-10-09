"use client";

import { motion, type Variants } from "framer-motion";
import type { Quote } from "@/lib/types";

type QuoteInterludeProps = {
  quote: Quote;
  /** "interlude" = full cinematic epigraph between chapters; "compact" = small, for busy screens. */
  variant?: "interlude" | "compact";
  className?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

const line: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } },
};

const word: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease } },
};

/** A film-epigraph style quote: words resolve out of blur, then the credit fades in. */
export default function QuoteInterlude({ quote, variant = "interlude", className = "" }: QuoteInterludeProps) {
  const compact = variant === "compact";
  const words = quote.text.split(" ");

  return (
    <motion.figure
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      className={`relative mx-auto flex flex-col items-center text-center ${
        compact ? "max-w-xl" : "shell max-w-5xl py-6 sm:py-10"
      } ${className}`}
    >
      {!compact && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-40 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[80px]"
        />
      )}

      <motion.span
        aria-hidden="true"
        variants={{ hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease } } }}
        className={`font-serif leading-none text-brand ${compact ? "text-4xl" : "text-7xl sm:text-8xl"}`}
        style={{ textShadow: "0 0 30px rgba(229,9,20,0.7)" }}
      >
        &ldquo;
      </motion.span>

      <blockquote className={compact ? "-mt-3" : "-mt-6 sm:-mt-8"}>
        <motion.p
          variants={line}
          className={`font-serif italic text-zinc-100 ${
            compact
              ? "text-lg leading-snug sm:text-xl"
              : "text-[clamp(1.7rem,4vw,3.4rem)] leading-[1.12] text-glow-soft"
          }`}
        >
          <span className="sr-only">{quote.text}</span>
          {words.map((w, i) => (
            <motion.span key={`${w}-${i}`} variants={word} aria-hidden="true" className="inline-block">
              {w}
              {i < words.length - 1 && " "}
            </motion.span>
          ))}
        </motion.p>
      </blockquote>

      <motion.figcaption
        variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { delay: 0.3 + words.length * 0.045, duration: 0.6 } } }}
        className={`flex items-center gap-3 ${compact ? "mt-3" : "mt-6 sm:mt-8"}`}
      >
        <span aria-hidden="true" className="h-px w-8 bg-brand" />
        <span className="text-[0.65rem] font-black uppercase tracking-[0.3em] text-zinc-300 sm:text-xs">
          {quote.author}
        </span>
        {quote.role && (
          <span className="hidden text-[0.6rem] uppercase tracking-[0.24em] text-zinc-600 sm:inline">
            · {quote.role}
          </span>
        )}
        <span aria-hidden="true" className="h-px w-8 bg-brand" />
      </motion.figcaption>
    </motion.figure>
  );
}
