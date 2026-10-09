"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import { genres } from "@/data/portfolio";

/** Genres — the creative universe, browsed like a streaming category list. */
export default function Universe() {
  const [activeId, setActiveId] = useState(genres[0]?.id ?? "");
  const active = genres.find((g) => g.id === activeId) ?? genres[0];
  const uid = useId();

  if (!active) return null;

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    const delta = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = genres[(index + delta + genres.length) % genres.length];
    if (!next) return;
    setActiveId(next.id);
    document.getElementById(`${uid}-tab-${next.id}`)?.focus();
  };

  return (
    <section id="universe" aria-labelledby="universe-title" className="shell scroll-mt-20">
      <SectionHeading
        id="universe-title"
        kicker="Genres"
        title="The Creative Universe"
        subtitle="Every skill, one player."
        aside={<>Pick a genre to see the skills behind it.</>}
      />

      <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-10">
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label="Disciplines"
          className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0"
        >
          {genres.map((g, i) => {
            const selected = g.id === active.id;
            return (
              <button
                key={g.id}
                id={`${uid}-tab-${g.id}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`${uid}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveId(g.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`relative shrink-0 overflow-hidden rounded-lg px-4 py-3 text-left transition-colors lg:px-5 ${
                  selected ? "bg-white/[0.08]" : "hover:bg-white/[0.04]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute inset-y-2 left-0 w-1 origin-center rounded-full transition-transform duration-300 ${
                    selected ? "scale-y-100" : "scale-y-0"
                  }`}
                  style={{ backgroundColor: g.accent, boxShadow: `0 0 16px ${g.accent}` }}
                />
                <span
                  className={`display block whitespace-nowrap text-2xl lg:text-[1.7rem] ${
                    selected ? "text-white" : "text-zinc-500"
                  }`}
                >
                  {g.name}
                </span>
                <span className="hidden text-[0.68rem] text-zinc-500 lg:block">
                  {g.skills.length} skills · {g.summary}
                </span>
              </button>
            );
          })}
        </div>

        <div
          id={`${uid}-panel`}
          role="tabpanel"
          aria-labelledby={`${uid}-tab-${active.id}`}
          className="relative min-h-[16rem] overflow-hidden rounded-xl border border-white/10 bg-ink-850 p-5 sm:p-8"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-30 blur-3xl transition-colors duration-700"
            style={{ backgroundColor: active.accent }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <p className="text-sm text-zinc-400">
                <span className="font-semibold text-white">{active.name}</span> — {active.summary}
              </p>
              <ul className="mt-6 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 xl:grid-cols-3">
                {active.skills.map((s, i) => (
                  <motion.li
                    key={s.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="flex items-center gap-4 rounded-lg border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-white/25"
                  >
                    <span
                      aria-hidden="true"
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-md font-display text-xl text-white"
                      style={{ backgroundColor: `${active.accent}33`, boxShadow: `inset 0 0 0 1px ${active.accent}66` }}
                    >
                      {s.name.slice(0, 2)}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-white">{s.name}</span>
                      <span className="block text-xs text-zinc-500">{s.note}</span>
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
