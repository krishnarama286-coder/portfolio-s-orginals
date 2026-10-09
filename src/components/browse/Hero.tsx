"use client";

import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { Briefcase, Info, Play } from "lucide-react";
import { useRef } from "react";
import SmartImage from "@/components/ui/SmartImage";
import { brand, hero } from "@/data/portfolio";
import { scrollToId } from "@/lib/links";
import type { Profile } from "@/lib/types";

const ease = [0.22, 1, 0.36, 1] as const;

const stack: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};
const rise: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function Hero({ profile }: { profile: Profile }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section
      ref={ref}
      id="home"
      aria-labelledby="hero-title"
      className="stage relative isolate flex min-h-[100svh] items-end overflow-hidden pb-14 sm:pb-20 lg:min-h-[94svh] lg:items-center lg:pb-20"
    >
      {/* Protagonist */}
      <motion.div
        style={{ y: portraitY }}
        className="absolute inset-x-0 top-0 -z-10 h-[64svh] lg:inset-y-0 lg:left-auto lg:right-0 lg:h-full lg:w-[58%] 2xl:w-[52%]"
      >
        <motion.div
          aria-hidden="true"
          className="absolute right-[10%] top-[14%] h-[70%] w-[60%] rounded-[2rem] bg-gradient-to-br from-brand/50 via-[#7f0a2a]/40 to-transparent blur-3xl"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="mask-portrait absolute inset-0"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease }}
        >
          <SmartImage
            src={brand.portrait}
            alt={brand.portraitAlt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover object-[50%_22%] lg:object-[45%_20%]"
            fallbackLabel="Add hero portrait"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-[#6b0a1c]/50 via-[#2a0610]/20 to-[#141414]/60 mix-blend-multiply" />
        </motion.div>
      </motion.div>

      {/* Readability overlays */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/85 via-50% to-ink/10 lg:hidden" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-ink via-ink/85 via-40% to-transparent to-75% lg:block"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink to-transparent" />

      {/* Floating glass chips sit above the overlays */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] lg:block 2xl:w-[52%]">
        {hero.chips.map((chip, i) => (
            <motion.div
              key={chip.label}
              className={`glass absolute rounded-lg !bg-black/45 px-4 py-3 shadow-card ${
                i === 0 ? "left-[24%] top-[68%]" : "right-[5%] top-[20%]"
              }`}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: [0, -8, 0] }}
              transition={{
                opacity: { delay: 1 + i * 0.25, duration: 0.6 },
                y: { delay: 1 + i * 0.25, duration: 5 + i, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <p className="text-[0.55rem] font-black uppercase tracking-[0.24em] text-brand-soft">{chip.label}</p>
              <p className="mt-1 text-xs font-semibold text-white">{chip.value}</p>
            </motion.div>
          ))}
      </div>

      <motion.div style={{ opacity: fade }} className="shell relative pt-28 lg:pt-24">
        <motion.div variants={stack} initial="hidden" animate="show" className="max-w-2xl 2xl:max-w-3xl">
          <motion.p variants={rise} className="flex items-center gap-2">
            <span className="font-display text-2xl leading-none text-brand">S</span>
            <span className="text-[0.62rem] font-black uppercase tracking-[0.34em] text-zinc-300">Series</span>
            <span className="ml-2 rounded-sm border border-brand/50 bg-brand/10 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-brand">
              {hero.label}
            </span>
          </motion.p>

          <motion.h1 variants={rise} id="hero-title" className="mt-4">
            <span className="sr-only">Surya: The Series. </span>
            <span
              aria-hidden="true"
              className="display block bg-[linear-gradient(100deg,#fafafa_0%,#fafafa_40%,#ff9db0_50%,#fafafa_60%,#fafafa_100%)] bg-[length:250%_100%] bg-clip-text text-[clamp(5rem,17vw,12.5rem)] text-transparent [animation:shine_6s_ease-in-out_infinite] drop-shadow-[0_8px_40px_rgba(229,9,20,0.35)]"
            >
              {brand.name}
            </span>
            <span
              aria-hidden="true"
              className="mt-1 block text-xs font-black uppercase tracking-[0.7em] text-brand sm:text-sm"
              style={{ textShadow: "0 0 16px rgba(229,9,20,0.8)" }}
            >
              The Series
            </span>
          </motion.h1>

          <motion.ul
            variants={rise}
            className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.72rem] font-medium text-zinc-300"
            aria-label="Series details"
          >
            <li className="rounded-sm border border-zinc-400/60 px-1.5 py-px text-[0.6rem] font-bold uppercase tracking-wider">
              New
            </li>
            {hero.meta.map((m, i) => (
              <li key={m} className="flex items-center gap-2">
                {i > 0 && <span className="text-zinc-600" aria-hidden="true">•</span>}
                {m}
              </li>
            ))}
          </motion.ul>

          <motion.p
            variants={rise}
            className="mt-3 text-[0.62rem] font-black uppercase tracking-[0.26em] text-zinc-400 sm:text-[0.68rem]"
          >
            {brand.roles.join(" • ")}
          </motion.p>

          <motion.h2
            variants={rise}
            className="display mt-5 max-w-xl text-[clamp(1.9rem,4.2vw,3.25rem)] leading-[0.95] text-white"
          >
            {hero.headline}
          </motion.h2>

          <motion.p variants={rise} className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-300 sm:text-base">
            {hero.copy}
          </motion.p>

          <motion.div variants={rise} className="mt-7 flex flex-wrap items-center gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollToId("episodes")}
              className="btn-light"
            >
              <Play className="h-5 w-5 fill-black" aria-hidden="true" />
              Explore Episodes
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => scrollToId("studio")}
              className="btn-ghost"
            >
              <Briefcase className="h-5 w-5" aria-hidden="true" />
              Work With Me
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => scrollToId("pilot")}
              aria-label="More about Surya"
              className="grid h-11 w-11 place-items-center rounded-full border-2 border-zinc-400/70 text-zinc-200 transition-colors hover:border-white hover:text-white"
            >
              <Info className="h-5 w-5" aria-hidden="true" />
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      <p className="shell absolute inset-x-0 bottom-5 hidden text-right text-[0.62rem] text-zinc-500 sm:block">
        Watching as <span style={{ color: profile.accent }}>{profile.name}</span> &middot; {profile.heroKicker}
      </p>
    </section>
  );
}
