"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Play, Repeat, Sparkles } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import ProfileAvatar from "@/components/profiles/ProfileAvatar";
import { profiles } from "@/data/portfolio";
import type { Profile } from "@/lib/types";

type ProfileMenuProps = {
  profile: Profile;
  onChangeProfile: (p: Profile) => void;
  onSwitchProfile: () => void;
  onReplayIntro: () => void;
  onContact: () => void;
};

/** Netflix-style avatar ▾ dropdown: hop between profiles without leaving the page. */
export default function ProfileMenu({ profile, onChangeProfile, onSwitchProfile, onReplayIntro, onContact }: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        root.current?.querySelector<HTMLButtonElement>("[data-trigger]")?.focus();
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const items = Array.from(root.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? []);
        const i = items.indexOf(document.activeElement as HTMLElement);
        const next = e.key === "ArrowDown" ? (i + 1) % items.length : (i - 1 + items.length) % items.length;
        items[next]?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const run = (fn: () => void) => () => {
    setOpen(false);
    fn();
  };

  // Hover-intent open on pointer devices, like the streaming apps.
  const onEnter = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const onLeave = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    closeTimer.current = window.setTimeout(() => setOpen(false), 220);
  };

  const others = profiles.filter((p) => p.id !== profile.id);

  return (
    <div ref={root} className="relative" onPointerEnter={onEnter} onPointerLeave={onLeave}>
      <button
        type="button"
        data-trigger
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`Profile menu — watching as ${profile.name}`}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-md p-1 transition hover:bg-white/5"
      >
        <ProfileAvatar profile={profile} className="h-8 w-8 rounded" iconClassName="h-4 w-4" sizes="32px" />
        <ChevronDown
          className={`h-4 w-4 text-white transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            aria-label="Profiles"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 top-full mt-3 w-64 origin-top-right rounded-md border border-white/10 bg-black/90 py-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.95)] backdrop-blur-xl"
          >
            <span aria-hidden="true" className="absolute -top-2 right-4 h-0 w-0 border-x-8 border-b-8 border-x-transparent border-b-white/80" />

            <div className="flex items-center gap-3 border-b border-white/10 px-4 pb-3 pt-1">
              <ProfileAvatar profile={profile} className="h-9 w-9 rounded" iconClassName="h-4 w-4" sizes="36px" />
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{profile.name}</p>
                <p className="text-[0.58rem] font-bold uppercase tracking-[0.2em]" style={{ color: profile.accent }}>
                  Now watching · {profile.title}
                </p>
              </div>
            </div>

            <p className="px-4 pb-1 pt-3 text-[0.55rem] font-black uppercase tracking-[0.24em] text-zinc-500">Switch to</p>
            {others.map((p) => (
              <button
                key={p.id}
                type="button"
                role="menuitem"
                onClick={run(() => onChangeProfile(p))}
                className="group flex w-full items-center gap-3 px-4 py-2 text-left transition hover:bg-white/5 focus-visible:bg-white/10 focus-visible:outline-none"
              >
                <ProfileAvatar profile={p} className="h-8 w-8 rounded transition-transform group-hover:scale-110" iconClassName="h-4 w-4" sizes="32px" />
                <span className="min-w-0">
                  <span className="block truncate text-sm text-zinc-200 group-hover:text-white group-hover:underline">{p.name}</span>
                  <span className="block truncate text-[0.65rem] text-zinc-500">{p.title}</span>
                </span>
              </button>
            ))}

            <div className="mt-2 border-t border-white/10 pt-2">
              <MenuItem icon={Repeat} label="Manage profiles" onClick={run(onSwitchProfile)} />
              <MenuItem icon={Play} label="Replay opening" onClick={run(onReplayIntro)} />
              <MenuItem icon={Sparkles} label="Let’s build together" onClick={run(onContact)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuItem({ icon: Icon, label, onClick }: { icon: typeof Play; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className="flex w-full items-center gap-3 px-4 py-2 text-left text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white focus-visible:bg-white/10 focus-visible:outline-none"
    >
      <Icon className="h-4 w-4 text-zinc-500" aria-hidden="true" />
      {label}
    </button>
  );
}
