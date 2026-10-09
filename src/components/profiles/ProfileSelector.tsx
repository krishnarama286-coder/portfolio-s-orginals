"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import ProfileAvatar from "@/components/profiles/ProfileAvatar";
import QuoteInterlude from "@/components/ui/QuoteInterlude";
import { profiles, quotes } from "@/data/portfolio";
import type { Profile, ProfileId } from "@/lib/types";

type ProfileSelectorProps = {
  activeId: ProfileId;
  onSelect: (profile: Profile) => void;
  onBack: () => void;
};

const grid: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.25 } },
};

const tile: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.92 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 260, damping: 24 } },
};

/** Screen 2 — "Who's watching?" Each profile re-orders the story. */
export default function ProfileSelector({ activeId, onSelect, onBack }: ProfileSelectorProps) {
  return (
    <motion.main
      className="stage relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-20"
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.08 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <button
        type="button"
        onClick={onBack}
        className="absolute left-4 top-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 transition hover:text-white sm:left-8 sm:top-7"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Opening
      </button>

      <motion.h1
        className="text-center text-4xl font-semibold tracking-tight text-white sm:text-6xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Who&rsquo;s watching?
      </motion.h1>
      <motion.p
        className="mt-4 max-w-lg text-center text-sm text-zinc-400 sm:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.6 }}
      >
        Each profile filters the story through a different part of Surya&rsquo;s world.
      </motion.p>

      <motion.ul
        variants={grid}
        initial="hidden"
        animate="show"
        className="mt-10 flex w-full max-w-5xl flex-wrap justify-center gap-x-4 gap-y-8 sm:mt-14 sm:gap-x-6"
      >
        {profiles.map((p) => (
          <motion.li key={p.id} variants={tile} className="flex w-[calc(50%-0.5rem)] justify-center sm:w-44">
            <motion.button
              type="button"
              onClick={() => onSelect(p)}
              whileHover={{ scale: 1.06, y: -4 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 340, damping: 22 }}
              className="group flex w-full max-w-[11rem] flex-col items-center text-center focus-visible:outline-none"
              aria-label={`${p.name} — ${p.title}. ${p.description}`}
              style={{ ["--accent" as string]: p.accent }}
            >
              <ProfileAvatar
                profile={p}
                className="aspect-square w-full rounded-lg transition-[box-shadow] duration-300 group-hover:shadow-[0_0_0_3px_#fff,0_18px_50px_-10px_var(--accent)] group-focus-visible:shadow-[0_0_0_3px_#fff,0_18px_50px_-10px_var(--accent)]"
                iconClassName="h-12 w-12 sm:h-14 sm:w-14"
                showBadge
              />
              <span className="mt-4 text-base font-semibold text-zinc-300 transition group-hover:text-white sm:text-lg">
                {p.name}
              </span>
              <span
                className="mt-1 text-[0.6rem] font-bold uppercase tracking-[0.2em]"
                style={{ color: p.accent }}
              >
                {p.title}
                {p.id === activeId && <span className="sr-only"> (current profile)</span>}
              </span>
              <span className="mt-2 text-xs leading-relaxed text-zinc-500 transition group-hover:text-zinc-300">
                {p.description}
              </span>
            </motion.button>
          </motion.li>
        ))}
      </motion.ul>

      <QuoteInterlude quote={quotes.profiles} variant="compact" className="mt-14" />

      <motion.p
        className="mt-8 max-w-md text-center text-xs text-zinc-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        Every profile watches the same true story of Surya Srinivas K &mdash; it only changes what plays first.
      </motion.p>
    </motion.main>
  );
}
