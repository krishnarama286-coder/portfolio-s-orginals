"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { socialLinks } from "@/data/portfolio";
import { isConfigured, isExternal } from "@/lib/links";

const items = [
  { key: "linkedin", label: "LinkedIn", icon: Linkedin },
  { key: "github", label: "GitHub", icon: Github },
  { key: "email", label: "Email", icon: Mail },
  { key: "instagram", label: "Instagram", icon: Instagram },
] as const;

type SocialPillsProps = {
  include?: (typeof items)[number]["key"][];
  className?: string;
};

/**
 * Outline pills for each social channel. Channels whose link is still a
 * placeholder are hidden — they appear automatically once the link is added.
 */
export default function SocialPills({
  include = ["linkedin", "github", "email"],
  className = "",
}: SocialPillsProps) {
  const visible = items.filter((i) => include.includes(i.key) && isConfigured(socialLinks[i.key]));
  if (visible.length === 0) return null;
  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 sm:gap-3 ${className}`}>
      {visible.map(({ key, label, icon: Icon }) => {
          const href = socialLinks[key];
          return (
            <motion.a
              key={key}
              href={href}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="pill"
              {...(isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {label}
              <ArrowUpRight className="h-3 w-3 opacity-70" aria-hidden="true" />
            </motion.a>
          );
        })}
    </div>
  );
}
