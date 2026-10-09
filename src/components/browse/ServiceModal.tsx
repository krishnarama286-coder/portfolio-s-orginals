"use client";

import { ArrowUpRight, Check, Mail } from "lucide-react";
import { useRef } from "react";
import Modal from "@/components/ui/Modal";
import SocialPills from "@/components/ui/SocialLinks";
import { socialLinks } from "@/data/portfolio";
import { isConfigured } from "@/lib/links";
import type { Service } from "@/lib/types";

type ServiceModalProps = {
  service: Service | null;
  onClose: () => void;
};

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  const last = useRef(service);
  if (service) last.current = service;
  const m = service ?? last.current;
  const email = isConfigured(socialLinks.email) ? socialLinks.email : null;

  return (
    <Modal open={!!service} onClose={onClose} labelledBy="service-title" size="md">
      {m && (
        <div className="relative overflow-hidden">
          <div aria-hidden="true" className={`absolute inset-x-0 top-0 h-56 bg-gradient-to-b ${m.gradient}`} />
          <div className="relative p-6 pt-10 sm:p-10">
            <span className="grid h-14 w-14 place-items-center rounded-xl border border-white/15 bg-black/40 text-white">
              <m.icon className="h-7 w-7" aria-hidden="true" strokeWidth={1.6} />
            </span>
            <p className="kicker mt-6">The Studio</p>
            <h2 id="service-title" className="display mt-2 text-5xl text-white">
              {m.title}
            </h2>
            <p className="mt-3 text-zinc-300">{m.description}</p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">{m.format}</p>

            <h3 className="mt-8 text-[0.65rem] font-black uppercase tracking-[0.24em] text-zinc-400">
              What you&rsquo;ll get
            </h3>
            <ul className="mt-3 space-y-2.5">
              {m.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-sm text-zinc-200">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
                  {o}
                </li>
              ))}
            </ul>

            <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
              {isConfigured(m.externalUrl) && (
                <a href={m.externalUrl} target="_blank" rel="noopener noreferrer" className="btn-light w-full">
                  {m.externalLabel ?? "Book now"}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
              {email ? (
                <a
                  href={`${email}?subject=${encodeURIComponent(`The Studio — ${m.title}`)}`}
                  className="btn-red w-full"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  {m.cta}
                </a>
              ) : (
                <>
                  <p className="text-sm text-zinc-400">
                    Slots open now. Reach out on any channel below and mention <span className="text-white">{m.title}</span>.
                  </p>
                  <SocialPills include={["linkedin", "email", "instagram"]} className="mt-4 !justify-start" />
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
