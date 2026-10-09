"use client";

import { motion } from "framer-motion";
import Carousel from "@/components/ui/Carousel";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import { projects, projectVisuals, services, stills, topPicks, type TopPick } from "@/data/portfolio";
import { scrollToId } from "@/lib/links";

type TopPicksProps = {
  onOpenStill: (index: number) => void;
  onOpenService: (id: string) => void;
};

type Resolved = {
  key: string;
  title: string;
  type: string;
  image?: string;
  imageAlt?: string;
  focus?: string;
  gradient: string;
  action: () => void;
};

/** Top 5 — giant outlined rank numerals beside a poster, Netflix style. */
export default function TopPicks({ onOpenStill, onOpenService }: TopPicksProps) {
  const resolve = (pick: TopPick): Resolved | null => {
    if (pick.kind === "still") {
      const index = stills.findIndex((p) => p.id === pick.id);
      const p = stills[index];
      if (!p) return null;
      return {
        key: p.id,
        title: p.title,
        type: p.tag,
        image: p.image,
        imageAlt: p.alt,
        focus: p.focus,
        gradient: p.gradient ?? "from-[#2b0a3d] to-[#d946ef]",
        action: () => onOpenStill(index),
      };
    }
    if (pick.kind === "project") {
      const p = projects[pick.index];
      if (!p) return null;
      return {
        key: p.title,
        title: p.title,
        type: p.category,
        image: p.image,
        gradient: projectVisuals[pick.index % projectVisuals.length]?.gradient ?? "",
        action: () => scrollToId("code"),
      };
    }
    const m = services.find((x) => x.id === pick.id);
    if (!m) return null;
    return {
      key: m.id,
      title: m.title,
      type: "The Studio",
      gradient: "from-[#062a3a] via-[#0e6382] to-[#22a5d1]",
      action: () => onOpenService(m.id),
    };
  };

  const items = topPicks.map(resolve).filter((x): x is Resolved => x !== null);

  return (
    <section id="picks" aria-labelledby="picks-title" className="scroll-mt-20">
      <div className="shell">
        <SectionHeading
          id="picks-title"
          kicker={`Top ${items.length} · From the Series`}
          title="Surya’s Top Picks"
          subtitle="The chapters worth pressing play on first."
        />
      </div>
      <Carousel label="Top picks">
        {items.map((item, i) => (
          <motion.button
            key={item.key}
            type="button"
            onClick={item.action}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className="group flex shrink-0 snap-start items-end text-left"
            aria-label={`Number ${i + 1}: ${item.title}`}
          >
            <span
              aria-hidden="true"
              className="rank-outline display -mr-5 text-[9rem] leading-[0.75] transition-colors duration-300 group-hover:[-webkit-text-stroke-color:#E50914] sm:-mr-6 sm:text-[12rem]"
            >
              {i + 1}
            </span>
            <span className="relative block aspect-[2/3] w-32 overflow-hidden rounded-md border border-white/10 shadow-card transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-[1.04] sm:w-40 lg:w-44">
              <span className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} aria-hidden="true" />
              {item.image && (
                <SmartImage
                  src={item.image}
                  alt={item.imageAlt ?? ""}
                  fill
                  sizes="176px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ objectPosition: item.focus ?? "50% 40%" }}
                />
              )}
              <span className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" aria-hidden="true" />
              <span className="absolute left-2 top-2 font-display text-lg leading-none text-brand" aria-hidden="true">
                S
              </span>
              <span className="absolute inset-x-2.5 bottom-2.5">
                <span className="block text-[0.5rem] font-bold uppercase tracking-[0.18em] text-zinc-400">{item.type}</span>
                <span className="display mt-0.5 block text-xl leading-[0.9] text-white sm:text-2xl">{item.title}</span>
              </span>
            </span>
          </motion.button>
        ))}
      </Carousel>
    </section>
  );
}
