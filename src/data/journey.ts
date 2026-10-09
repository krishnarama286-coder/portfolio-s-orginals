import type { Season } from "@/lib/types";

/* -------------------------------------------------------------------------- */
/*  My Journey — Surya's story in six seasons, in Surya's own voice.          */
/*  A happy, kind kid who heard "failure" too often, found peace in music,    */
/*  found purpose inside a laptop, and is now building something new.        */
/*  Every season opens with a quote; every episode has a ⌄ dropdown.          */
/* -------------------------------------------------------------------------- */

const RED = "from-[#3a0509] via-[#9b0b1a] to-[#E50914]";
const AMBER = "from-[#3d1f02] via-[#9a5a06] to-[#f5b52e]";
const GOLD = "from-[#2e2203] via-[#8a6a0a] to-[#d4af37]";
const BLUE = "from-[#062a3a] via-[#0e6382] to-[#22a5d1]";
const VIOLET = "from-[#1a0a3d] via-[#4527a0] to-[#7c4dff]";
const ROSE = "from-[#2b0718] via-[#831843] to-[#db2777]";
const GREEN = "from-[#06261a] via-[#14633f] to-[#22c55e]";
const NIGHT = "from-[#07070c] via-[#1b1d33] to-[#3b3f6b]";
const DUSK = "from-[#0d0a14] via-[#2d1b3d] to-[#6b3a6b]";
const PURPLE = "from-[#1f0a2e] via-[#6b21a8] to-[#d946ef]";

/** Which season is selected when the section first appears (0-based). */
export const defaultSeason = 0;

export const journeyIntro = {
  subtitle: "An outgoing kid with a soft heart, a pair of headphones and a broken laptop — and the story of what came next.",
  aside: "Six seasons. One heart. Pick a season, then open any episode to read the full story.",
};

export const seasons: Season[] = [
  {
    number: "01",
    name: "The Life of the Room",
    logline: "I'm Surya Srinivas K — happy, outgoing and kind. I love being around people, and I never play with anyone's feelings.",
    status: "Where it began",
    quote: {
      text: "Be yourself; everyone else is already taken.",
      author: "Oscar Wilde",
      role: "Writer",
    },
    episodes: [
      {
        title: "The Kind One",
        tag: "The Happy Soul",
        summary: "I've always been the one who makes others laugh — and I never play with anyone's feelings.",
        details: [
          "Kindness was never a strategy for me. It's just who I am.",
          "If I can make someone's day a little lighter, that's a good day for me too.",
        ],
        tags: ["Kindness", "Happiness"],
        gradient: ROSE,
      },
      {
        title: "Words That Stayed",
        tag: "The Listener",
        summary: "From a young age I kept hearing one word: failure. It felt like no one really cared.",
        details: [
          "Words like that don't leave quickly. They stay, quietly, for years.",
          "I learned I couldn't change what people said — only what I did next.",
        ],
        tags: ["Childhood", "Strength"],
        gradient: NIGHT,
      },
      {
        title: "Behind the Smile",
        tag: "The Silent Fighter",
        summary: "There were days I sank into something close to depression. I never let it show.",
        details: [
          "I'm loud and outgoing — but when someone plays with my feelings, I go quiet inside. I kept that sadness to myself and kept making other people happy.",
          "Smiling for others while fighting quietly inside — that was my first real battle.",
        ],
        tags: ["Resilience", "Inner Strength"],
        gradient: DUSK,
      },
    ],
  },
  {
    number: "02",
    name: "The Soundtrack",
    logline: "Whenever I was low, I put my headphones on. Music never asked me to be anything other than me.",
    status: "Finding peace",
    quote: {
      text: "One good thing about music, when it hits you, you feel no pain.",
      author: "Bob Marley",
      role: "Musician",
    },
    episodes: [
      {
        title: "Headphones On",
        tag: "The Listener",
        summary: "Music became my safe place — the first thing I reach for on a heavy day.",
        details: [
          "When the world got loud, music turned it down.",
          "It still works, every single time.",
        ],
        tags: ["Music", "Healing"],
        gradient: PURPLE,
        link: "gallery",
      },
      {
        title: "The Small Smile",
        tag: "The Survivor",
        summary: "Music always gives me a small smile — and that small smile is enough for me.",
        details: [
          "It isn't loud happiness. It's quiet, and it's real.",
          "I've learned to be satisfied with small smiles. They add up.",
        ],
        tags: ["Hope", "Gratitude"],
        gradient: ROSE,
      },
      {
        title: "Mixing Moods",
        tag: "The Creator",
        summary: "I started trying combinations of music — blending tracks and moods into something new.",
        details: [
          "Mixing songs taught me that different pieces can make something beautiful together.",
          "It was the first time I realised I liked creating, not just listening.",
        ],
        tags: ["Music", "Creativity"],
        gradient: VIOLET,
        link: "gallery",
      },
    ],
  },
  {
    number: "03",
    name: "Inside the Machine",
    logline: "To escape the stress, I started learning how laptops work — and every system I opened made me more curious.",
    status: "The spark",
    quote: {
      text: "I have no special talents. I am only passionately curious.",
      author: "Albert Einstein",
      role: "Physicist",
    },
    episodes: [
      {
        title: "Curiosity Boots Up",
        tag: "The Explorer",
        summary: "The mechanics of every system pulled me in. How does it start? Why does it fail?",
        details: [
          "Laptops and PCs became my escape — a world that made sense when nothing else did.",
          "A lot of PC gaming had already made me curious about what was happening inside the machine.",
        ],
        tags: ["Curiosity", "Hardware"],
        gradient: BLUE,
        link: "universe",
      },
      {
        title: "Not a Maths Person",
        tag: "The Different Learner",
        summary: "I know I can't do maths, and grades were never my strength. But laptops taught me in a way books never did.",
        details: [
          "I learned by searching, opening, testing and trying again.",
          "Marks never measured what I could actually do with my hands and a screwdriver.",
        ],
        tags: ["Self-Taught", "Learning by Doing"],
        gradient: NIGHT,
      },
      {
        title: "Fixing It Myself",
        tag: "The Technician",
        summary: "When my laptop broke and there was no money for repairs, I fixed it myself.",
        details: [
          "I searched everything, learned every component, and figured out how to repair it.",
          "Now I can repair any kind of laptop or PC, install and set up any software, and fix the bugs that come with them.",
        ],
        tags: ["Laptop Repair", "Components", "Software"],
        gradient: RED,
        link: "studio",
      },
    ],
  },
  {
    number: "04",
    name: "A Friend Opens the Door",
    logline: "A friend sat with me and taught me how everything works — and the web became my new world.",
    status: "Levelling up",
    quote: {
      text: "Alone we can do so little; together we can do so much.",
      author: "Helen Keller",
      role: "Author & Activist",
    },
    episodes: [
      {
        title: "A Friend's Lesson",
        tag: "The Student",
        summary: "One friend believed in me enough to teach me how it all works.",
        details: [
          "Sometimes all you need is one person who takes the time.",
          "I'll always be grateful for that push.",
        ],
        tags: ["Friendship", "Gratitude"],
        gradient: AMBER,
      },
      {
        title: "Hello, World",
        tag: "The Developer",
        summary: "HTML, CSS, JavaScript — then React and Next.js. Pages I made, loading on a screen.",
        details: [
          "Web development felt like fixing laptops: understand the system, then make it work.",
          "Every bug I fixed made me more confident.",
        ],
        tags: ["HTML", "JavaScript", "React", "Next.js"],
        gradient: BLUE,
        link: "code",
      },
      {
        title: "From Player to Designer",
        tag: "The Game Designer",
        summary: "After playing so many games, I started designing my own with HTML Canvas.",
        details: [
          "Drawing worlds with code and writing the rules that make them fun.",
          "All those hours of gaming finally had a purpose.",
        ],
        tags: ["HTML Canvas", "Game Design"],
        gradient: GREEN,
        link: "gallery",
      },
    ],
  },
  {
    number: "05",
    name: "Building My Own",
    logline: "The kid who was called a failure went to five hackathons, stood on a podium, and started a company.",
    status: "Now streaming",
    quote: {
      text: "Our greatest glory is not in never falling, but in rising every time we fall.",
      author: "Confucius",
      role: "Philosopher",
    },
    episodes: [
      {
        title: "Hackathon Nights",
        tag: "The Competitor",
        summary: "Five hackathons — two of them full 24-hour builds.",
        details: [
          "Hackverse 1.0 at Raghu Engineering College and the Hogwarts Hackathon at GVP — 24 hours each.",
          "Aadhrita Hack24 at MVGR with HackerRank, as part of team Thunder buddies.",
          "Hacktriad 2.0 at LNIT 2k26, Lendi's national innovation summit.",
        ],
        tags: ["Hackverse", "Hogwarts", "Aadhrita", "Hacktriad"],
        gradient: RED,
        link: "moments",
      },
      {
        title: "The Podium",
        tag: "The Champion",
        summary: "3rd Place at the NSRIT Launch Pad Hack Fest 2026 — a Certificate of Merit.",
        details: [
          "Proof, on paper, that the word 'failure' was never the full story.",
          "Every late night of learning led to this moment.",
        ],
        tags: ["NSRIT", "3rd Place"],
        gradient: GOLD,
        link: "moments",
      },
      {
        title: "The Company",
        tag: "The Entrepreneur",
        summary: "I'm starting my own web development company — built on everything I taught myself.",
        details: [
          "Websites, web apps, laptop repair and software setup — under one roof.",
          "Something of my own, built from nothing but curiosity and hard work.",
        ],
        tags: ["Startup", "Web Development"],
        gradient: AMBER,
        link: "studio",
      },
    ],
  },
  {
    number: "06",
    name: "Learning to Live Peacefully",
    logline: "This is me — trying to be better, stepping out of the world I hide in when I'm hurt, and starting something new so I can live a life I love, peacefully.",
    status: "Still being written",
    quote: {
      text: "The wound is the place where the Light enters you.",
      author: "Rumi",
      role: "Poet",
    },
    episodes: [
      {
        title: "Trying to Be Better",
        tag: "The Work in Progress",
        summary: "Every day, a little better than yesterday. That's the only competition that matters.",
        details: [
          "I'm not perfect, and I don't pretend to be.",
          "But I keep showing up — and that's how everything I have was built.",
        ],
        tags: ["Growth", "Patience"],
        gradient: VIOLET,
      },
      {
        title: "Out of My World",
        tag: "The Brave One",
        summary: "When people hurt me, I disappear into my own world. Now I'm learning to step out of it.",
        details: [
          "Talking about what I feel, instead of only smiling through it.",
          "The life of the room is learning to let people see the inside too.",
        ],
        tags: ["Courage", "New Beginnings"],
        gradient: BLUE,
      },
      {
        title: "A Life I Love",
        tag: "To be continued",
        summary: "A company of my own, music in my ears, and a life I can love peacefully.",
        details: [
          "Fixing machines, building for the web, designing games — and smiling, for real this time.",
          "The story isn't over. The best season hasn't aired yet.",
        ],
        tags: ["Peace", "Next Chapter"],
        gradient: GOLD,
      },
    ],
  },
];
