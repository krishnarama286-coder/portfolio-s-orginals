"use client";

import { motion, type Variants } from "framer-motion";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import SmartImage from "@/components/ui/SmartImage";
import { brand } from "@/data/portfolio";

type IntroSplashProps = {
  onPlay: () => void;
};

const ease = [0.22, 1, 0.36, 1] as const;

const letters: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
};

const letter: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(14px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease } },
};

/**
 * Screen 1 — the cold open. The title lands first; a beat later the
 * protagonist rises into frame on a red halo, then the Play cue appears.
 */
export default function IntroSplash({ onPlay }: IntroSplashProps) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setRevealed(true), 1500);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <motion.main
      className="stage relative flex min-h-[100svh] flex-col items-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.4, filter: "blur(18px)", transition: { duration: 0.85, ease } }}
      transition={{ duration: 0.7, ease }}
      aria-label="Surya: The Series — opening"
    >
      {/* Ambient light */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[38%] h-[60vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-[110px]"
        animate={{ opacity: [0.55, 0.9, 0.55], scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <header className="relative z-20 flex w-full items-center justify-between px-4 pt-5 sm:px-8 sm:pt-7">
        <span className="font-display text-xl tracking-[0.2em] text-zinc-300">
          <span className="text-brand">S</span> SERIES
        </span>
        <button
          type="button"
          onClick={onPlay}
          className="rounded-full border border-white/25 bg-black/30 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-zinc-200 backdrop-blur transition hover:border-white hover:text-white"
        >
          Skip Intro
        </button>
      </header>

      <div className="relative z-10 flex w-full flex-1 flex-col items-center px-4 pb-10 pt-6 text-center sm:pt-8">
        <motion.p
          className="text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-zinc-400 sm:text-xs"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          A Netflix-inspired portfolio experience
        </motion.p>

        <h1 className="relative z-20 mt-3">
          <span className="sr-only">Surya: The Series</span>
          <motion.span
            aria-hidden="true"
            variants={letters}
            initial="hidden"
            animate="show"
            className="display flex text-[clamp(5.5rem,26vw,15rem)] text-zinc-50 text-glow"
          >
            {brand.name.toUpperCase().split("").map((ch, i) => (
              <motion.span key={`${ch}-${i}`} variants={letter} className="inline-block">
                {ch}
              </motion.span>
            ))}
          </motion.span>
          <motion.span
            aria-hidden="true"
            className="mt-1 block text-[0.7rem] font-black uppercase tracking-[0.75em] text-brand sm:text-sm"
            style={{ textShadow: "0 0 18px rgba(229,9,20,0.9)" }}
            initial={{ opacity: 0, letterSpacing: "1.4em" }}
            animate={{ opacity: 1, letterSpacing: "0.75em" }}
            transition={{ delay: 0.95, duration: 1.1, ease }}
          >
            The Series
          </motion.span>
        </h1>

        {/* Protagonist reveal */}
        <motion.div
          className="relative z-10 mt-1 w-[min(68vw,340px)]"
          initial={{ opacity: 0, y: 60 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 1.1, ease }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-x-[8%] top-[10%] bottom-[18%] rounded-full bg-brand/45 blur-[60px]"
          />
          <div className="mask-portrait-intro relative aspect-[4/5] w-full">
            <SmartImage
              src={brand.portrait}
              alt={brand.portraitAlt}
              fill
              priority
              sizes="(max-width: 640px) 68vw, 330px"
              className="object-cover object-[50%_30%]"
              fallbackLabel="Add /profile/surya.jpg"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#5a0a18]/55 via-[#3a0610]/25 to-[#140a10]/80 mix-blend-multiply" />
          </div>
        </motion.div>

        <motion.div
          className="relative z-10 -mt-14 flex flex-col items-center sm:-mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
        >
          <p className="text-[0.6rem] font-bold uppercase tracking-[0.28em] text-zinc-200 sm:text-[0.7rem]">
            The Series • {brand.season} • Web Developer, Tech Fixer, Entrepreneur &amp; Gamer
          </p>
          <p className="mt-3 max-w-md font-serif text-lg italic leading-snug text-zinc-300 sm:text-xl">
            {brand.logline}
          </p>
          <motion.button
            type="button"
            onClick={onPlay}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3 text-sm font-bold uppercase tracking-[0.18em] text-black shadow-[0_10px_40px_-8px_rgba(255,255,255,0.45)] transition-colors hover:bg-zinc-200"
          >
            <Play className="h-4 w-4 fill-black" aria-hidden="true" />
            Play Series
          </motion.button>
        </motion.div>
      </div>
    </motion.main>
  );
}
