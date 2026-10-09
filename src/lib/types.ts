import type { LucideIcon } from "lucide-react";

export type Screen = "intro" | "profiles" | "browse";

/** Dashboard sections that a profile can re-order ("changes what plays first"). */
export type SectionId = "pilot" | "moments" | "code" | "journey" | "universe" | "gallery" | "studio" | "picks";

export type ProfileId = "surya" | "dev" | "fixer" | "entrepreneur" | "gamer";

export type Profile = {
  id: ProfileId;
  name: string;
  title: string;
  description: string;
  /** Tailwind gradient classes for the avatar tile. */
  gradient: string;
  /** Accent color used for borders, glows and badges. */
  accent: string;
  icon: LucideIcon;
  /** Optional photo shown instead of the icon. */
  image?: string;
  badge?: string;
  /** Sections in the order this profile watches them. */
  order: SectionId[];
  /** Billboard kicker shown while this profile is active. */
  heroKicker: string;
};

export type Project = {
  title: string;
  category: string;
  description: string;
  tags: string[];
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
};

export type ProjectVisual = {
  icon: LucideIcon;
  gradient: string;
  accent: string;
};

/** A photo in the Off Screen gallery (music, games, life away from the keyboard). */
export type Still = {
  id: string;
  title: string;
  /** Small tag on the poster, e.g. "Music" or "Game Night". */
  tag: string;
  description: string;
  story: string;
  /** Optional photo. Without one, the card renders as a gradient poster with `icon`. */
  image?: string;
  alt: string;
  /** Width / height of the original photo (or poster). */
  ratio: number;
  icon?: LucideIcon;
  /** Tailwind gradient classes for the photo-less poster. */
  gradient?: string;
  /** CSS object-position for the 4:5 poster crop, e.g. "70% 50%". */
  focus?: string;
  year?: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  outcomes: string[];
  format: string;
  cta: string;
  icon: LucideIcon;
  gradient: string;
  /** Optional external booking link. */
  externalUrl?: string;
  externalLabel?: string;
};

export type Episode = {
  number: string;
  title: string;
  target: SectionId | "outro";
  gradient: string;
  watermark: string;
  progress: number;
};

export type JourneyEpisode = {
  title: string;
  /** Short role-style tag, e.g. "The Founder". */
  tag: string;
  summary: string;
  /** Revealed when the episode dropdown is opened. */
  details: string[];
  tags: string[];
  gradient: string;
  /** Optional section to jump to from the expanded episode. */
  link?: SectionId;
};

export type Season = {
  number: string;
  name: string;
  logline: string;
  status: string;
  /** Optional epigraph shown under the season's logline. */
  quote?: Quote;
  episodes: JourneyEpisode[];
};

export type Genre = {
  id: string;
  name: string;
  summary: string;
  accent: string;
  skills: { name: string; note: string }[];
};

export type Quote = {
  text: string;
  author: string;
  /** Optional small line under the author, e.g. "Computer Scientist". */
  role?: string;
};

export type SocialLinks = {
  github: string;
  linkedin: string;
  email: string;
  instagram: string;
};

export type Moment = {
  /** Small gold line above the title, e.g. "Hackathon Winner". */
  kicker: string;
  title: string;
  org: string;
  description: string;
  /** Optional link (profile, post or certificate). */
  url?: string;
  /** Text for the link, defaults to "View certificate". */
  linkLabel?: string;
  /** Index into `credentials` — clicking the card opens that certificate. */
  certificate?: number;
};

export type Credential = {
  issuer: string;
  title: string;
  note: string;
  /** e.g. "1st Prize", "3rd Place", "Participation". */
  result: string;
  date: string;
  /** Certificate image in /public, opened in the viewer. */
  image?: string;
  /** Width / height of the image. */
  ratio?: number;
  url?: string;
};
