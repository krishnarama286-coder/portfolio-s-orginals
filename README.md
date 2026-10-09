# SURYA: THE SERIES

A cinematic, streaming-inspired portfolio for **Surya Srinivas K** (Surya): Web Developer • PC & Laptop Repair • Entrepreneur • Game Designer • Music Lover • Gamer.

> *Surya fixes machines, builds for the web and keeps the music playing.*

Built with **Next.js 14 (App Router)**, **React 18**, **TypeScript (strict)**, **Tailwind CSS**, **Framer Motion** and **Lucide React**.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the build
npm run typecheck  # tsc --noEmit
```

## The experience

`INTRO → WHO'S WATCHING? → BROWSE`

| Screen | What happens |
| --- | --- |
| Intro | The title lands, then the portrait rises onto a red halo. **Play Series** or **Skip Intro**. |
| Profiles | 5 profiles (Surya, Web Developer, Tech Fixer, Entrepreneur, Music & Games). Each one re-orders the dashboard. |
| Browse | Sticky nav, billboard, Continue Exploring, The Pilot (About), Season 01 The Build Room, **My Journey** (6 seasons, each opening with a quote), **Top Moments** (hackathons + certificates), Genres, Season 02 Off Screen (music & games), Season 03 The Studio (work with me), Top Picks, and the *To Be Continued...* credits. |

## Editing content

- **`src/data/portfolio.ts`**: name, roles, social links, profiles, billboard, About, projects, genres, Off Screen photos (`stills`), Studio services, top picks and quotes.
- **`src/data/moments.ts`**: hackathon moments and certificates.
- **`src/data/journey.ts`**: the six seasons of My Journey.

Social links still set to `PASTE_…` stay **hidden** until you replace them. Email takes the form `mailto:you@example.com`.

## Images to add

| Path | Used for |
| --- | --- |
| `public/profile/surya.jpg` | Intro, billboard, Surya profile tile |
| `public/profile/surya-about.jpg` | About section |
| `public/gallery/main-character.jpg` | Off Screen: Main Character (other Off Screen cards are gradient posters until you add an `image`) |
| `public/certificates/*.jpg` | The 5 hackathon certificates |

After adding an image, set its `ratio` (width / height) in the data file so the viewer sizes it correctly. Missing images fall back to a styled placeholder, so the layout never breaks.

## Deploy

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://surya.dev`) so Open Graph images resolve to absolute URLs.

---

*A personal, streaming-inspired portfolio. Not affiliated with any streaming service.*
