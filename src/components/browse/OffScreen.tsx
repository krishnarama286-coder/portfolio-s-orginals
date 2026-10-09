"use client";

import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import StillPoster from "@/components/ui/StillPoster";
import { stills } from "@/data/portfolio";

/** Season 2 — Off Screen: music, games and life away from the keyboard. */
export default function OffScreen({ onOpen }: { onOpen: (index: number) => void }) {
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative scroll-mt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-24 -z-0 mx-auto h-[70%] max-w-5xl rounded-full bg-[#d946ef]/[0.06] blur-[120px]"
      />
      <div className="shell relative">
        <SectionHeading
          id="gallery-title"
          kicker="Season 02 · Music & Games"
          title="Off Screen"
          subtitle="Music on, controller in hand — the side quests that keep the main story going."
          aside={<>Life away from the keyboard. Open any frame to see it in full.</>}
        />

        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {stills.map((p, i) => (
            <motion.li
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-ink-850 shadow-card transition-[border-color,box-shadow] duration-500 hover:border-[#d946ef]/40 hover:shadow-[0_30px_80px_-30px_rgba(217,70,239,0.45)]"
              >
                <button
                  type="button"
                  onClick={() => onOpen(i)}
                  className="relative block aspect-[4/5] w-full overflow-hidden focus-visible:outline-offset-[-3px]"
                  aria-label={`Open ${p.title}`}
                >
                  <StillPoster
                    still={p}
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                  <span className="glass absolute left-2 top-2 max-w-[calc(100%-1rem)] truncate rounded-full px-2.5 py-1 text-[0.55rem] font-bold uppercase tracking-[0.16em] text-white sm:left-3 sm:top-3 sm:text-[0.6rem]">
                    {p.tag}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute right-3 top-3 hidden h-8 w-8 place-items-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 sm:grid"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                  </span>
                  <span className="display absolute bottom-2 left-3 text-5xl text-white/20 sm:text-6xl" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </button>

                <div className="flex flex-1 flex-col p-3 sm:p-5">
                  <h3 className="display text-2xl text-white sm:text-[2rem]">{p.title}</h3>
                  <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-zinc-400 sm:text-sm">{p.description}</p>
                  <button
                    type="button"
                    onClick={() => onOpen(i)}
                    className="mt-auto inline-flex items-center gap-1.5 self-start pt-4 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#e879f9] transition hover:text-white"
                  >
                    View Details <span aria-hidden="true">→</span>
                    <span className="sr-only"> of {p.title}</span>
                  </button>
                </div>
              </motion.article>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
