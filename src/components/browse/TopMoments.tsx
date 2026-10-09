"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Award, Expand } from "lucide-react";
import { useId } from "react";
import SectionHeading from "@/components/ui/SectionHeading";
import SmartImage from "@/components/ui/SmartImage";
import { credentials, moments } from "@/data/moments";
import { isConfigured, isExternal } from "@/lib/links";

const ease = [0.22, 1, 0.36, 1] as const;
const GOLD = "#d4af37";
const isPrize = (result: string) => !/participation/i.test(result);

/** Awards Season — gold-laurel moments, then the certificate shelf. Cards open the real certificates. */
export default function TopMoments({ onOpenCertificate }: { onOpenCertificate: (index: number) => void }) {
  return (
    <section id="moments" aria-labelledby="moments-title" className="relative scroll-mt-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-20 mx-auto h-[60%] max-w-5xl rounded-full bg-[#d4af37]/[0.06] blur-[120px]"
      />
      <div className="shell relative">
        <SectionHeading
          id="moments-title"
          kicker="Awards Season"
          title="Top Moments"
          subtitle="Wins, firsts and the work behind them."
          aside={<>Every moment here is real — tap a card to see the certificate.</>}
        />

        <ul className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {moments.map((m, i) => {
            const certIndex = m.certificate;
            const cert = certIndex !== undefined ? credentials[certIndex] : undefined;
            return (
              <motion.li
                key={m.org}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease }}
              >
                <motion.article
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="group relative flex h-full flex-col items-center overflow-hidden rounded-xl border border-[#d4af37]/20 bg-[linear-gradient(180deg,#1f1a10_0%,#141210_45%,#121212_100%)] px-5 pb-6 pt-5 text-center shadow-card transition-[border-color,box-shadow] duration-500 hover:border-[#d4af37]/60 hover:shadow-[0_30px_80px_-30px_rgba(212,175,55,0.5)]"
                >
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(ellipse_at_50%_0%,rgba(212,175,55,0.22),transparent_70%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <p className="relative text-[0.58rem] font-black uppercase tracking-[0.24em] text-[#e9cf7a]">{m.kicker}</p>
                  <div className="relative mt-2 h-24 w-24">
                    <Laurel className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105" />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 grid place-items-center pb-2 text-2xl text-[#f3d77a] transition-transform duration-700 group-hover:rotate-[72deg]"
                      style={{ textShadow: "0 0 16px rgba(212,175,55,0.8)" }}
                    >
                      ★
                    </span>
                  </div>
                  <h3
                    className="display relative mt-1 text-[2.2rem] leading-[0.9] text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(180deg,#fff7d6,#d4af37 70%,#a67c1b)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}
                  >
                    {m.title}
                  </h3>
                  <p className="relative mt-1.5 text-[0.62rem] font-black uppercase tracking-[0.22em] text-[#d4af37]">{m.org}</p>
                  <p className="relative mt-3 text-xs leading-relaxed text-zinc-400">{m.description}</p>

                  {cert && certIndex !== undefined ? (
                    // The stretched ::after makes the whole card clickable.
                    <button
                      type="button"
                      onClick={() => onOpenCertificate(certIndex)}
                      className="relative mt-auto inline-flex items-center gap-1.5 pt-4 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-zinc-200 underline-offset-4 after:absolute after:-inset-[100vmax] after:content-[''] hover:text-white hover:underline"
                    >
                      {m.linkLabel ?? "View certificate"} <Expand className="h-3 w-3" aria-hidden="true" />
                      <span className="sr-only">: {cert.title}</span>
                    </button>
                  ) : (
                    isConfigured(m.url) && (
                      <a
                        href={m.url}
                        {...(isExternal(m.url) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="relative mt-auto inline-flex items-center gap-1 pt-4 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-zinc-200 underline-offset-4 hover:text-white hover:underline"
                      >
                        {m.linkLabel ?? "Learn more"} <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                      </a>
                    )
                  )}
                </motion.article>
              </motion.li>
            );
          })}
        </ul>

        {/* Certificate shelf */}
        <div className="mt-14 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h3 className="text-xl font-bold text-zinc-100 sm:text-2xl">
            Certified <span className="text-zinc-500">· {credentials.length} certificates</span>
          </h3>
          <p className="text-[0.65rem] uppercase tracking-[0.2em] text-zinc-500">Tap any certificate to view it</p>
        </div>
        <ul className="no-scrollbar -mx-4 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
          {credentials.map((c, i) => (
            <motion.li
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
              className="w-[72vw] shrink-0 snap-start sm:w-64 lg:w-auto"
            >
              <button
                type="button"
                onClick={() => onOpenCertificate(i)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-lg border border-white/10 bg-ink-850 text-left transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-white/30"
                aria-label={`View certificate: ${c.title}, ${c.result}`}
              >
                <span className="relative block aspect-[4/3] w-full overflow-hidden bg-black">
                  <SmartImage
                    src={c.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 72vw, 20vw"
                    className="object-cover object-top opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                    fallbackLabel="Certificate"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink-850 via-transparent to-transparent" />
                  <span
                    className={`absolute left-2 top-2 rounded-sm px-1.5 py-0.5 text-[0.58rem] font-black uppercase tracking-[0.16em] ${
                      isPrize(c.result) ? "bg-[#d4af37] text-black" : "bg-black/70 text-zinc-200 backdrop-blur"
                    }`}
                  >
                    {c.result}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100"
                  >
                    <Expand className="h-3.5 w-3.5" />
                  </span>
                </span>
                <span className="flex flex-1 flex-col p-4">
                  <span className="flex items-center gap-2">
                    <span className="truncate rounded-sm bg-brand/15 px-1.5 py-0.5 text-[0.55rem] font-black uppercase tracking-[0.18em] text-brand">
                      {c.issuer}
                    </span>
                    {isPrize(c.result) && <Award className="h-4 w-4 shrink-0 text-[#d4af37]" aria-hidden="true" />}
                  </span>
                  <span className="mt-3 block text-sm font-semibold text-white">{c.title}</span>
                  <span className="mt-0.5 block text-xs text-zinc-500">{c.date}</span>
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** A hand-built gold laurel wreath: leaves placed along two mirrored curves. */
function Laurel({ className = "" }: { className?: string }) {
  const gid = `laurel-${useId().replace(/:/g, "")}`;
  // Quadratic curve from bottom-centre up the left side.
  const p0 = [44, 92] as const;
  const p1 = [6, 70] as const;
  const p2 = [26, 12] as const;
  const leaves = Array.from({ length: 8 }, (_, i) => {
    const t = 0.08 + i * 0.115;
    const x = (1 - t) ** 2 * p0[0] + 2 * (1 - t) * t * p1[0] + t ** 2 * p2[0];
    const y = (1 - t) ** 2 * p0[1] + 2 * (1 - t) * t * p1[1] + t ** 2 * p2[1];
    const dx = 2 * (1 - t) * (p1[0] - p0[0]) + 2 * t * (p2[0] - p1[0]);
    const dy = 2 * (1 - t) * (p1[1] - p0[1]) + 2 * t * (p2[1] - p1[1]);
    const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
    return { x, y, angle, scale: 1 - i * 0.045 };
  });
  const branch = (
    <>
      <path d={`M${p0[0]} ${p0[1]} Q${p1[0]} ${p1[1]} ${p2[0]} ${p2[1]}`} stroke={`url(#${gid})`} strokeWidth="1.4" fill="none" />
      {leaves.map((l, i) => (
        <g key={i} transform={`translate(${l.x.toFixed(2)} ${l.y.toFixed(2)}) rotate(${l.angle.toFixed(1)}) scale(${l.scale.toFixed(3)})`}>
          <ellipse cx="0" cy="-5.5" rx="2.6" ry="6" transform="rotate(-38)" fill={`url(#${gid})`} />
          <ellipse cx="0" cy="5.5" rx="2.6" ry="6" transform="rotate(38)" fill={`url(#${gid})`} opacity="0.85" />
        </g>
      ))}
    </>
  );
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" style={{ filter: `drop-shadow(0 0 10px ${GOLD}55)` }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff1b8" />
          <stop offset="55%" stopColor={GOLD} />
          <stop offset="100%" stopColor="#8a6a0a" />
        </linearGradient>
      </defs>
      {branch}
      <g transform="translate(100 0) scale(-1 1)">{branch}</g>
    </svg>
  );
}
