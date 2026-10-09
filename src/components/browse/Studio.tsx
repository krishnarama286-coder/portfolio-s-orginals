"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { services } from "@/data/portfolio";

/** Season 3 — The Studio: ways to work with Surya. */
export default function Studio({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <section id="studio" aria-labelledby="studio-title" className="shell scroll-mt-20">
      <SectionHeading
        id="studio-title"
        kicker="Season 03 · Work With Me"
        title="The Studio"
        subtitle="Got an idea? Let’s build it."
      />

      <ul className="grid gap-4 sm:gap-5 md:grid-cols-3">
        {services.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.li
              key={m.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-ink-850 p-6 shadow-card transition-colors duration-300 hover:border-white/25 sm:p-8"
              >
                <div
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-48 bg-gradient-to-b ${m.gradient} opacity-70 transition-opacity duration-500 group-hover:opacity-100`}
                />
                <span
                  aria-hidden="true"
                  className="display absolute -right-1 top-2 text-[7rem] leading-none text-white/[0.05]"
                >
                  0{i + 1}
                </span>
                <span className="relative grid h-14 w-14 place-items-center rounded-xl border border-white/15 bg-black/40 text-white backdrop-blur transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon className="h-7 w-7" aria-hidden="true" strokeWidth={1.6} />
                </span>
                <p className="relative mt-6 text-[0.6rem] font-black uppercase tracking-[0.26em] text-zinc-500">{m.format}</p>
                <h3 className="display relative mt-2 text-4xl text-white">{m.title}</h3>
                <p className="relative mt-3 text-sm leading-relaxed text-zinc-400">{m.description}</p>
                <motion.button
                  type="button"
                  onClick={() => onOpen(m.id)}
                  whileTap={{ scale: 0.96 }}
                  className="relative mt-auto inline-flex items-center gap-2 self-start pt-8 text-xs font-bold uppercase tracking-[0.18em] text-white"
                >
                  <span className="border-b border-brand pb-1 transition-colors group-hover:text-brand-soft">{m.cta}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </motion.button>
              </motion.article>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}
