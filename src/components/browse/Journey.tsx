"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useId, useState } from "react";
import Dropdown from "@/components/ui/Dropdown";
import SectionHeading from "@/components/ui/SectionHeading";
import { defaultSeason, journeyIntro, seasons } from "@/data/journey";
import { scrollToId } from "@/lib/links";
import type { JourneyEpisode, Season } from "@/lib/types";

const ease = [0.22, 1, 0.36, 1] as const;

const sectionLabel: Record<string, string> = {
  code: "See the originals",
  gallery: "Go off screen",
  studio: "Visit the studio",
  universe: "Explore the craft",
  pilot: "Read the pilot",
  moments: "See top moments",
  picks: "See top picks",
};

/** My Journey — six seasons; every episode opens with its own dropdown. */
export default function Journey() {
  const [index, setIndex] = useState(Math.min(defaultSeason, seasons.length - 1));
  const season = seasons[index];
  if (!season) return null;

  return (
    <section id="journey" aria-labelledby="journey-title" className="shell scroll-mt-20">
      <SectionHeading
        id="journey-title"
        kicker={`${seasons.length} Seasons`}
        title="My Journey"
        subtitle={journeyIntro.subtitle}
        aside={<>{journeyIntro.aside}</>}
      />

      {/* Season picker: pills on larger screens, a dropdown on phones */}
      <div className="sm:hidden">
        <Dropdown
          label="Season"
          value={season.number}
          onChange={(v) => setIndex(seasons.findIndex((s) => s.number === v))}
          options={seasons.map((s) => ({ value: s.number, label: `Season ${s.number} · ${s.name}`, hint: s.status }))}
          renderButton={(sel) => (
            <span className="flex items-center gap-2">
              <span className="text-[0.6rem] font-black uppercase tracking-[0.2em] text-brand">Season</span>
              <span className="truncate">{sel?.label.replace(/^Season /, "")}</span>
            </span>
          )}
        />
      </div>

      <div
        role="tablist"
        aria-label="Seasons"
        className="no-scrollbar -mx-8 hidden gap-2 overflow-x-auto px-8 pb-2 sm:flex lg:mx-0 lg:px-0"
      >
        {seasons.map((s, i) => {
          const active = i === index;
          return (
            <button
              key={s.number}
              role="tab"
              type="button"
              aria-selected={active}
              onClick={() => setIndex(i)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-left transition-all duration-300 ${
                active
                  ? "bg-white text-black shadow-[0_10px_30px_-10px_rgba(255,255,255,0.5)]"
                  : "text-zinc-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className={`block text-[0.55rem] font-black uppercase tracking-[0.24em] ${active ? "text-brand" : "text-zinc-600"}`}>
                Season {s.number}
              </span>
              <span className="block whitespace-nowrap text-sm font-semibold">{s.name}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={season.number}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease }}
          role="tabpanel"
          aria-label={`Season ${season.number}: ${season.name}`}
        >
          <SeasonHeader season={season} />
          <ul className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {season.episodes.map((ep, i) => (
              <EpisodeCard key={ep.title} episode={ep} season={season} index={i} />
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function SeasonHeader({ season }: { season: Season }) {
  return (
    <div className="mt-8 flex flex-col gap-2 sm:mt-10">
      <div className="flex flex-wrap items-end gap-x-4 gap-y-1">
        <span className="rank-outline display text-6xl leading-none sm:text-7xl" aria-hidden="true">
          S{season.number}
        </span>
        <h3 className="display text-4xl text-white sm:text-5xl">{season.name}</h3>
        <span className="mb-1.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-zinc-500">
          {season.episodes.length} Episodes · <span className="text-brand">{season.status}</span>
        </span>
      </div>
      <p className="max-w-2xl text-sm text-zinc-400 sm:text-base">{season.logline}</p>
      {season.quote && (
        <figure className="mt-3 max-w-2xl border-l-2 border-brand/70 pl-4">
          <blockquote className="font-serif text-lg italic leading-snug text-zinc-200 sm:text-xl">
            &ldquo;{season.quote.text}&rdquo;
          </blockquote>
          <figcaption className="mt-1 text-[0.6rem] font-bold uppercase tracking-[0.22em] text-zinc-500">
            — {season.quote.author}
            {season.quote.role ? <span className="text-zinc-600"> · {season.quote.role}</span> : null}
          </figcaption>
        </figure>
      )}
    </div>
  );
}

function EpisodeCard({ episode, season, index }: { episode: JourneyEpisode; season: Season; index: number }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.5, ease }}
      className={`group self-start overflow-hidden rounded-lg border bg-ink-850 shadow-card transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 ${
        open ? "border-brand/70 shadow-[0_0_0_1px_rgba(229,9,20,0.4),0_30px_70px_-30px_rgba(229,9,20,0.6)]" : "border-white/10 hover:border-white/25"
      }`}
    >
      {/* Poster strip */}
      <div className={`relative h-36 overflow-hidden bg-gradient-to-br ${episode.gradient}`}>
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.25),transparent_55%)]" />
        <span
          aria-hidden="true"
          className="display absolute -bottom-3 right-2 text-[6.5rem] leading-none text-white/15 transition-transform duration-500 group-hover:scale-110"
        >
          E{num}
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" aria-hidden="true" />
        <p className="absolute left-4 top-3 text-[0.55rem] font-black uppercase tracking-[0.24em] text-white/85">
          S{season.number} · Episode {num}
        </p>
        <h4 className="display absolute bottom-3 left-4 right-20 text-3xl leading-[0.9] text-white">{episode.title}</h4>
      </div>

      {/* Body + dropdown */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-[0.6rem] font-black uppercase tracking-[0.22em] text-brand">{episode.tag}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">{episode.summary}</p>
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            aria-label={`${open ? "Hide" : "Show"} details for ${episode.title}`}
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 transition-colors ${
              open ? "border-white bg-white text-black" : "border-zinc-500 text-zinc-200 hover:border-white hover:text-white"
            }`}
          >
            <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
          </button>
        </div>

        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tags">
          {episode.tags.map((t) => (
            <li key={t} className="rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[0.65rem] font-semibold text-zinc-400">
              {t}
            </li>
          ))}
        </ul>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease }}
              className="overflow-hidden"
            >
              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-zinc-500">Episode notes</p>
                <ul className="mt-2 space-y-2">
                  {episode.details.map((d) => (
                    <li key={d} className="flex gap-2.5 text-sm leading-relaxed text-zinc-300">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand shadow-glow" />
                      {d}
                    </li>
                  ))}
                </ul>
                {episode.link && (
                  <button
                    type="button"
                    onClick={() => episode.link && scrollToId(episode.link)}
                    className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:text-brand-soft"
                  >
                    {sectionLabel[episode.link] ?? "Watch this chapter"}
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  );
}
