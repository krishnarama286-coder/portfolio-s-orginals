import type { Credential, Moment } from "@/lib/types";

/* -------------------------------------------------------------------------- */
/*  Top Moments & Certificates — from Surya's real hackathon certificates.    */
/*  Certificate images live in /public/certificates.                          */
/* -------------------------------------------------------------------------- */

export const credentials: Credential[] = [
  {
    issuer: "NSRIT",
    title: "Launch Pad Hack Fest 2026",
    result: "3rd Place",
    note: "Certificate of Merit for securing 3rd position — 8-hour inter-collegiate hackathon (B.Tech First Year Edition), NSRIT Autonomous, Visakhapatnam.",
    date: "30 April 2026",
    image: "/certificates/nsrit-launchpad.jpg",
    ratio: 820 / 560,
  },
  {
    issuer: "MVGR × HackerRank",
    title: "Aadhrita Hack24",
    result: "Participation",
    note: "Hackathon for coding skills, teamwork and innovation — representing team “Thunder buddies”.",
    date: "13 March 2026",
    image: "/certificates/aadhrita-hack24.jpg",
    ratio: 1100 / 1041,
  },
  {
    issuer: "Lendi · LNIT 2k26",
    title: "Hacktriad 2.0",
    result: "Participation",
    note: "Hackathon at the Lendi National Innovation and Technology Summit, Lendi Institute of Engineering & Technology.",
    date: "26–28 February 2026",
    image: "/certificates/lnit-hacktriad.jpg",
    ratio: 815 / 575,
  },
  {
    issuer: "Gayatri Vidya Parishad",
    title: "24-Hour Hogwarts Hackathon",
    result: "Participation",
    note: "Certificate of Triumph — GVP College for Degree & PG Courses (Autonomous), Rushikonda, Visakhapatnam.",
    date: "6–7 December 2025",
    image: "/certificates/hogwarts-hackathon.jpg",
    ratio: 835 / 565,
  },
  {
    issuer: "Raghu Engineering College",
    title: "Hackverse 1.0",
    result: "Participation",
    note: "24-hour hackathon at Raghu Engineering College, Visakhapatnam, with Google Developer Groups on Campus and Akrivia HCM.",
    date: "18–19 October 2025",
    image: "/certificates/raghu-hackverse.jpg",
    ratio: 845 / 540,
  },
];

export const moments: Moment[] = [
  {
    kicker: "Hackathon · Podium",
    title: "3rd Place",
    org: "NSRIT Launch Pad Hack Fest",
    description: "Certificate of Merit at an 8-hour inter-collegiate hackathon in Visakhapatnam.",
    certificate: 0,
  },
  {
    kicker: "Team Thunder buddies",
    title: "Hack24",
    org: "Aadhrita · MVGR × HackerRank",
    description: "Coding, teamwork and innovation at Aadhrita Hack24, hosted by MVGR with HackerRank.",
    certificate: 1,
  },
  {
    kicker: "National Summit",
    title: "Hacktriad 2.0",
    org: "LNIT 2k26 · Lendi",
    description: "Built at the Lendi National Innovation and Technology Summit hackathon.",
    certificate: 2,
  },
  {
    kicker: "Endurance Rounds",
    title: "2 × 24 Hours",
    org: "Hogwarts · GVP  &  Hackverse · Raghu",
    description: "Two full 24-hour builds — the Hogwarts Hackathon and Hackverse 1.0.",
    certificate: 3,
  },
  {
    kicker: "Hackathon Regular",
    title: "5 Hackathons",
    org: "NSRIT · MVGR · LNIT · GVP · Raghu",
    description: "Five hackathons in one year — and a podium finish at NSRIT.",
    certificate: 4,
  },
];
