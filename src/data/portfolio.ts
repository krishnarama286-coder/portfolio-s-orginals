import {
  Bug,
  Code2,
  Crown,
  Gamepad2,
  Globe,
  Headphones,
  Layers,
  Puzzle,
  Rocket,
  Trophy,
  Wrench,
} from "lucide-react";
import type {
  Episode,
  Genre,
  Profile,
  Project,
  ProjectVisual,
  Quote,
  SectionId,
  Service,
  SocialLinks,
  Still,
} from "@/lib/types";

/* -------------------------------------------------------------------------- */
/*  Identity                                                                  */
/* -------------------------------------------------------------------------- */

export const brand = {
  name: "Surya",
  fullName: "Surya Srinivas K",
  series: "SURYA: THE SERIES",
  season: "Season 2026",
  roles: ["Web Developer", "PC & Laptop Repair", "Entrepreneur", "Game Designer", "Music Lover", "Gamer"],
  logline: "Surya fixes machines, builds for the web and keeps the music playing.",
  /** Used on the intro, billboard and profile tile. */
  portrait: "/profile/surya.jpg",
  portraitAlt: "Surya Srinivas K in sunglasses and a black shirt against a red brick wall",
  /** Used in the About section. */
  aboutPortrait: "/profile/surya-about.jpg",
  aboutPortraitAlt: "Surya Srinivas K in glasses and a white striped shirt",
} as const;

/** Replace the placeholder strings — unconfigured links stay hidden until you add them. */
export const socialLinks: SocialLinks = {
  github: "https://github.com/krishnarama286-coder",
  linkedin: "https://www.linkedin.com/in/surya-srinivas-40158937a",
  /** Use the form "mailto:you@example.com". */
  email: "mailto:krishnarama286@gmail.com",
  instagram: "https://www.instagram.com/k.2s.29",
};

/* -------------------------------------------------------------------------- */
/*  Profiles                                                                  */
/* -------------------------------------------------------------------------- */

export const profiles: Profile[] = [
  {
    id: "surya",
    name: "Surya",
    title: "The Full Series",
    description: "Every level, every side quest, one story.",
    gradient: "from-[#7a0a10] via-[#c40812] to-[#E50914]",
    accent: "#E50914",
    icon: Crown,
    image: brand.portrait,
    badge: "New",
    order: ["pilot", "journey", "moments", "code", "universe", "gallery", "studio", "picks"],
    heroKicker: "The full series, in order",
  },
  {
    id: "dev",
    name: "Web Developer",
    title: "Code & Interfaces",
    description: "Fast, clean websites and the systems behind them.",
    gradient: "from-[#0b4f6c] via-[#1689b3] to-[#4fc3e8]",
    accent: "#38bdf8",
    icon: Code2,
    order: ["code", "universe", "moments", "journey", "studio", "picks", "pilot", "gallery"],
    heroKicker: "The build room plays first",
  },
  {
    id: "fixer",
    name: "Tech Fixer",
    title: "Repair & Rescue",
    description: "Any laptop, any PC, any bug.",
    gradient: "from-[#3a0509] via-[#9b0b1a] to-[#ff4d6d]",
    accent: "#ff4d6d",
    icon: Wrench,
    order: ["studio", "universe", "journey", "pilot", "moments", "code", "picks", "gallery"],
    heroKicker: "The repair desk plays first",
  },
  {
    id: "entrepreneur",
    name: "Entrepreneur",
    title: "Venture & Vision",
    description: "Starting a company from scratch.",
    gradient: "from-[#7c4a03] via-[#d48a0b] to-[#f5b52e]",
    accent: "#f5a524",
    icon: Rocket,
    order: ["studio", "code", "journey", "moments", "pilot", "universe", "picks", "gallery"],
    heroKicker: "Ventures & vision play first",
  },
  {
    id: "gamer",
    name: "Music & Games",
    title: "Player One",
    description: "A playlist on, one more round.",
    gradient: "from-[#4c1d95] via-[#9d27b0] to-[#e1306c]",
    accent: "#d946ef",
    icon: Gamepad2,
    order: ["gallery", "journey", "pilot", "universe", "moments", "code", "studio", "picks"],
    heroKicker: "The soundtrack plays first",
  },
];

/* -------------------------------------------------------------------------- */
/*  Billboard                                                                 */
/* -------------------------------------------------------------------------- */

export const hero = {
  label: "★ Web Developer & Tech Fixer",
  headline: "Builds the Web. Fixes the Machine. Plays the Game.",
  copy: "Surya builds websites, repairs any laptop or PC, sets up software, hunts down bugs, designs games — and is starting a web development company. Music always on.",
  meta: ["Season 2026", "Web Developer", "PC & Laptop Repair", "5 Hackathons", "5 Certificates"],
  chips: [
    { label: "3rd Place", value: "NSRIT Launch Pad Hack Fest" },
    { label: "5 Hackathons", value: "NSRIT · MVGR · LNIT · GVP · Raghu" },
  ],
};

/** "Continue Exploring" row — each episode jumps to a section. */
export const episodes: Episode[] = [
  {
    number: "01",
    title: "The Pilot",
    target: "pilot",
    gradient: "from-[#2a1155] via-[#5b21b6] to-[#7c3aed]",
    watermark: "S",
    progress: 100,
  },
  {
    number: "02",
    title: "My Journey",
    target: "journey",
    gradient: "from-[#2b0718] via-[#831843] to-[#db2777]",
    watermark: "♥",
    progress: 86,
  },
  {
    number: "03",
    title: "Top Moments",
    target: "moments",
    gradient: "from-[#2e2203] via-[#8a6a0a] to-[#d4af37]",
    watermark: "★",
    progress: 72,
  },
  {
    number: "04",
    title: "The Build Room",
    target: "code",
    gradient: "from-[#3a0509] via-[#8f0a12] to-[#E50914]",
    watermark: "</>",
    progress: 58,
  },
  {
    number: "05",
    title: "Off Screen",
    target: "gallery",
    gradient: "from-[#2b0a3d] via-[#7e22ce] to-[#d946ef]",
    watermark: "♪",
    progress: 34,
  },
  {
    number: "06",
    title: "The Studio",
    target: "studio",
    gradient: "from-[#062a3a] via-[#0e6382] to-[#22a5d1]",
    watermark: "06",
    progress: 8,
  },
];

/* -------------------------------------------------------------------------- */
/*  About / The Pilot                                                         */
/* -------------------------------------------------------------------------- */

export const pilot = {
  quote: "Music fixes my mood. I fix the machines. Together, we build something new.",
  intro: [
    "Surya Srinivas K — Surya to everyone — is a happy, kind soul who never plays with anyone's feelings — someone who would rather make everyone in the room smile than talk about the hard days.",
    "Curiosity about how laptops work turned into a real skill: with no money for repairs, Surya learned every component and fixed the machines alone. Today that means repairing any laptop or PC, installing and setting up software, fixing bugs, building websites, designing games — and starting a web development company. Through all of it, music has been the one thing that always brings back a smile.",
  ],
  facts: [
    { label: "Builds", value: "Web Developer", sub: "HTML · CSS · JavaScript · React · Next.js" },
    { label: "Fixes", value: "PC & Laptop Repair", sub: "Hardware, components & troubleshooting" },
    { label: "Sets Up", value: "Software & Bugs", sub: "Installs, setup & debugging" },
    { label: "Starting", value: "Entrepreneur", sub: "A web development company" },
    { label: "Hackathons", value: "5 & counting", sub: "3rd Place at NSRIT Launch Pad" },
    { label: "Off Duty", value: "Music & Games", sub: "A playlist on, one more round" },
  ],
  interests: ["Web Development", "Laptop Repair", "Game Design", "Startups", "Music", "PC Gaming"],
};

/* -------------------------------------------------------------------------- */
/*  Season 1 — The Build Room                                                 */
/* -------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    title: "Surya: The Series",
    category: "Personal Portfolio",
    description:
      "This site: a cinematic, streaming-style portfolio with profiles, seasons and a certificate viewer.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    // liveUrl: "https://…",
    // githubUrl: "https://github.com/…",
  },
  {
    title: "The Repair Desk",
    category: "PC & Laptop Repair",
    description:
      "Diagnosing and fixing laptops and PCs — hardware faults, component swaps, OS reinstalls and software setup.",
    tags: ["Hardware", "Troubleshooting", "OS Install", "Upgrades"],
  },
  {
    title: "Hackathon Builds",
    category: "Prototypes Under Pressure",
    description:
      "Working prototypes shipped against the clock at five hackathons — including a 3rd-place finish at NSRIT.",
    tags: ["Rapid Prototyping", "Teamwork", "Pitching"],
  },
  {
    title: "Web Studio",
    category: "Startup / Web Services",
    description: "A web development company in the making — websites and web apps for people and small businesses.",
    tags: ["React", "Next.js", "Client Work", "Startup"],
  },
];

/** Placeholder artwork for each project (index-matched) until screenshots exist. */
export const projectVisuals: ProjectVisual[] = [
  { icon: Layers, gradient: "from-[#5c0612] via-[#b0103a] to-[#ff2d55]", accent: "#ff4d6d" },
  { icon: Wrench, gradient: "from-[#062a3a] via-[#0e6382] to-[#22a5d1]", accent: "#38bdf8" },
  { icon: Trophy, gradient: "from-[#3d1f02] via-[#9a5a06] to-[#f5b52e]", accent: "#fbbf24" },
  { icon: Rocket, gradient: "from-[#140a3d] via-[#4527a0] to-[#7c4dff]", accent: "#a78bfa" },
];

/* -------------------------------------------------------------------------- */
/*  Genres — the universe                                                     */
/* -------------------------------------------------------------------------- */

export const genres: Genre[] = [
  {
    id: "web",
    name: "Web Development",
    summary: "Interfaces people enjoy using",
    accent: "#E50914",
    skills: [
      { name: "HTML & CSS", note: "The foundations" },
      { name: "JavaScript", note: "Interactive by default" },
      { name: "React", note: "Component thinking" },
      { name: "Next.js", note: "App Router" },
      { name: "TypeScript", note: "Typed & tidy" },
      { name: "Tailwind", note: "Design systems" },
    ],
  },
  {
    id: "repair",
    name: "PC & Laptop Repair",
    summary: "Any brand, any fault",
    accent: "#ff4d6d",
    skills: [
      { name: "Diagnostics", note: "Find the real fault" },
      { name: "Components", note: "RAM, SSD, battery & more" },
      { name: "Hardware Fixes", note: "Open it, fix it, close it" },
      { name: "Upgrades", note: "Faster, longer-lasting machines" },
      { name: "PC Builds", note: "Parts to power-on" },
      { name: "Data Care", note: "Keep files safe" },
    ],
  },
  {
    id: "software",
    name: "Software & Setup",
    summary: "Installed, configured, working",
    accent: "#38bdf8",
    skills: [
      { name: "OS Install", note: "Windows & more" },
      { name: "Drivers", note: "Everything detected" },
      { name: "Apps & Tools", note: "Any software, set up right" },
      { name: "Dev Setup", note: "Ready to code" },
    ],
  },
  {
    id: "debug",
    name: "Bug Fixing",
    summary: "If it breaks, it gets fixed",
    accent: "#a78bfa",
    skills: [
      { name: "Debugging", note: "Trace it to the root" },
      { name: "System Errors", note: "Crashes, freezes, blue screens" },
      { name: "Web Bugs", note: "Layout, logic & performance" },
      { name: "Problem Solving", note: "Calm under pressure" },
    ],
  },
  {
    id: "games",
    name: "Game Design",
    summary: "Worlds built from code",
    accent: "#4ade80",
    skills: [
      { name: "HTML Canvas", note: "Drawing with code" },
      { name: "Game Logic", note: "Rules, levels & scores" },
      { name: "Game Feel", note: "From years of PC gaming" },
      { name: "Level Design", note: "Challenge that's fun" },
    ],
  },
  {
    id: "venture",
    name: "Entrepreneurship",
    summary: "Starting something of my own",
    accent: "#fbbf24",
    skills: [
      { name: "Web Studio", note: "A company in the making" },
      { name: "Client Work", note: "Deliver end to end" },
      { name: "Product Thinking", note: "What to build first" },
      { name: "Pitching", note: "Sell the idea" },
    ],
  },
  {
    id: "offduty",
    name: "Music & Gaming",
    summary: "The things that keep me going",
    accent: "#d946ef",
    skills: [
      { name: "Music", note: "The small smile on low days" },
      { name: "Mixing Moods", note: "Combining tracks & genres" },
      { name: "PC Gaming", note: "A lot of hours, a lot of games" },
      { name: "Strategy", note: "Read the map first" },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Season 2 — Off Screen (music, games & life)                               */
/*  Add `image` to any card to swap its poster for a photo.                   */
/* -------------------------------------------------------------------------- */

export const stills: Still[] = [
  {
    id: "on-loop",
    title: "On Loop",
    tag: "Music",
    description: "Whenever I'm low, music brings back a small smile — and that's enough.",
    story:
      "Music is the one thing that has always been there. On the hard days it turns the noise down, and that small smile it brings back is something Surya is truly happy with. Mixing genres and moods is its own kind of creating.",
    alt: "Poster for On Loop: music",
    icon: Headphones,
    gradient: "from-[#2b0a3d] via-[#7e22ce] to-[#d946ef]",
    ratio: 4 / 5,
  },
  {
    id: "player-one",
    title: "Player One",
    tag: "PC Gaming",
    description: "A lot of PC games, a lot of hours — and a lot learned.",
    story:
      "Years of PC gaming taught strategy, patience and how to bounce back after a loss. It also sparked the question that started everything else: how does this machine actually work?",
    alt: "Poster for Player One: PC gaming",
    icon: Gamepad2,
    gradient: "from-[#06261a] via-[#14633f] to-[#22c55e]",
    ratio: 4 / 5,
  },
  {
    id: "game-designer",
    title: "Game Designer",
    tag: "Canvas & Games",
    description: "From playing games to designing them.",
    story:
      "Drawing worlds with HTML Canvas and writing the rules that make them fun — levels, scores and the feel that only someone who has played a lot of games can get right.",
    alt: "Poster for Game Designer: canvas and games",
    icon: Puzzle,
    gradient: "from-[#062a3a] via-[#0e6382] to-[#22a5d1]",
    ratio: 4 / 5,
  },
  {
    id: "main-character",
    title: "Main Character",
    tag: "Life",
    description: "Do it with passion or not at all.",
    story:
      "Happy, outgoing, kind and always trying to be better — starting something new to build a life to love peacefully.",
    image: "/gallery/main-character.jpg",
    alt: "Surya in sunglasses leaning on a motorbike handle in a brick-walled cafe",
    ratio: 719 / 1600,
    focus: "60% 72%",
  },
];

/* -------------------------------------------------------------------------- */
/*  Season 3 — The Studio (work with Surya)                                   */
/* -------------------------------------------------------------------------- */

export const services: Service[] = [
  {
    id: "web",
    title: "Websites & Web Apps",
    description: "Fast, modern, responsive sites built with React and Next.js.",
    outcomes: [
      "A clean, mobile-first design",
      "Built on Next.js, React and TypeScript",
      "Deployed, live and easy to update",
    ],
    format: "Project-based · Freelance",
    cta: "Start a project",
    icon: Globe,
    gradient: "from-[#E50914]/30 via-[#E50914]/5 to-transparent",
  },
  {
    id: "repair",
    title: "PC & Laptop Repair",
    description: "Slow, dead, overheating or broken — any laptop or PC, diagnosed and fixed.",
    outcomes: [
      "A clear diagnosis of what's wrong",
      "Hardware fixes, part swaps and upgrades",
      "A machine that runs like it should",
    ],
    format: "Any brand · Laptops & desktops",
    cta: "Get it fixed",
    icon: Wrench,
    gradient: "from-[#ff4d6d]/30 via-[#ff4d6d]/5 to-transparent",
  },
  {
    id: "software",
    title: "Software Setup & Bug Fixing",
    description: "OS installs, drivers, apps and dev tools set up — and the bugs fixed.",
    outcomes: [
      "Windows, drivers and everyday apps installed",
      "Errors, crashes and slowdowns fixed",
      "Free and open-source options where they fit",
    ],
    format: "Remote or in person",
    cta: "Fix my setup",
    icon: Bug,
    gradient: "from-[#7c4dff]/30 via-[#7c4dff]/5 to-transparent",
  },
];

/* -------------------------------------------------------------------------- */
/*  Top Picks                                                                 */
/* -------------------------------------------------------------------------- */

export type TopPick =
  | { kind: "still"; id: string }
  | { kind: "project"; index: number }
  | { kind: "service"; id: string };

export const topPicks: TopPick[] = [
  { kind: "still", id: "main-character" },
  { kind: "service", id: "repair" },
  { kind: "project", index: 0 },
  { kind: "still", id: "on-loop" },
  { kind: "project", index: 3 },
];

/* -------------------------------------------------------------------------- */
/*  Quotes — one epigraph per chapter                                         */
/* -------------------------------------------------------------------------- */

/** Shown before each section (and on the profile screen / credits). Edit freely. */
export const quotes: Record<SectionId | "profiles" | "outro", Quote> = {
  profiles: {
    text: "The best way to predict the future is to invent it.",
    author: "Alan Kay",
    role: "Computer Scientist",
  },
  pilot: {
    text: "Talk is cheap. Show me the code.",
    author: "Linus Torvalds",
    role: "Creator of Linux",
  },
  code: {
    text: "First, solve the problem. Then, write the code.",
    author: "John Johnson",
    role: "Developer",
  },
  moments: {
    text: "Stay hungry. Stay foolish.",
    author: "Steve Jobs",
    role: "Stanford, 2005",
  },
  journey: {
    text: "Out of difficulties grow miracles.",
    author: "Jean de La Bruyère",
    role: "Philosopher",
  },
  universe: {
    text: "The details are not the details. They make the design.",
    author: "Charles Eames",
    role: "Designer",
  },
  gallery: {
    text: "Where words fail, music speaks.",
    author: "Hans Christian Andersen",
    role: "Writer",
  },
  studio: {
    text: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    role: "Entrepreneur",
  },
  picks: {
    text: "You can't use up creativity. The more you use, the more you have.",
    author: "Maya Angelou",
    role: "Poet",
  },
  outro: {
    text: "Start where you are. Use what you have. Do what you can.",
    author: "Arthur Ashe",
    role: "Champion & Activist",
  },
};
