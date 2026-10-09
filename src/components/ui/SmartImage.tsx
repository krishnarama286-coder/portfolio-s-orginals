"use client";

import Image, { type ImageProps } from "next/image";
import { ImageOff } from "lucide-react";
import { useState } from "react";

type SmartImageProps = Omit<ImageProps, "src" | "alt"> & {
  src?: string;
  alt: string;
  /** Label shown on the placeholder when the image is missing or fails. */
  fallbackLabel?: string;
  fallbackClassName?: string;
};

/**
 * next/image with a graceful cinematic placeholder for missing or broken assets,
 * so every image path stays configurable without ever showing a broken icon.
 */
export default function SmartImage({
  src,
  alt,
  fallbackLabel,
  fallbackClassName = "",
  className = "",
  ...rest
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_50%_35%,rgba(229,9,20,0.35),transparent_60%),linear-gradient(160deg,#241a2e,#121014)] text-zinc-400 ${fallbackClassName}`}
      >
        <ImageOff className="h-6 w-6 opacity-60" aria-hidden="true" />
        {fallbackLabel && (
          <span className="px-4 text-center text-[0.65rem] font-semibold uppercase tracking-[0.2em]">
            {fallbackLabel}
          </span>
        )}
      </div>
    );
  }

  return (
    <Image src={src} alt={alt} className={className} onError={() => setFailed(true)} {...rest} />
  );
}
