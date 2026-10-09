"use client";

import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import Navbar from "@/components/browse/Navbar";
import Hero from "@/components/browse/Hero";
import ContinueRow from "@/components/browse/ContinueRow";
import Pilot from "@/components/browse/Pilot";
import Journey from "@/components/browse/Journey";
import TopMoments from "@/components/browse/TopMoments";
import CodeSeason from "@/components/browse/CodeSeason";
import Universe from "@/components/browse/Universe";
import OffScreen from "@/components/browse/OffScreen";
import Studio from "@/components/browse/Studio";
import TopPicks from "@/components/browse/TopPicks";
import Outro from "@/components/browse/Outro";
import StillModal from "@/components/browse/StillModal";
import ServiceModal from "@/components/browse/ServiceModal";
import ContactModal from "@/components/browse/ContactModal";
import CertificateModal from "@/components/browse/CertificateModal";
import QuoteInterlude from "@/components/ui/QuoteInterlude";
import { quotes, services } from "@/data/portfolio";
import type { Profile, SectionId } from "@/lib/types";

type DashboardProps = {
  profile: Profile;
  onSwitchProfile: () => void;
  onChangeProfile: (p: Profile) => void;
  onReplayIntro: () => void;
};

const TRACKED = ["home", "pilot", "moments", "code", "journey", "universe", "gallery", "studio", "picks", "outro"];

/** Screen 3 — the browse experience. */
export default function Dashboard({ profile, onSwitchProfile, onChangeProfile, onReplayIntro }: DashboardProps) {
  const [stillIndex, setStillIndex] = useState<number | null>(null);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [certIndex, setCertIndex] = useState<number | null>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [seen, setSeen] = useState<Set<string>>(() => new Set(["home"]));

  // Track the section in view: drives the nav underline and episode progress.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          setActive(id);
          setSeen((prev) => (prev.has(id) ? prev : new Set(prev).add(id)));
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    TRACKED.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [profile.id]);

  const openContact = () => setContactOpen(true);

  const sections: Record<SectionId, ReactNode> = {
    pilot: <Pilot key="pilot" />,
    moments: <TopMoments key="moments" onOpenCertificate={setCertIndex} />,
    code: <CodeSeason key="code" />,
    journey: <Journey key="journey" />,
    universe: <Universe key="universe" />,
    gallery: <OffScreen key="gallery" onOpen={setStillIndex} />,
    studio: <Studio key="studio" onOpen={setServiceId} />,
    picks: <TopPicks key="picks" onOpenStill={setStillIndex} onOpenService={setServiceId} />,
  };

  const service = services.find((s) => s.id === serviceId) ?? null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="relative min-h-screen bg-ink"
    >
      <a
        href="#main"
        className="sr-only z-[80] rounded bg-white px-4 py-2 text-black focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Navbar
        profile={profile}
        active={active}
        onSwitchProfile={onSwitchProfile}
        onChangeProfile={onChangeProfile}
        onReplayIntro={onReplayIntro}
        onContact={openContact}
      />

      <main id="main">
        <Hero profile={profile} />
        <ContinueRow seen={seen} />
        <div className="flex flex-col gap-24 pb-8 pt-16 sm:gap-32 sm:pt-24">
          {profile.order.map((id) => (
            <div key={id} className="flex flex-col gap-16 sm:gap-24">
              <QuoteInterlude quote={quotes[id]} />
              {sections[id]}
            </div>
          ))}
          <QuoteInterlude quote={quotes.outro} />
        </div>
      </main>

      <Outro onReplayIntro={onReplayIntro} onContact={openContact} />

      <StillModal
        index={stillIndex}
        onClose={() => setStillIndex(null)}
        onNavigate={setStillIndex}
      />
      <ServiceModal
        service={service}
        onClose={() => setServiceId(null)}
      />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <CertificateModal index={certIndex} onClose={() => setCertIndex(null)} onNavigate={setCertIndex} />
    </motion.div>
  );
}
