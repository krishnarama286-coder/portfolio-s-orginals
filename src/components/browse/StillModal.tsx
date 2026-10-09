"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import Modal from "@/components/ui/Modal";
import StillPoster from "@/components/ui/StillPoster";
import { brand, stills } from "@/data/portfolio";

type StillModalProps = {
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

/** Expanded Off Screen photo. Arrow keys move between frames. */
export default function StillModal({ index, onClose, onNavigate }: StillModalProps) {
  const current = index === null ? undefined : stills[index];
  // Keep the last frame mounted while the dialog animates out.
  const last = useRef(current);
  if (current) last.current = current;
  const still = current ?? last.current;
  const shownIndex = still ? stills.indexOf(still) : 0;
  const count = stills.length;

  const step = (dir: 1 | -1) => {
    if (index === null) return;
    onNavigate((index + dir + count) % count);
  };

  return (
    <Modal
      open={index !== null}
      onClose={onClose}
      labelledBy="still-title"
      size="xl"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
    >
      {still && (
        <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          <div className="relative flex min-h-[50svh] items-center justify-center bg-black p-4 sm:p-8 lg:min-h-[78svh]">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,70,239,0.15),transparent_65%)]"
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={still.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="relative w-full"
                style={{
                  aspectRatio: still.ratio,
                  maxHeight: "72svh",
                  maxWidth: `calc(72svh * ${still.ratio})`,
                  marginInline: "auto",
                }}
              >
                <span className="absolute inset-0 overflow-hidden rounded shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]">
                  <StillPoster
                    still={still}
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                    className="object-contain"
                    iconClassName="h-24 w-24"
                  />
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col p-6 sm:p-8">
            <p className="kicker">Off Screen · {String(shownIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</p>
            <h2 id="still-title" className="display mt-3 text-5xl text-white sm:text-6xl">
              {still.title}
            </h2>
            <p className="mt-3 inline-flex self-start rounded-full border border-[#d946ef]/40 bg-[#d946ef]/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#e879f9]">
              {still.tag}
            </p>
            <p className="mt-6 font-serif text-xl italic leading-snug text-zinc-200">{still.description}</p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-400">{still.story}</p>
            <p className="mt-6 text-xs text-zinc-500">
              Starring <span className="text-zinc-300">{brand.fullName}</span>
              {still.year ? ` · ${still.year}` : ""}
            </p>

            <div className="mt-auto flex items-center gap-2 pt-8">
              <button type="button" onClick={() => step(-1)} className="btn-ghost !px-4" aria-label="Previous photo">
                <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Prev
              </button>
              <button type="button" onClick={() => step(1)} className="btn-ghost !px-4" aria-label="Next photo">
                Next <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <span className="ml-auto hidden text-[0.6rem] uppercase tracking-[0.2em] text-zinc-600 sm:block">
                ← → to browse
              </span>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
