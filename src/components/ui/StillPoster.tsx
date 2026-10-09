"use client";

import SmartImage from "@/components/ui/SmartImage";
import type { Still } from "@/lib/types";

type StillPosterProps = {
  still: Still;
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Icon size classes for the photo-less poster. */
  iconClassName?: string;
};

/** A still's photo, or — when it has none — a gradient poster with its icon. */
export default function StillPoster({
  still,
  sizes,
  className = "",
  priority,
  iconClassName = "h-14 w-14",
}: StillPosterProps) {
  if (still.image) {
    return (
      <SmartImage
        src={still.image}
        alt={still.alt}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
        style={{ objectPosition: still.focus ?? "50% 40%" }}
        fallbackLabel={still.image}
      />
    );
  }

  const Icon = still.icon;
  return (
    <span
      role="img"
      aria-label={still.alt}
      className={`absolute inset-0 grid place-items-center overflow-hidden bg-gradient-to-br ${
        still.gradient ?? "from-[#2b0a3d] via-[#7e22ce] to-[#d946ef]"
      }`}
    >
      <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.3),transparent_55%)]" />
      <span aria-hidden="true" className="display absolute -bottom-6 -right-2 text-[9rem] leading-none text-white/10">
        {still.tag.slice(0, 1)}
      </span>
      {Icon && (
        <Icon
          aria-hidden="true"
          strokeWidth={1.4}
          className={`relative text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-transform duration-700 group-hover:scale-110 ${iconClassName}`}
        />
      )}
    </span>
  );
}
