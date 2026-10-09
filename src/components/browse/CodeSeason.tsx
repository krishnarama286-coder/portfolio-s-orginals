"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, Github, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Carousel from "@/components/ui/Carousel";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import { projects, projectVisuals, socialLinks } from "@/data/portfolio";
import { useMediaQuery } from "@/lib/hooks";
import { isConfigured } from "@/lib/links";
import type { Project, ProjectVisual } from "@/lib/types";

const KICKER = `Season 01 · ${projects.length} Originals`;
const TITLE = "The Build Room";
const SUBTITLE = "Stories from the build room.";

/** Season 1 — The Build Room. Pinned horizontal scroll on desktop, swipe row elsewhere. */
export default function CodeSeason() {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const reduce = useReducedMotion();
  return desktop && !reduce ? <PinnedOriginals /> : <RowOriginals />;
}

function RowOriginals() {
  return (
    <section id="code" aria-labelledby="code-title" className="scroll-mt-20">
      <div className="shell">
        <SectionHeading
          id="code-title"
          kicker={KICKER}
          title={TITLE}
          subtitle={SUBTITLE}
          aside={<>Swipe or use the arrows to browse the originals.</>}
        />
      </div>
      <Carousel label="Code and AI projects" progress>
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} visual={projectVisuals[i % projectVisuals.length]} />
        ))}
      </Carousel>
    </section>
  );
}

/** As in the reference: the section pins while vertical scroll slides the originals sideways. */
function PinnedOriginals() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="code"
      aria-labelledby="code-title"
      className="relative"
      style={{ height: `calc(100vh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-16">
        <motion.div
          ref={trackRef}
          style={{ x, paddingLeft: "max(3rem, calc((100vw - 1680px) / 2 + 3rem))", paddingRight: "max(3rem, calc((100vw - 1680px) / 2 + 3rem))" }}
          className="flex w-max items-center gap-6"
        >
          <div className="flex w-[min(30rem,34vw)] shrink-0 flex-col pr-6">
            <p className="kicker">{KICKER}</p>
            <h2 id="code-title" className="display mt-4 text-[clamp(3.5rem,6.5vw,7rem)] text-zinc-50 text-glow-soft">
              {TITLE}
            </h2>
            <p className="mt-4 max-w-sm text-lg text-zinc-400">{SUBTITLE}</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-500">
              {projects.length} productions — a secure EdTech platform, a full-stack web studio and an AI prompt suite.
            </p>
            <motion.p
              style={{ opacity: hintOpacity }}
              className="mt-8 inline-flex items-center gap-2 text-[0.65rem] font-black uppercase tracking-[0.3em] text-zinc-400"
            >
              Scroll to browse <ArrowRight className="h-3.5 w-3.5 animate-pulse" aria-hidden="true" />
            </motion.p>
          </div>
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} visual={projectVisuals[i % projectVisuals.length]} pinned />
          ))}
        </motion.div>

        <div className="shell mt-10 flex items-center gap-4" aria-hidden="true">
          <span className="text-[0.58rem] font-black uppercase tracking-[0.3em] text-zinc-500">Originals</span>
          <div className="h-[2px] flex-1 overflow-hidden rounded-full bg-white/10">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left bg-brand shadow-glow" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  visual,
  pinned = false,
}: {
  project: Project;
  index: number;
  visual?: ProjectVisual;
  pinned?: boolean;
}) {
  const Icon = visual?.icon;
  const hasLive = isConfigured(project.liveUrl);
  const hasRepo = isConfigured(project.githubUrl);
  const email = isConfigured(socialLinks.email) ? socialLinks.email : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group relative flex shrink-0 flex-col overflow-hidden rounded-xl border border-white/10 bg-ink-850 shadow-card ${
        pinned
          ? "h-[min(64vh,40rem)] min-h-[28rem] w-[min(44vw,44rem)]"
          : "min-h-[30rem] w-[86vw] snap-start sm:w-[30rem] lg:min-h-[34rem] lg:w-[min(42vw,40rem)]"
      }`}
      aria-labelledby={`project-${index}`}
    >
      {/* Visual area */}
      <div className="absolute inset-0" aria-hidden={!project.image}>
        {project.image ? (
          <SmartImage
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 640px) 86vw, 40rem"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${visual?.gradient ?? ""}`}>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_30%,rgba(255,255,255,0.18),transparent_45%)]" />
            {Icon && (
              <Icon
                className="absolute right-[-6%] top-[6%] h-[70%] w-[70%] text-white/25 transition-transform duration-700 group-hover:rotate-[-4deg] group-hover:scale-105"
                strokeWidth={0.6}
                style={{ filter: `drop-shadow(0 0 24px ${visual?.accent ?? "#fff"})` }}
              />
            )}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 via-45% to-transparent" />
      </div>

      <div className="relative flex items-start justify-between p-5 sm:p-6">
        <span className="flex items-center gap-1.5 text-[0.6rem] font-black uppercase tracking-[0.3em] text-white/80">
          <span className="font-display text-lg leading-none text-brand">H</span> Original
        </span>
        <span className="display text-5xl text-white/30">{String(index + 1).padStart(2, "0")}</span>
      </div>

      <div className="relative mt-auto p-5 sm:p-7">
        <p className="text-[0.62rem] font-black uppercase tracking-[0.26em]" style={{ color: visual?.accent }}>
          {project.category}
        </p>
        <h3 id={`project-${index}`} className="display mt-2 text-[clamp(2.4rem,5vw,3.6rem)] text-white">
          {project.title}
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-300">{project.description}</p>
        <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 text-[0.7rem] font-semibold text-zinc-400" aria-label="Tech">
          {project.tags.map((t, i) => (
            <li key={t} className="flex items-center gap-3">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-brand" aria-hidden="true" />}
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {hasLive && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-light !py-2.5 text-xs">
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" /> Live Demo
            </a>
          )}
          {hasRepo && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2.5 text-xs">
              <Github className="h-4 w-4" aria-hidden="true" /> GitHub
            </a>
          )}
          {!hasLive && !hasRepo && (
            email ? (
              <a
                href={`${email}?subject=${encodeURIComponent(`About ${project.title}`)}`}
                className="btn-ghost !py-2.5 text-xs"
              >
                <Mail className="h-4 w-4" aria-hidden="true" /> Ask for a walkthrough
              </a>
            ) : (
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Case study &middot; coming soon
              </span>
            )
          )}
        </div>
      </div>
    </motion.article>
  );
}
