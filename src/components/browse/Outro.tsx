"use client";

import { motion } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import SocialPills from "@/components/ui/SocialLinks";
import { brand } from "@/data/portfolio";
import { scrollToTop } from "@/lib/links";

type OutroProps = {
  onReplayIntro: () => void;
  onContact: () => void;
};

const ease = [0.22, 1, 0.36, 1] as const;

/** The credits. */
export default function Outro({ onReplayIntro, onContact }: OutroProps) {
  return (
    <footer id="outro" aria-labelledby="outro-title" className="relative mt-10 overflow-hidden sm:mt-16">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_45%,rgba(229,9,20,0.22),transparent_70%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand/60 to-transparent" />

      <div className="shell relative flex min-h-[90svh] flex-col items-center justify-center py-24 text-center">
        <motion.p
          className="kicker"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          The Next Episode
        </motion.p>

        <motion.h2
          id="outro-title"
          className="display mt-5 text-[clamp(3.6rem,13vw,11rem)] text-white text-glow"
          initial={{ opacity: 0, scale: 0.92, filter: "blur(12px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease }}
        >
          To Be Continued<span className="text-brand">...</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8, ease }}
          className="flex flex-col items-center"
        >
          <p className="mt-6 text-lg font-bold uppercase tracking-[0.3em] text-zinc-100 sm:text-xl">{brand.fullName}</p>
          <p className="mt-2 max-w-xl text-[0.6rem] font-bold uppercase tracking-[0.24em] text-zinc-500 sm:text-[0.65rem]">
            {brand.roles.join(" · ")}
          </p>
          <p className="mt-6 font-serif text-2xl italic text-zinc-300">The next chapter starts here.</p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <motion.button
              type="button"
              onClick={onContact}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-red !rounded-full !px-6 !py-2.5 text-xs uppercase tracking-[0.16em] shadow-glow-lg"
            >
              <Play className="h-3.5 w-3.5 fill-white" aria-hidden="true" />
              Let&rsquo;s Build
            </motion.button>
            <SocialPills include={["linkedin", "github", "email", "instagram"]} />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-zinc-400">
            <button type="button" onClick={scrollToTop} className="inline-flex items-center gap-1.5 transition hover:text-white">
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" /> Watch Again
            </button>
            <button type="button" onClick={onReplayIntro} className="inline-flex items-center gap-1.5 transition hover:text-white">
              <Play className="h-3.5 w-3.5" aria-hidden="true" /> Replay Opening
            </button>
          </div>
        </motion.div>
      </div>

      <div className="relative border-t border-white/5">
        <div className="shell flex flex-col items-center gap-2 py-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <span className="font-display text-xl tracking-[0.2em] text-zinc-400">
            <span className="text-brand">S</span> SERIES
          </span>
          <p className="text-[0.68rem] text-zinc-600">
            © {new Date().getFullYear()} {brand.fullName}. A personal, streaming-inspired portfolio — not affiliated with any streaming service.
          </p>
        </div>
      </div>
    </footer>
  );
}
