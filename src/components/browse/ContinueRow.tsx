"use client";

import { motion } from "framer-motion";
import { Play } from "lucide-react";
import Carousel from "@/components/ui/Carousel";
import { episodes } from "@/data/portfolio";
import { scrollToId } from "@/lib/links";

/** "Continue Exploring" — episode cards that jump through the series. */
export default function ContinueRow({ seen }: { seen: Set<string> }) {
  return (
    <section id="episodes" aria-labelledby="episodes-title" className="relative z-10 -mt-6 sm:-mt-10">
      <div className="shell mb-1 flex items-end justify-between gap-4">
        <h2 id="episodes-title" className="text-lg font-bold text-zinc-100 sm:text-2xl">
          Continue Exploring
        </h2>
      </div>

      <Carousel label="Episodes">
        {episodes.map((ep) => {
          const progress = seen.has(ep.target) ? 100 : ep.progress;
          return (
            <motion.button
              key={ep.number}
              type="button"
              onClick={() => scrollToId(ep.target)}
              whileHover={{ scale: 1.06, zIndex: 10 }}
              whileFocus={{ scale: 1.06, zIndex: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="group relative aspect-video w-[72vw] shrink-0 snap-start overflow-hidden rounded-md bg-ink-800 text-left shadow-card sm:w-[300px] lg:w-[min(22vw,360px)] 2xl:w-[min(19vw,400px)]"
              aria-label={`Episode ${ep.number}: ${ep.title}`}
            >
              <span className={`absolute inset-0 bg-gradient-to-br ${ep.gradient} opacity-90`} aria-hidden="true" />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.25),transparent_50%)]"
              />
              <span
                aria-hidden="true"
                className="display absolute -right-2 -top-4 text-[8.5rem] text-white/10 transition-transform duration-500 group-hover:scale-110"
              >
                {ep.watermark}
              </span>
              <span
                aria-hidden="true"
                className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/50 bg-black/30 backdrop-blur transition group-hover:bg-white group-hover:text-black"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
              </span>
              <span className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent" aria-hidden="true" />
              <span className="absolute bottom-5 left-4 right-4">
                <span className="block text-[0.58rem] font-black uppercase tracking-[0.28em] text-white/80">
                  Episode {ep.number}
                </span>
                <span className="display mt-1 block text-3xl text-white sm:text-[2.1rem]">{ep.title}</span>
              </span>
              <span className="absolute inset-x-0 bottom-0 h-1 bg-white/20" aria-hidden="true">
                <motion.span
                  className="block h-full bg-brand"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </span>
            </motion.button>
          );
        })}
      </Carousel>
    </section>
  );
}
