"use client";

import { motion } from "framer-motion";
import SmartImage from "@/components/ui/SmartImage";
import SectionHeading from "@/components/ui/SectionHeading";
import { brand, pilot } from "@/data/portfolio";

const ease = [0.22, 1, 0.36, 1] as const;

/** The Pilot — who Surya is, told like an opening episode. */
export default function Pilot() {
  return (
    <section id="pilot" aria-labelledby="pilot-title" className="shell scroll-mt-20">
      <SectionHeading id="pilot-title" kicker="The Pilot" title="About Surya" />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <motion.figure
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10 bg-[radial-gradient(circle_at_50%_40%,#b0102a,#3a0610_70%)] shadow-card"
        >
          <SmartImage
            src={brand.aboutPortrait}
            alt={brand.aboutPortraitAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover object-[50%_35%] transition-transform duration-700 group-hover:scale-105"
            fallbackLabel="Add portrait"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-brand/10" />
          <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-6">
            <div>
              <p className="text-[0.6rem] font-black uppercase tracking-[0.28em] text-brand">Starring</p>
              <p className="display mt-1 text-4xl text-white sm:text-5xl">{brand.fullName}</p>
            </div>
            <span className="rounded border border-white/30 px-2 py-1 text-[0.6rem] font-bold uppercase tracking-wider text-zinc-200">
              {brand.season}
            </span>
          </figcaption>
        </motion.figure>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="flex flex-col justify-center"
        >
          <blockquote className="font-serif text-[clamp(1.6rem,3vw,2.6rem)] italic leading-[1.15] text-zinc-100">
            &ldquo;{pilot.quote}&rdquo;
          </blockquote>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">— {brand.fullName}</p>

          <div className="mt-8 space-y-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
            <p className="font-serif text-xl italic text-brand-soft sm:text-2xl">{brand.logline}</p>
            {pilot.intro.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10">
            {pilot.facts.map((f) => (
              <div key={f.label} className="bg-ink-850 p-4 sm:p-5">
                <dt className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-zinc-500">{f.label}</dt>
                <dd className="mt-1.5 text-sm font-semibold text-white sm:text-base">{f.value}</dd>
                <dd className="text-xs text-zinc-500">{f.sub}</dd>
              </div>
            ))}
          </dl>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Interests">
            {pilot.interests.map((i) => (
              <li key={i} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-300">
                {i}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
