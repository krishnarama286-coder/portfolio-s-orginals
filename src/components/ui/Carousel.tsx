"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type CarouselProps = {
  label: string;
  children: ReactNode;
  /** Show the thin red scroll-progress line under the row (as in the reference). */
  progress?: boolean;
  className?: string;
};

/**
 * Netflix-style horizontal row. The row scrolls on its own, so the page never
 * overflows horizontally. Arrow buttons appear on hover for pointer devices.
 */
export default function Carousel({ label, children, progress = false, className = "" }: CarouselProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const { scrollXProgress } = useScroll({ container: ref });
  const scaleX = useSpring(scrollXProgress, { stiffness: 200, damping: 30 });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    el.addEventListener("scroll", update, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", update);
    };
  }, [update]);

  const page = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  return (
    <div className={`group/row relative mx-auto max-w-shell ${className}`}>
      <div
        ref={ref}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="no-scrollbar -my-10 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth px-4 py-10 sm:gap-4 sm:px-8 lg:px-12 2xl:px-16"
      >
        {children}
        <div aria-hidden="true" className="w-1 shrink-0" />
      </div>

      <button
        type="button"
        aria-label={`Scroll ${label} left`}
        onClick={() => page(-1)}
        disabled={!canPrev}
        className="absolute inset-y-0 left-0 z-20 hidden w-10 items-center justify-center bg-gradient-to-r from-ink/90 to-transparent text-white opacity-0 transition-opacity duration-300 focus-visible:opacity-100 disabled:pointer-events-none disabled:!opacity-0 group-hover/row:opacity-100 sm:flex lg:w-12"
      >
        <ChevronLeft className="h-8 w-8" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label={`Scroll ${label} right`}
        onClick={() => page(1)}
        disabled={!canNext}
        className="absolute inset-y-0 right-0 z-20 hidden w-10 items-center justify-center bg-gradient-to-l from-ink/90 to-transparent text-white opacity-0 transition-opacity duration-300 focus-visible:opacity-100 disabled:pointer-events-none disabled:!opacity-0 group-hover/row:opacity-100 sm:flex lg:w-12"
      >
        <ChevronRight className="h-8 w-8" aria-hidden="true" />
      </button>

      {progress && (
        <div className="shell mt-6" aria-hidden="true">
          <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
            <motion.div style={{ scaleX }} className="h-full origin-left bg-brand shadow-glow" />
          </div>
        </div>
      )}
    </div>
  );
}
