"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, Repeat, X } from "lucide-react";
import { useEffect, useState } from "react";
import ProfileAvatar from "@/components/profiles/ProfileAvatar";
import ProfileMenu from "@/components/browse/ProfileMenu";
import { scrollToId } from "@/lib/links";
import type { Profile } from "@/lib/types";

type NavbarProps = {
  profile: Profile;
  active: string;
  onSwitchProfile: () => void;
  onChangeProfile: (p: Profile) => void;
  onReplayIntro: () => void;
  onContact: () => void;
};

const links = [
  { id: "home", label: "Home" },
  { id: "pilot", label: "About" },
  { id: "moments", label: "Moments" },
  { id: "code", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "gallery", label: "Music & Games" },
  { id: "studio", label: "Work With Me" },
  { id: "picks", label: "Top Picks" },
];

export default function Navbar({ profile, active, onSwitchProfile, onChangeProfile, onReplayIntro, onContact }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open
          ? "bg-ink/90 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] backdrop-blur-md"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <nav className="shell flex h-16 items-center gap-6 lg:h-[4.5rem]" aria-label="Primary">
        <a href="#home" onClick={go("home")} className="flex shrink-0 items-baseline gap-1.5" aria-label="Surya — home">
          <span className="font-display text-3xl leading-none text-brand drop-shadow-[0_0_12px_rgba(229,9,20,0.7)]">
            SURYA
          </span>
          <span className="hidden text-[0.55rem] font-black uppercase tracking-[0.3em] text-zinc-400 sm:inline">
            Series
          </span>
        </a>

        <ul className="hidden items-center gap-0.5 xl:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={go(l.id)}
                aria-current={active === l.id ? "true" : undefined}
                className={`relative px-3 py-2 text-[0.8rem] transition-colors ${
                  active === l.id ? "font-semibold text-white" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {l.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 -bottom-0.5 h-[2px] origin-center rounded-full bg-brand shadow-glow transition-transform duration-300 ${
                    active === l.id ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onContact}
            className="hidden text-[0.65rem] font-black uppercase tracking-[0.2em] text-zinc-200 transition hover:text-white md:inline"
          >
            Let&rsquo;s Build
          </button>
          <div className="hidden sm:block">
            <ProfileMenu
              profile={profile}
              onChangeProfile={onChangeProfile}
              onSwitchProfile={onSwitchProfile}
              onReplayIntro={onReplayIntro}
              onContact={onContact}
            />
          </div>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-md text-white xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/5 xl:hidden"
          >
            <div className="shell flex flex-col gap-1 py-4">
              {links.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={go(l.id)}
                  aria-current={active === l.id ? "true" : undefined}
                  className={`flex items-center justify-between rounded-md px-3 py-3 font-display text-2xl tracking-wide transition ${
                    active === l.id ? "bg-white/5 text-white" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {l.label}
                  {active === l.id && <span className="h-2 w-2 rounded-full bg-brand shadow-glow" />}
                </a>
              ))}
              <div className="mt-3 flex items-center gap-3 border-t border-white/5 pt-4">
                <ProfileAvatar profile={profile} className="h-10 w-10 rounded-md" iconClassName="h-5 w-5" sizes="40px" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white">{profile.name}</p>
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.2em]" style={{ color: profile.accent }}>
                    {profile.title}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    onSwitchProfile();
                  }}
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/15 px-3 py-2 text-xs font-semibold text-white"
                >
                  <Repeat className="h-3.5 w-3.5" aria-hidden="true" />
                  Switch
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  onContact();
                }}
                className="btn-red mt-3 w-full"
              >
                Let&rsquo;s Build
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
