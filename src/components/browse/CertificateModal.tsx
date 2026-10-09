"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Award, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef } from "react";
import Modal from "@/components/ui/Modal";
import SmartImage from "@/components/ui/SmartImage";
import { credentials } from "@/data/moments";

type CertificateModalProps = {
  index: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

/** Full-size certificate viewer. Arrow keys move between certificates. */
export default function CertificateModal({ index, onClose, onNavigate }: CertificateModalProps) {
  const current = index === null ? undefined : credentials[index];
  const last = useRef(current);
  if (current) last.current = current;
  const cert = current ?? last.current;
  const shown = cert ? credentials.indexOf(cert) : 0;
  const count = credentials.length;
  const prize = cert ? !/participation/i.test(cert.result) : false;

  const step = (dir: 1 | -1) => {
    if (index === null) return;
    onNavigate((index + dir + count) % count);
  };

  return (
    <Modal
      open={index !== null}
      onClose={onClose}
      labelledBy="certificate-title"
      size="xl"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") step(1);
        if (e.key === "ArrowLeft") step(-1);
      }}
    >
      {cert && (
        <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
          <div className="relative flex min-h-[40svh] items-center justify-center bg-[#0b0b0b] p-4 sm:p-8 lg:min-h-[76svh]">
            <div
              aria-hidden="true"
              className={`absolute inset-0 ${
                prize
                  ? "bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.18),transparent_65%)]"
                  : "bg-[radial-gradient(circle_at_50%_50%,rgba(229,9,20,0.12),transparent_65%)]"
              }`}
            />
            <AnimatePresence mode="wait">
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, scale: 0.97, rotate: -0.6 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="relative w-full"
                style={{
                  aspectRatio: cert.ratio ?? 4 / 3,
                  maxHeight: "72svh",
                  maxWidth: `calc(72svh * ${cert.ratio ?? 4 / 3})`,
                  marginInline: "auto",
                }}
              >
                <SmartImage
                  src={cert.image}
                  alt={`Certificate: ${cert.title} — ${cert.result}, awarded to Surya Srinivas K`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 62vw"
                  className="rounded object-contain shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)]"
                  fallbackLabel="Certificate image"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex flex-col p-6 sm:p-8">
            <p className="kicker">
              Certificate · {String(shown + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </p>
            <h2 id="certificate-title" className="display mt-3 text-5xl text-white">
              {cert.title}
            </h2>
            <p
              className={`mt-3 inline-flex items-center gap-1.5 self-start rounded-full px-3 py-1 text-[0.65rem] font-black uppercase tracking-[0.18em] ${
                prize ? "bg-[#d4af37] text-black" : "border border-white/20 text-zinc-200"
              }`}
            >
              {prize && <Award className="h-3.5 w-3.5" aria-hidden="true" />}
              {cert.result}
            </p>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-zinc-500">Issued by</dt>
                <dd className="mt-1 text-zinc-200">{cert.issuer}</dd>
              </div>
              <div>
                <dt className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-zinc-500">Date</dt>
                <dd className="mt-1 text-zinc-200">{cert.date}</dd>
              </div>
              <div>
                <dt className="text-[0.58rem] font-black uppercase tracking-[0.24em] text-zinc-500">About</dt>
                <dd className="mt-1 leading-relaxed text-zinc-400">{cert.note}</dd>
              </div>
            </dl>

            <div className="mt-auto flex items-center gap-2 pt-8">
              <button type="button" onClick={() => step(-1)} className="btn-ghost !px-4" aria-label="Previous certificate">
                <ChevronLeft className="h-4 w-4" aria-hidden="true" /> Prev
              </button>
              <button type="button" onClick={() => step(1)} className="btn-ghost !px-4" aria-label="Next certificate">
                Next <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <span className="ml-auto hidden text-[0.6rem] uppercase tracking-[0.2em] text-zinc-600 sm:block">← → to browse</span>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
