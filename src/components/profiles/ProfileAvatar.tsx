"use client";

import Image from "next/image";
import { useState } from "react";
import type { Profile } from "@/lib/types";

type ProfileAvatarProps = {
  profile: Profile;
  className?: string;
  iconClassName?: string;
  showBadge?: boolean;
  sizes?: string;
};

/** Square profile tile: a configurable photo, or a gradient tile with an icon. */
export default function ProfileAvatar({
  profile,
  className = "",
  iconClassName = "h-6 w-6",
  showBadge = false,
  sizes = "176px",
}: ProfileAvatarProps) {
  const Icon = profile.icon;
  // Falls back to the icon tile until the photo exists.
  const [failed, setFailed] = useState(false);
  return (
    <span
      className={`relative block overflow-hidden bg-gradient-to-br ${profile.gradient} ${className}`}
      aria-hidden="true"
    >
      {profile.image && !failed ? (
        <>
          <Image
            src={profile.image}
            alt=""
            fill
            sizes={sizes}
            onError={() => setFailed(true)}
            className="object-cover object-[50%_25%] mix-blend-luminosity saturate-150"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-[#7a0a10]/70 via-transparent to-transparent" />
        </>
      ) : (
        <>
          <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
          <span className="absolute inset-0 grid place-items-center">
            <Icon className={`${iconClassName} text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]`} strokeWidth={1.75} />
          </span>
        </>
      )}
      {showBadge && profile.badge && (
        <span className="absolute right-1.5 top-1.5 rounded-sm bg-brand px-1.5 py-0.5 text-[0.55rem] font-black uppercase tracking-wider text-white shadow-glow">
          {profile.badge}
        </span>
      )}
    </span>
  );
}
