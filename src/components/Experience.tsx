"use client";

import { AnimatePresence, MotionConfig } from "framer-motion";
import { useCallback, useState } from "react";
import IntroSplash from "@/components/intro/IntroSplash";
import ProfileSelector from "@/components/profiles/ProfileSelector";
import Dashboard from "@/components/browse/Dashboard";
import { profiles } from "@/data/portfolio";
import type { Profile, Screen } from "@/lib/types";

const defaultProfile = profiles[0] as Profile;

/** INTRO → PROFILE SELECTOR → MAIN DASHBOARD */
export default function Experience() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [profile, setProfile] = useState<Profile>(defaultProfile);

  const go = useCallback((next: Screen) => {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        {screen === "intro" && <IntroSplash key="intro" onPlay={() => go("profiles")} />}
        {screen === "profiles" && (
          <ProfileSelector
            key="profiles"
            activeId={profile.id}
            onSelect={(p) => {
              setProfile(p);
              go("browse");
            }}
            onBack={() => go("intro")}
          />
        )}
        {screen === "browse" && (
          <Dashboard
            key="browse"
            profile={profile}
            onSwitchProfile={() => go("profiles")}
            onChangeProfile={(p) => {
              setProfile(p);
              window.scrollTo({ top: 0, behavior: "auto" });
            }}
            onReplayIntro={() => go("intro")}
          />
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
