"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  id: string;
  kicker: string;
  title: string;
  subtitle?: string;
  aside?: ReactNode;
};

export default function SectionHeading({ id, kicker, title, subtitle, aside }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:mb-10 lg:flex-row lg:items-end lg:justify-between">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="kicker">{kicker}</p>
        <h2
          id={id}
          className="display mt-3 text-[clamp(2.6rem,7vw,5.5rem)] text-zinc-50 text-glow-soft"
        >
          {title}
        </h2>
        {subtitle && <p className="mt-3 max-w-xl text-base text-zinc-400 sm:text-lg">{subtitle}</p>}
      </motion.div>
      {aside && <div className="max-w-xs text-xs leading-relaxed text-zinc-500 lg:text-right">{aside}</div>}
    </div>
  );
}
